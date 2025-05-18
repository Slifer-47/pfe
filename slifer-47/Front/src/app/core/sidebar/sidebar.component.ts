import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar" [class.collapsed]="!isExpanded">
      <div class="sidebar-header">
        <h1 class="logo">
          <span class="icon material-icons">account_balance</span>
          <span class="label" *ngIf="isExpanded">Recouvrement</span>
        </h1>
      </div>
      
      <nav class="sidebar-nav">
        <ul>
          <li *ngFor="let item of navItems">
            <a 
              [routerLink]="[item.route]" 
              routerLinkActive="active"
              class="nav-link"
            >
              <span class="icon material-icons">{{ item.icon }}</span>
              <span class="label" *ngIf="isExpanded">{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <button class="deconnexion-btn" (click)="logout()">
          <span class="icon material-icons">logout</span>
          <span class="label" *ngIf="isExpanded">Déconnexion</span>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      height: 100%;
      background: var(--sidebar-background, linear-gradient(180deg, #08a484 0%, #078371 100%)); /* MODIFIED */
      color: var(--sidebar-text-color, white); /* MODIFIED */
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease, background-color 0.3s ease, color 0.3s ease; /* MODIFIED */
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
    }
    
    .sidebar.collapsed {
      width: 60px;
    }
    
    .sidebar-header {
      padding: 20px 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 68px; /* Added fixed height */
      box-sizing: border-box; /* Ensures padding is included in height */
    }
    
    .logo {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .sidebar-nav {
      flex: 1;
      padding-top: 20px;
    }
    
    .sidebar-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .nav-link {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: var(--sidebar-text-color, rgba(255, 255, 255, 0.9)); /* MODIFIED */
      text-decoration: none;
      transition: all 0.3s ease;
      border-radius: 6px;
      margin: 4px 8px;
      white-space: nowrap;
      height: 46px; /* Added fixed height */
      box-sizing: border-box; /* Ensures padding is included in height */
    }
    
    .sidebar.collapsed .nav-link {
      justify-content: center;
      padding: 12px 0;
    }
    
    .nav-link:hover {
      background-color: var(--sidebar-hover-bg, rgba(255, 255, 255, 0.15)); /* MODIFIED */
      transform: translateX(4px);
    }
    
    .sidebar.collapsed .nav-link:hover {
      transform: scale(1.1);
    }
    
    .nav-link.active {
      background-color: var(--sidebar-active-bg, rgba(255, 255, 255, 0.2)); /* MODIFIED */
      font-weight: 500;
    }
    
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      font-size: 20px;
      min-width: 24px;
    }
    
    .sidebar.collapsed .icon {
      margin-right: 0;
    }
    
    .label {
      transition: opacity 0.2s ease;
    }
    
    .sidebar-footer {
      padding: 12px 8px 20px;
    }
    
    .deconnexion-btn {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 12px 16px;
      background-color: var(--sidebar-hover-bg, rgba(255, 255, 255, 0.1)); /* MODIFIED - using hover for consistency */
      color: var(--sidebar-text-color, white); /* MODIFIED */
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
      height: 42px; /* Added fixed height */
      box-sizing: border-box; /* Ensures padding is included in height */
    }
    
    .sidebar.collapsed .deconnexion-btn {
      justify-content: center;
      padding: 12px 0;
    }
    
    .deconnexion-btn:hover {
      background-color: var(--sidebar-active-bg, rgba(255, 255, 255, 0.2)); /* MODIFIED - using active for consistency */
      transform: translateX(4px);
    }
    
    .sidebar.collapsed .deconnexion-btn:hover {
      transform: scale(1.1);
    }
    
    .deconnexion-btn .icon {
      margin-right: 12px;
    }
    
    .sidebar.collapsed .deconnexion-btn .icon {
      margin-right: 0;
    }
    
    /* Add styles for the main content to adjust with sidebar */
    :host-context(.app-container) {
      margin-left: 60px;
      transition: margin-left 0.3s ease;
    }
    
    :host-context(.app-container.sidebar-expanded) {
      margin-left: 240px;
    }
  `]
})
export class SidebarComponent {
  isExpanded = false;
  
  navItems: NavItem[] = [
    { label: 'Accueil', icon: 'home', route: '/home' },
    {
      label: 'Traitement',
      icon: 'assignment',
      route: '/creation-actions'
    },
    {
      label: 'Consultation Clients',
      icon: 'people',
      route: '/ciblage-clients'
    },
    {
      label: 'Actions',
      icon: 'check_circle',
      route: '/Actions'
    }
  ];
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.isExpanded = true;
    document.querySelector('.app-container')?.classList.add('sidebar-expanded');
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    this.isExpanded = false;
    document.querySelector('.app-container')?.classList.remove('sidebar-expanded');
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}