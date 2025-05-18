import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ActionItem {
  id: number;
  clientId: string;
  status: 'en_cours' | 'planifiee' | 'terminee' | 'annulee';
  assignedToUserId: string;
  assignedByUserId: string;
  dateCreated: Date;
}

interface StatusOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-action-treatment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="action-treatment-container">
      <h1 class="page-title">Les Actions</h1>
      
      <div class="filter-container">
        <div class="select-container">
          <select [(ngModel)]="selectedStatus" (change)="filterActions()" class="status-select">
            <option value="">Tous les statuts</option>
            <option *ngFor="let option of statusOptions" [value]="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <button *ngIf="selectedStatus" class="reset-button" (click)="resetFilter()">
          Réinitialiser
        </button>
      </div>
      
      <div class="actions-table-container">
        <div class="table-responsive">
          <table class="actions-table">
            <thead>
              <tr>
                <th>ID Client</th>
                <th>État</th>
                <th>Assigné à</th>
                <th>Assigné par</th>
                <th>Date de création</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let action of filteredActions" 
                  class="clickable-row"
                  (click)="onRowClick(action)">
                <td>{{ action.clientId }}</td>
                <td>
                  <span [ngClass]="'status-' + action.status">
                    {{ getStatusLabel(action.status) }}
                  </span>
                </td>
                <td>{{ action.assignedToUserId }}</td>
                <td>{{ action.assignedByUserId }}</td>
                <td>{{ action.dateCreated | date:'dd/MM/yyyy' }}</td>
              </tr>
              <tr *ngIf="filteredActions.length === 0">
                <td colspan="5" class="no-results">Aucun résultat trouvé pour le statut sélectionné</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .action-treatment-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }

    .filter-container {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      gap: 10px;
    }

    .select-container {
      width: 200px;
    }

    .status-select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      background-color: white;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: no-repeat;
      background-position: right 12px top 50%;
      background-size: 10px auto;
    }

    .status-select:focus {
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
      outline: none;
    }

    .reset-button {
      padding: 10px 16px;
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .reset-button:hover {
      background-color: #e8e8e8;
    }
    
    .actions-table-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 25px;
    }

    .table-responsive {
      overflow-x: auto;
    }
    
    .actions-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      border: 5px solid #e0e0e0;
      border-radius: 6px;
    }
    
    .actions-table th,
    .actions-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 3px solid #e0e0e0;
      border-right: 3px solid #e0e0e0;
    }
    
    .actions-table th:last-child,
    .actions-table td:last-child {
      border-right: none;
    }
    
    .actions-table th {
      background-color: #f8f9fa;
      font-weight: 500;
      color: #555;
    }
    
    .actions-table tbody tr:last-child td {
      border-bottom: none;
    }

    .clickable-row {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .clickable-row:hover {
      background-color: #f0f7ff;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .status-en_cours {
      color: #3498db;
      background-color: rgba(52, 152, 219, 0.1);
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
    }
    
    .status-planifiee {
      color: #f39c12;
      background-color: rgba(243, 156, 18, 0.1);
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
    }
    
    .status-terminee {
      color: #27ae60;
      background-color: rgba(39, 174, 96, 0.1);
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
    }
    
    .status-annulee {
      color: #e74c3c;
      background-color: rgba(231, 76, 60, 0.1);
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
    }

    .no-results {
      text-align: center;
      padding: 20px !important;
      color: #777;
      font-style: italic;
    }
  `]
})
export class ActionsComponent {
  actions: ActionItem[] = [
    {
      id: 1,
      clientId: 'CLI001',
      status: 'en_cours',
      assignedToUserId: 'USER001',
      assignedByUserId: 'ADMIN001',
      dateCreated: new Date('2025-04-28')
    },
    {
      id: 2,
      clientId: 'CLI002',
      status: 'terminee',
      assignedToUserId: 'USER002',
      assignedByUserId: 'ADMIN001',
      dateCreated: new Date('2025-04-27')
    },
    {
      id: 3,
      clientId: 'CLI003',
      status: 'annulee',
      assignedToUserId: 'USER001',
      assignedByUserId: 'ADMIN002',
      dateCreated: new Date('2025-04-26')
    }
  ];

  statusOptions: StatusOption[] = [
    { value: 'en_cours', label: 'En cours' },
    { value: 'terminee', label: 'Terminée' },
    { value: 'annulee', label: 'Annulée' },
    { value: 'affecte', label: 'Affecté' }
  ];

  selectedStatus: string = '';
  filteredActions: ActionItem[] = [...this.actions];

  ngOnInit() {
    this.filterActions();
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'en_cours': 'En cours',
      'planifiee': 'Planifiée',
      'terminee': 'Terminée',
      'annulee': 'Annulée',
      'affecte': 'Affecté'
    };
    return statusMap[status] || status;
  }

  filterActions(): void {
    if (!this.selectedStatus) {
      this.filteredActions = [...this.actions];
      return;
    }
    
    this.filteredActions = this.actions.filter(action => 
      action.status === this.selectedStatus
    );
  }

  resetFilter(): void {
    this.selectedStatus = '';
    this.filterActions();
  }

  onRowClick(action: ActionItem) {
    console.log('Action clicked:', action);
    // Handle row click - you can add your logic here
  }
}