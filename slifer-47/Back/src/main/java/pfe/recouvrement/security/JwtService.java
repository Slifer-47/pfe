package pfe.recouvrement.security;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pfe.recouvrement.User.User;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${jwt.expiration}")
    private  long  jwtExpiration;
    @Value("${jwt.secret}")
    private String secretKey;
    public String generateToken(UserDetails userDetails){
        return generatedToken(new HashMap<>(),userDetails);
    }

    public String generatedToken(Map<String, Object> claims, UserDetails userDetails) {
        if(userDetails instanceof User){
            User user=(User)userDetails;
            claims.put("fullName",user.fullName());
        }
        return buildToken(claims,userDetails,jwtExpiration);}

    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long jwtExpiration) {
        var authorities = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .claim("authorities", authorities)
                .signWith(getSignInKey())
                .compact();
    }
    public boolean isTokenValid(String token,UserDetails userDetails){
        final String IdUser=extractUserId(token);
        return (IdUser.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }

    public String getUsernameFromToken(String token,UserDetails userDetails){
        final String username=extractUserId(token);
        return null ;
    }

    public String extractUserId(String token) {
        return extractClaim(token,Claims::getSubject);
    }
    public <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims=extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    private Key getSignInKey(){
        byte[] keyBytes= Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}

