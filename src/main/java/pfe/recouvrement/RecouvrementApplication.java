package pfe.recouvrement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import pfe.recouvrement.role.Role;
import pfe.recouvrement.role.RoleRepository;

@SpringBootApplication(scanBasePackages = "pfe.recouvrement")
@EnableJpaAuditing
@EnableAsync
@EnableJpaRepositories(basePackages = "pfe.recouvrement")
@EntityScan(basePackages = "pfe.recouvrement")
public class RecouvrementApplication {
    public static void main(String[] args) {
        SpringApplication.run(RecouvrementApplication.class, args);
    }
    @Bean
    public CommandLineRunner runner(RoleRepository roleRepository){
        return args->{
            if(roleRepository.findByName("USER").isEmpty()){
                roleRepository.save(Role.builder().name("USER").build());

            };
        };
    }
}