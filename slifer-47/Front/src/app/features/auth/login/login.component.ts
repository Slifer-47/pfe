import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <!-- Animated Background Elements -->
      <div class="animated-background">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
      
      <div class="login-card">
        <h1>Bienvenue</h1>
        <p class="subtitle">Portail de recouvrement bancaire</p>
        
        <form (submit)="onSubmit($event)" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-group">
              <span class="input-icon material-icons">email</span>
              <input 
                type="email" 
                id="email" 
                [(ngModel)]="email" 
                name="email" 
                class="form-control"
                placeholder="Entrez votre adresse email"
                required
              >
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <div class="input-group">
              <span class="input-icon material-icons">lock</span>
              <input 
                [type]="showPassword ? 'text' : 'password'" 
                id="password" 
                [(ngModel)]="password" 
                name="password" 
                class="form-control"
                placeholder="Entrez votre mot de passe"
                required
              >
              <button 
                type="button" 
                class="password-toggle" 
                (click)="togglePasswordVisibility()">
                <span class="material-icons">{{ showPassword ? 'visibility' : 'visibility_off' }}</span>
              </button>
            </div>
          </div>
          
          <div *ngIf="error" class="error-message">
            <span class="error-icon material-icons">error_outline</span>
            {{ error }}
          </div>
          
          <button type="submit" class="login-button">
            <span>Se connecter</span>
            <span class="button-icon material-icons">arrow_forward</span>
          </button>
        </form>
        
        <div class="inscription-link">
          <button routerLink="/inscription" class="inscription-button">
            <span>S'inscrire</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #08a484 0%, #06806a 100%);
      position: relative;
      overflow: hidden;
    }
    
    /* Animated Background Styles */
    .animated-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .shape {
      position: absolute;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      animation-duration: 20s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
    
    .shape-1 {
      width: 400px;
      height: 400px;
      top: -100px;
      left: -100px;
      animation-name: float-1;
    }
    
    .shape-2 {
      width: 300px;
      height: 300px;
      top: 60%;
      right: -50px;
      animation-name: float-2;
    }
    
    .shape-3 {
      width: 200px;
      height: 200px;
      bottom: 10%;
      left: 15%;
      animation-name: float-3;
    }
    
    .shape-4 {
      width: 150px;
      height: 150px;
      top: 20%;
      right: 20%;
      animation-name: float-4;
    }
    
    .shape-5 {
      width: 100px;
      height: 100px;
      bottom: 30%;
      left: 30%;
      animation-name: float-5;
    }
    
    @keyframes float-1 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(50px, 30px) rotate(5deg); }
      50% { transform: translate(20px, 60px) rotate(10deg); }
      75% { transform: translate(40px, 40px) rotate(5deg); }
    }
    
    @keyframes float-2 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(-30px, -20px) rotate(-5deg); }
      50% { transform: translate(-40px, -40px) rotate(-10deg); }
      75% { transform: translate(-20px, -30px) rotate(-5deg); }
    }
    
    @keyframes float-3 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(20px, -30px) rotate(5deg); }
      50% { transform: translate(40px, -20px) rotate(10deg); }
      75% { transform: translate(30px, -40px) rotate(5deg); }
    }
    
    @keyframes float-4 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(-20px, 20px) rotate(-5deg); }
      50% { transform: translate(-30px, 30px) rotate(-10deg); }
      75% { transform: translate(-20px, 20px) rotate(-5deg); }
    }
    
    @keyframes float-5 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(30px, 10px) rotate(5deg); }
      50% { transform: translate(10px, 30px) rotate(10deg); }
      75% { transform: translate(20px, 20px) rotate(5deg); }
    }
    
    .login-card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 420px;
      text-align: center;
      position: relative;
      z-index: 2;
    }
    
    h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 28px;
      font-weight: 600;
    }
    
    .subtitle {
      color: #7f8c8d;
      margin: 0.75rem 0 2rem;
      font-size: 15px;
    }
    
    .login-form {
      text-align: left;
    }
    
    .form-group {
      margin-bottom: 1.75rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-size: 14px;
      font-weight: 500;
    }

    .input-group {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 12px;
      color: #95a5a6;
      font-size: 18px;
    }

    .password-toggle {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      color: #95a5a6;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.3s ease;
    }

    .password-toggle .material-icons {
      font-size: 18px;
    }

    .password-toggle:hover {
      color: #08a484;
    }
    
    .form-control {
      width: 100%;
      padding: 0.875rem 1rem 0.875rem 2.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 15px;
      transition: all 0.3s ease;
    }

    .form-control[type="password"] {
      padding-right: 2.5rem;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #08a484;
      box-shadow: 0 0 0 3px rgba(8, 164, 132, 0.15);
    }

    .form-control::placeholder {
      color: #bdc3c7;
    }
    
    .login-button {
      width: 100%;
      padding: 0.875rem;
      background-color: #08a484;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .login-button:hover {
      background-color: #078e73;
      transform: translateY(-1px);
    }

    .button-icon {
      font-size: 18px;
      transition: transform 0.3s ease;
    }

    .login-button:hover .button-icon {
      transform: translateX(4px);
    }
    
    .error-message {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #e74c3c;
      font-size: 14px;
      margin-bottom: 1rem;
      padding: 0.75rem;
      background-color: #fdf0ef;
      border-radius: 6px;
    }

    .error-icon {
      font-size: 18px;
    }
    
    .inscription-link {
      margin-top: 1rem;
      text-align: center;
    }
    
    .inscription-button {
      width: 100%;
      padding: 0.875rem;
      background-color: #ffffff;
      color: #08a484;
      border: 1px solid #08a484;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .inscription-button:hover {
      background-color: #f0f9f7;
      transform: translateY(-1px);
    }
  `]
})
export class LoginComponent {
  email: string = ''; // Changed from username to email
  password: string = '';
  error: string = '';
  showPassword: boolean = false;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email validation pattern

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

// login.component.ts (update the onSubmit method)
onSubmit(event: Event) {
  event.preventDefault();
  
  if (!this.email || !this.password) {
    this.error = 'Veuillez remplir tous les champs';
    return;
  }

  // Email validation
  if (!this.emailPattern.test(this.email)) {
    this.error = 'Veuillez entrer une adresse email valide';
    return;
  }

  this.authService.login(this.email, this.password).subscribe({
    next: () => {
      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.error = 'Email ou mot de passe incorrect';
      console.error('Login error:', err);
    }
  });
}
}