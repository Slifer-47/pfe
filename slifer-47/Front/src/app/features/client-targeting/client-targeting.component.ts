import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  accountNumber: string;
  idStructure: string;
  classe: number;
  // selected: boolean; // Removed selected property
}

@Component({
  selector: 'app-client-targeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="client-targeting-container">
      <h1 class="page-title">Consulter Les Clients</h1>
      
      <div class="client-form-card">
        <form (submit)="onSubmit($event)">
          <div class="form-row">
            <div class="form-group">
              <label for="direction" class="form-label">Direction Régionale:</label>
              <select id="direction" class="form-control" name="direction" [(ngModel)]="formData.direction" (change)="onDirectionChange()">
                <option value="">Sélectionnez une direction</option>
                <option *ngFor="let direction of directionOptions" [value]="direction">{{ direction }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="departement" class="form-label">Département:</label>
              <select id="departement" class="form-control" name="departement" [(ngModel)]="formData.departement" (change)="onDepartementChange()">
                <option value="">Sélectionnez un département</option>
                <option *ngFor="let departement of departementOptions" [value]="departement">{{ departement }}</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="agence" class="form-label">Agence:</label>
              <select id="agence" class="form-control" name="agence" [(ngModel)]="formData.agence">
                <option value="">Sélectionnez une agence</option>
                <option *ngFor="let agence of agenceOptions" [value]="agence">{{ agence }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="classe" class="form-label">Classe:</label>
              <select id="classe" class="form-control" name="classe" [(ngModel)]="formData.classe" (change)="filterClients()">
                <option value="">Sélectionnez une classe</option>
                <option *ngFor="let value of classeOptions" [value]="value">{{ value }}</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="montantMin" class="form-label">Montant min:</label>
              <input type="number" id="montantMin" class="form-control" name="montantMin" [(ngModel)]="formData.montantMin">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="montantMax" class="form-label">Montant max:</label>
              <input type="number" id="montantMax" class="form-control" name="montantMax" [(ngModel)]="formData.montantMax">
            </div>
            
            <div class="form-group">
              <label for="nature" class="form-label">Nature:</label>
              <input type="text" id="nature" class="form-control" name="nature" [(ngModel)]="formData.nature">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group half-width">
              <label for="produit" class="form-label">Produit:</label>
              <input type="text" id="produit" class="form-control" name="produit" [(ngModel)]="formData.produit">
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="app-button primary">
              <span>Consulter</span>
              <span class="button-icon material-icons">search</span>
            </button>
            <button type="button" class="app-button secondary" (click)="resetForm()">
              <span>Effacer</span>
              <span class="button-icon material-icons">clear</span>
            </button>
          </div>
        </form>
      </div>

      <div class="clients-table-container" *ngIf="filteredClients.length > 0">
        <div class="table-header">
          <h2>Liste des Clients</h2>
          <!-- Removed selection-actions div -->
        </div>

        <div class="table-responsive">
          <table class="clients-table">
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Numéro de compte</th>
                <th>ID Structure</th>
                <!-- Removed checkbox header -->
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let client of filteredClients" 
                  (click)="onRowClick(client)"
                  class="clickable-row">
                <td>{{ client.firstName }}</td>
                <td>{{ client.lastName }}</td>
                <td>{{ client.accountNumber }}</td>
                <td>{{ client.idStructure }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Client Details Modal -->
      <div *ngIf="isModalVisible && selectedClientForModal" class="modal-overlay" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="modal-close-button" (click)="closeModal()">&times;</button>
          <h2>Détails du Client</h2>
          <div class="client-details-grid">
            <div class="detail-item">
              <span class="detail-label">ID:</span>
              <span class="detail-value">{{ selectedClientForModal.id }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Prénom:</span>
              <span class="detail-value">{{ selectedClientForModal.firstName }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Nom:</span>
              <span class="detail-value">{{ selectedClientForModal.lastName }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">N° Compte:</span>
              <span class="detail-value">{{ selectedClientForModal.accountNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">ID Structure:</span>
              <span class="detail-value">{{ selectedClientForModal.idStructure }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Classe:</span>
              <span class="detail-value">{{ selectedClientForModal.classe }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .client-targeting-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }
    
    .client-form-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 25px;
      margin-bottom: 20px;
    }
    
    .form-row {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
    }
    
    .form-group {
      flex: 1;
    }
    
    .half-width {
      max-width: 48%;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 25px;
    }

    .clients-table-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 25px;
      margin-top: 20px;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .table-header h2 {
      margin: 0;
      font-size: 18px;
      color: #333;
    }

    .selection-actions {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .table-responsive {
      overflow-x: auto;
    }

    .clients-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
    }

    .clients-table th,
    .clients-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 2px solid #e0e0e0;
      border-right: 2px solid #e0e0e0;
    }

    .clients-table th:last-child,
    .clients-table td:last-child {
      border-right: none;
    }

    .clients-table th {
      background-color: #f8f9fa;
      font-weight: 500;
      color: #555;
    }

    .clients-table tbody tr:last-child td {
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

    /* .clickable-row.selected { // Removed selected class style
      background-color: #e3f2fd;
    } */

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      width: 90%;
      max-width: 500px;
      position: relative;
    }

    .modal-close-button {
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: #888;
    }
    .modal-close-button:hover {
      color: #333;
    }

    .modal-content h2 {
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 22px;
      color: #333;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }

    .client-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }

    .detail-item {
      background-color: #f9f9f9;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #eee;
    }

    .detail-label {
      font-weight: 600;
      color: #555;
      display: block;
      margin-bottom: 5px;
    }

    .detail-value {
      color: #333;
    }
    
    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
        gap: 10px;
      }
      
      .half-width {
        max-width: 100%;
      }

      .table-header {
        flex-direction: column;
        gap: 10px;
      }

      .selection-actions {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    
    .app-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .app-button.primary {
      background-color: #08a484;
      color: white;
    }
    
    .app-button.primary:hover {
      background-color: #078e73;
      transform: translateY(-1px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .app-button.primary:disabled {
      background-color: #a0a0a0;
      cursor: not-allowed;
      transform: none;
    }
    
    .app-button.secondary {
      background-color: #f0f0f0;
      color: #333;
    }
    
    .app-button.secondary:hover {
      background-color: #e0e0e0;
      transform: translateY(-1px);
    }
    
    .app-button.small {
      padding: 6px 12px;
      font-size: 13px;
    }
    
    .button-icon {
      font-size: 18px;
      transition: transform 0.3s ease;
    }
    
    .app-button:hover .button-icon {
      transform: translateX(2px);
    }
      
  // Add zebra striping and hover effects to tables
  .activities-table tbody tr:nth-child(even) {
  background-color: rgba(8, 164, 132, 0.03);
  }
  
  .activities-table tbody tr:hover {
  background-color: rgba(8, 164, 132, 0.08);
  }
  
  // Add better column headers
  .activities-table th {
  font-weight: 500;
  color: #444;
  border-bottom: 2px solid rgba(8, 164, 132, 0.2);
  padding: 12px 16px;
  }
      
  `],
})
export class ClientTargetingComponent {
  classeOptions = [0, 1, 2, 3, 4];
  directionOptions = [
    'Direction Nord-Ouest', 
    'Direction Grand Tunis', 
    'Direction Centre', 
    'Direction Sud-Ouest', 
    'Direction Sud-Est'
  ];
  
  departementOptions = [
    'Département Beja', 
    'Département Tunis', 
    'Département Kairouan', 
    'Département Sidi Bouzid', 
    'Département Gabés'
  ];
  
  // Add this new property for agency options
  agenceOptions: string[] = [];

  formData = {
    direction: '',
    departement: '',
    agence: '',
    classe: '',
    montantMin: null as number | null,
    montantMax: null as number | null,
    nature: '',
    produit: ''
  };

  allClients: Client[] = [
    { id: 1, firstName: 'Adem', lastName: 'Jouibli', accountNumber: 'ACC001', idStructure: 'STR001', classe: 1 },
    { id: 2, firstName: 'Mohamed', lastName: 'Ben Salah', accountNumber: 'ACC002', idStructure: 'STR002', classe: 2 },
    { id: 3, firstName: 'Iheb', lastName: 'Saidi', accountNumber: 'ACC003', idStructure: 'STR001', classe: 1 },
    { id: 4, firstName: 'Saif', lastName: 'Jandoubi', accountNumber: 'ACC004', idStructure: 'STR003', classe: 3 },
    { id: 5, firstName: 'Firas', lastName: 'Chawat', accountNumber: 'ACC005', idStructure: 'STR002', classe: 1 },
  ];

  filteredClients: Client[] = [];

  onSubmit(event: Event) {
    event.preventDefault();
    this.filterClients();
  }

  filterClients() {
    this.filteredClients = this.allClients.filter(client => {
      if (this.formData.classe && client.classe !== parseInt(this.formData.classe as string)) {
        return false;
      }
      // Add other filter conditions here based on formData
      // For example:
      // if (this.formData.direction && client.direction !== this.formData.direction) return false;
      // if (this.formData.departement && client.departement !== this.formData.departement) return false;
      return true;
    });
  }

  resetForm() {
    this.formData = {
      direction: '',
      departement: '', 
      agence: '',
      classe: '',
      montantMin: null,
      montantMax: null,
      nature: '',
      produit: ''
    };
    this.filteredClients = [];
  }

  // Removed toggleAllClients, areAllClientsSelected, getSelectedClients, onClientSelectionChange methods

  selectedClientForModal: Client | null = null;
  isModalVisible: boolean = false;

  onRowClick(client: Client) {
    this.selectedClientForModal = client;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedClientForModal = null;
  }

  processSelectedClients() {
    // This method might need to be re-evaluated or removed
    // if it solely relied on the selected clients via checkboxes.
    // For now, I'll leave it, but it won't have any clients to process
    // from the previous selection mechanism.
    // const selectedClients = this.getSelectedClients(); // This would now be empty
    // console.log('Processing selected clients:', selectedClients);
    console.log('Process button clicked. Consider how to handle this without checkboxes.');
  }

  // Add this method to load agencies based on selected direction and department
  loadAgences() {
    // In a real application, this would be an API call
    // For now, we'll just set an empty array
    this.agenceOptions = [];
    
    // Reset the selected agency when the options change
    this.formData.agence = '';
  }

  // Update these methods to call loadAgences when direction or department changes
  onDirectionChange() {
    this.loadAgences();
  }

  onDepartementChange() {
    this.loadAgences();
  }
}
