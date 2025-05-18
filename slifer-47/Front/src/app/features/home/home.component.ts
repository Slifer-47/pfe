import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard.service';

interface ActionSummary {
  type: string;
  count: number;
  icon: string;
  color: string;
  route: string;
}

interface RecentActivity {
  id: string;
  type: string;
  client: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <h1 class="page-title">Tableau de bord</h1>
      
      <!-- Welcome Card -->
      <div class="welcome-card">
        <div class="welcome-content">
          <h2>Bienvenue dans votre espace de gestion</h2>
          <p>Gérez vos clients et suivez vos actions commerciales efficacement</p>
        </div>
        <div class="welcome-image">
          <span class="material-icons">dashboard</span>
        </div>
      </div>
      
      <!-- Action Summary Cards -->
      <div class="card-container">
        <div *ngFor="let summary of actionSummaries" 
             class="summary-card" 
             [routerLink]="[summary.route]"
             [style.border-left]="'4px solid ' + summary.color">
          <div class="card-icon" [style.background-color]="summary.color + '20'">
            <span class="material-icons" [style.color]="summary.color">{{ summary.icon }}</span>
          </div>
          <div class="card-content">
            <h3>{{ summary.count }}</h3>
            <p>{{ summary.type }}</p>
          </div>
        </div>
      </div>
      
      <!-- Recent Activities -->
      <div class="section">
        <div class="section-header">
          <h2>Activités récentes</h2>
          <button class="app-button outline small" [routerLink]="['/Actions']">
            <span>Voir tout</span>
            <span class="button-icon material-icons">arrow_forward</span>
          </button>
        </div>
        
        <div class="activities-table-container">
          <table class="activities-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Client</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let activity of recentActivities">
                <td>{{ activity.id }}</td>
                <td>{{ activity.type }}</td>
                <td>{{ activity.client }}</td>
                <td>{{ activity.date }}</td>
                <td>
                  <span class="status-badge" [ngClass]="activity.status">
                    {{ activity.status }}
                  </span>
                </td>
              </tr>
              <tr *ngIf="recentActivities.length === 0">
                <td colspan="5" class="no-data">Aucune activité récente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="section">
        <h2>Actions rapides</h2>
        <div class="quick-actions">
          <button class="app-button primary" [routerLink]="['/ciblage-clients']">
            <span>Ciblage clients</span>
            <span class="button-icon material-icons">people</span>
          </button>
          <button class="app-button primary" [routerLink]="['/creation-actions']">
            <span>Créer une action</span>
            <span class="button-icon material-icons">add_circle</span>
          </button>
          <button class="app-button primary" [routerLink]="['/Actions']">
            <span>Consulter les actions</span>
            <span class="button-icon material-icons">list</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }
    
    .welcome-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(90deg, #08a484 0%, #078371 100%);
      color: white;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 30px;
      box-shadow: 0 4px 12px rgba(8, 164, 132, 0.2);
    }
    
    .welcome-content h2 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    .welcome-content p {
      font-size: 15px;
      opacity: 0.9;
    }
    
    .welcome-image .material-icons {
      font-size: 60px;
      opacity: 0.8;
    }
    
    .card-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .summary-card {
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .summary-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .card-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 8px;
      margin-right: 15px;
    }
    
    .card-icon .material-icons {
      font-size: 24px;
    }
    
    .card-content h3 {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 5px 0;
      color: #333;
    }
    
    .card-content p {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
    
    .section {
      background-color: white;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 30px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    
    .section h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-top: 0;
      margin-bottom: 20px;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .section-header h2 {
      margin: 0;
    }
    
    .activities-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .activities-table th, .activities-table td {
      border: 1px solid #eee;
      padding: 12px 15px;
      text-align: left;
    }
    
    .activities-table th {
      background-color: #f7f7f7;
      font-weight: 500;
    }
    
    .activities-table tr:hover {
      background-color: #f9f9f9;
    }
    
    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .status-badge.planifiee {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    
    .status-badge.en_cours {
      background-color: #fff8e1;
      color: #ffa000;
    }
    
    .status-badge.terminee {
      background-color: #e8f5e9;
      color: #388e3c;
    }
    
    .status-badge.annulee {
      background-color: #ffebee;
      color: #d32f2f;
    }
    
    .no-data {
      text-align: center;
      color: #888;
      padding: 20px 0;
    }
    
    .quick-actions {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
      .card-container {
        grid-template-columns: 1fr;
      }
      
      .welcome-card {
        flex-direction: column;
        text-align: center;
      }
      
      .welcome-image {
        margin-top: 20px;
      }
      
      .quick-actions {
        flex-direction: column;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
    recentActivities: RecentActivity[] = [
    { id: 'ACT001', type: 'Appel', client: 'Jouibli Adem', date: '15/05/2023', status: 'terminee' },
    { id: 'ACT002', type: 'Email', client: 'Ben Salah Mohamed', date: '16/05/2023', status: 'en_cours' },
    { id: 'ACT003', type: 'Réunion', client: 'Saidi Iheb', date: '18/05/2023', status: 'planifiee' },
    { id: 'ACT004', type: 'Appel', client: 'Jandoubi Saif', date: '14/05/2023', status: 'annulee' },
    { id: 'ACT005', type: 'Email', client: 'Chawat Firas', date: '17/05/2023', status: 'en_cours' }
  ];
  actionSummaries: ActionSummary[] = [];
  plannedActions: number = 0;
  inProgressActions: number = 0;
  completedActions: number = 0;
  targetedClients: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.plannedActions = stats.plannedActions;
        this.inProgressActions = stats.inProgressActions;
        this.completedActions = stats.completedActions;
        this.targetedClients = stats.targetedClients;
        this.actionSummaries=[
          { type: 'Actions planifiées', count: stats.plannedActions, icon: 'event', color: '#1976d2', route: '/Actions' },
          { type: 'Actions en cours', count:stats.inProgressActions , icon: 'hourglass_top', color: '#ffa000', route: '/Actions' },
          { type: 'Actions terminées', count:stats.completedActions, icon: 'task_alt', color: '#388e3c', route: '/Actions' },
          { type: 'Clients ciblés', count: stats.targetedClients, icon: 'people', color: '#08a484', route: '/ciblage-clients' }
        ];
      },
      error: (err) => console.error('Failed to load stats:', err)
    });
  }
  }
