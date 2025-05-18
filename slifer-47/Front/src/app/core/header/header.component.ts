import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <div class="user-name">{{fullName}}</div>
    </header>
  `,
  styles: [`
    header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 15px 40px;
      background: linear-gradient(90deg, #08a484 0%, #078371 100%);
      color: white;
      height: 60px;
      box-shadow: 0 2px 10px rgba(255, 255, 255, 0.9);
      border-bottom: 1px solid #e5e5db;
    }
    
    .user-name {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
      padding: 6px 12px;
      border-radius: 4px;
    }
  `]
})
export class HeaderComponent implements OnInit{
  fullName = '';

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.fullName = `${user.fullName}`.trim();
      }
    });
  }

  private getInitials(fullName: string): string {
    return (
      (fullName?.charAt(0) || '')
    ).toUpperCase();
  }
}