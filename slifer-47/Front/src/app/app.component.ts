import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <ng-container *ngIf="!isAuthPage(); else authTemplate">
      <div class="app-container">
        <app-sidebar></app-sidebar>
        <div class="main-content">
          <app-header></app-header>
          <main>
            <router-outlet></router-outlet>
          </main>
        </div>
      </div>
    </ng-container>
    
    <ng-template #authTemplate>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    main {
      flex: 1;
      overflow: auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
  `]
})
export class AppComponent {
  constructor(private router: Router) {
    // Add this to force initial navigation to login
    if(this.router.url === '/') {
      this.router.navigate(['/login']);
    }
  }

  isAuthPage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('/login') || currentUrl.includes('/inscription');
  }
}