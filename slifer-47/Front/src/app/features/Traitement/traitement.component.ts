import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Client {
  id: string;
  prenom: string;
  nom: string;
  numeroCompte: string;
  idStructure: string;
}

enum ViewState {
  SEARCH = 'search',
  CLIENT_LIST = 'clientList',
  ACTION_CREATION = 'actionCreation'
}

@Component({
  selector: 'app-action-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <!-- Vue de recherche -->
      <div *ngIf="currentView === 'search'" class="search-form-card">
        
        
        <div class="search-form">
          <div class="form-row">
            <div class="form-group">
              <label for="directionRegionale" class="form-label">Direction Régionale:</label>
              <select id="directionRegionale" class="form-control" [(ngModel)]="searchCriteria.directionRegionale" (change)="onDirectionChange()">
                <option value="">Sélectionnez une direction</option>
                <option *ngFor="let direction of directionOptions" [value]="direction">{{ direction }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="departement" class="form-label">Département:</label>
              <select id="departement" class="form-control" [(ngModel)]="searchCriteria.departement" (change)="onDepartementChange()">
                <option value="">Sélectionnez un département</option>
                <option *ngFor="let departement of departementOptions" [value]="departement">{{ departement }}</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="agence" class="form-label">Agence:</label>
              <select id="agence" class="form-control" [(ngModel)]="searchCriteria.agence" (change)="onAgenceChange()">
                <option value="">Sélectionnez une agence</option>
                <option *ngFor="let agence of agenceOptions" [value]="agence">{{ agence }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="classe" class="form-label">Classe:</label>
              <select id="classe" class="form-control" [(ngModel)]="searchCriteria.classe">
                <option value="">Sélectionnez une classe</option>
                <option value="classe1">Classe 1</option>
                <option value="classe2">Classe 2</option>
                <option value="classe3">Classe 3</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="montantMin" class="form-label">Montant min:</label>
              <input type="number" id="montantMin" class="form-control" [(ngModel)]="searchCriteria.montantMin">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="montantMax" class="form-label">Montant max:</label>
              <input type="number" id="montantMax" class="form-control" [(ngModel)]="searchCriteria.montantMax">
            </div>
            
            <div class="form-group">
              <label for="nature" class="form-label">Nature:</label>
              <input type="text" id="nature" class="form-control" [(ngModel)]="searchCriteria.nature">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="produit" class="form-label">Produit:</label>
              <input type="text" id="produit" class="form-control" [(ngModel)]="searchCriteria.produit">
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="app-button primary" (click)="onConsulter()">
              <span>Consulter</span>
              <span class="button-icon material-icons">search</span>
            </button>
            <button type="button" class="app-button secondary" (click)="resetSearchForm()">
              <span>Effacer</span>
              <span class="button-icon material-icons">clear</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Vue de la liste des clients -->
      <div *ngIf="currentView === 'clientList'" class="client-list-container">
        <h1 class="page-title">Liste des Clients</h1>
        
        <!-- Afficher à nouveau les critères de recherche -->
        <div class="search-summary">
          <p><strong>Critères de recherche:</strong> 
            Direction: {{ searchCriteria.directionRegionale || 'Tous' }}, 
            Agence: {{ searchCriteria.agence || 'Toutes' }},
            Classe: {{ searchCriteria.classe || 'Toutes' }}
          </p>
          <button type="button" class="btn btn-outline-secondary" (click)="backToSearch()">Modifier la recherche</button>
        </div>
        
        <div class="table-container">
          <table class="client-table">
            <thead>
              <tr>
                <th>ID Client</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Numéro de compte</th>
                <th>ID Structure</th>
                <th>Actions</th>
                <th><input type="checkbox" (change)="toggleAllClients($event)"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let client of clients">
                <td>{{ client.id }}</td>
                <td>{{ client.prenom }}</td>
                <td>{{ client.nom }}</td>
                <td>{{ client.numeroCompte }}</td>
                <td>{{ client.idStructure }}</td>
                <td>
                  <button type="button" class="app-button primary small" (click)="createActionForClient(client)">
                    <span>Créer une action</span>
                    <span class="button-icon material-icons">add</span>
                  </button>
                </td>
                <td><input type="checkbox" [(ngModel)]="client.selected"></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="form-actions">
          <button type="button" class="app-button primary" [disabled]="!hasSelectedClients()" (click)="createActionForSelectedClients()">
            <span>Créer une action pour les sélectionnés</span>
            <span class="button-icon material-icons">add_circle</span>
          </button>
        </div>
      </div>
      
      <!-- Vue de création d'action -->
      <div *ngIf="currentView === 'actionCreation'" class="action-creation-container">
        <h1 class="page-title">Création d'action</h1>
        
        <div class="action-form-card">
          <form (submit)="onSubmitAction($event)">
            <div class="form-row">
              <div class="form-group">
                <label for="actionName" class="form-label">Nom de l'action:</label>
                <input type="text" id="actionName" class="form-control" name="actionName" [(ngModel)]="actionFormData.actionName">
              </div>
              
              <div class="form-group">
                <label for="actionType" class="form-label">Type d'action:</label>
                <select id="actionType" class="form-control" name="actionType" [(ngModel)]="actionFormData.actionType">
                  <option value="">Sélectionnez un type</option>
                  <option value="appel">Appel téléphonique</option>
                  <option value="email">Email</option>
                  <option value="reunion">Réunion</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="client" class="form-label">Client:</label>
                <input type="text" id="client" class="form-control" name="client" [(ngModel)]="actionFormData.client" readonly>
              </div>
              
              <div class="form-group">
                <label for="responsable" class="form-label">Responsable:</label>
                <input type="text" id="responsable" class="form-control" name="responsable" [(ngModel)]="actionFormData.responsable">
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="dateDebut" class="form-label">Date de début:</label>
                <input type="date" id="dateDebut" class="form-control" name="dateDebut" [(ngModel)]="actionFormData.dateDebut">
              </div>
              
              <div class="form-group">
                <label for="dateFin" class="form-label">Date de fin:</label>
                <input type="date" id="dateFin" class="form-control" name="dateFin" [(ngModel)]="actionFormData.dateFin">
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group full-width">
                <label for="description" class="form-label">Description:</label>
                <textarea 
                  id="description" 
                  class="form-control" 
                  name="description" 
                  rows="4" 
                  [(ngModel)]="actionFormData.description"
                ></textarea>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="priorite" class="form-label">Priorité:</label>
                <select id="priorite" class="form-control" name="priorite" [(ngModel)]="actionFormData.priorite">
                  <option value="basse">Basse</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="haute">Haute</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="statut" class="form-label">Statut:</label>
                <select id="statut" class="form-control" name="statut" [(ngModel)]="actionFormData.statut">
                  <option value="planifiee">Planifiée</option>
                  <option value="en_cours">En cours</option>
                  <option value="terminee">Terminée</option>
                  <option value="annulee">Annulée</option>
                </select>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="app-button primary">
                <span>Créer l'action</span>
                <span class="button-icon material-icons">check</span>
              </button>
              <button type="button" class="app-button secondary" (click)="backToClientList()">
                <span>Annuler</span>
                <span class="button-icon material-icons">close</span>
              </button>
            </div>
          </form>
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
    
    .search-form-card, .action-form-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 25px;
    }
    
    .form-row {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
    }
    
    .form-group {
      flex: 1;
    }
    
    .full-width {
      width: 100%;
    }
    
    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 25px;
    }
    
    .client-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    
    .client-table th, .client-table td {
      border: 1px solid #ddd;
      padding: 10px;
    }
    
    .client-table th {
      background-color: #f7f7f7;
      text-align: left;
    }
    
    .client-table tr:hover {
      background-color: #f5f5f5;
    }
    
    .search-summary {
      background-color: #f7f7f7;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .search-summary p {
      margin: 0;
    }
    
    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
        gap: 10px;
      }
      
      .search-summary {
        flex-direction: column;
        gap: 10px;
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
    
    .app-button.outline {
      background-color: transparent;
      color: #08a484;
      border: 1px solid #08a484;
    }
    
    .app-button.outline:hover {
      background-color: rgba(8, 164, 132, 0.05);
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
    
    .app-button.secondary:hover .button-icon,
    .app-button.outline:hover .button-icon {
      transform: translateX(0);
    }
  `]
})
export class TraitementComponent {
  // Les différentes vues du composant
  ViewState = ViewState;
  currentView: ViewState = ViewState.SEARCH;
  
  // Options pour les directions régionales
  directionOptions = [
    'Direction Nord-Ouest', 
    'Direction Grand Tunis', 
    'Direction Centre', 
    'Direction Sud-Ouest', 
    'Direction Sud-Est'
  ];
  
  // Options pour les départements
  departementOptions = [
    'Département Beja', 
    'Département Tunis', 
    'Département Kairouan', 
    'Département Sidi Bouzid', 
    'Département Gabés'
  ];
  
  // Add this property for agency options
  agenceOptions: string[] = [];
  
  // Données pour la recherche
  searchCriteria = {
    directionRegionale: '',
    departement: '',
    agence: '',
    classe: '',
    montantMin: null,
    montantMax: null,
    nature: '',
    produit: ''
  };
  
  // Liste de clients (données mockées)
  clients: (Client & { selected?: boolean })[] = [
    { id: 'CLI001', prenom: 'Adem', nom: 'Jouibli', numeroCompte: 'ACC001', idStructure: 'STR001', selected: false },
    { id: 'CLI002', prenom: 'Mohamed', nom: 'Ben Salah', numeroCompte: 'ACC002', idStructure: 'STR002', selected: false },
    { id: 'CLI003', prenom: 'Iheb', nom: 'Saidi', numeroCompte: 'ACC003', idStructure: 'STR001', selected: false },
    { id: 'CLI004', prenom: 'Saif', nom: 'Jandoubi', numeroCompte: 'ACC004', idStructure: 'STR003', selected: false },
    { id: 'CLI005', prenom: 'Firas', nom: 'Chawat', numeroCompte: 'ACC005', idStructure: 'STR002', selected: false }
  ];
  
  // Données pour le formulaire d'action
  actionFormData = {
    actionName: '',
    actionType: '',
    client: '',
    responsable: '',
    dateDebut: '',
    dateFin: '',
    description: '',
    priorite: 'moyenne',
    statut: 'planifiee'
  };
  
  // Clients sélectionnés pour l'action
  selectedClientIds: string[] = [];
  
  // Afficher la liste des clients après la recherche
  onConsulter(): void {
    // Dans une application réelle, vous feriez ici une requête API
    // pour récupérer les clients correspondants aux critères
    console.log('Recherche avec critères:', this.searchCriteria);
    this.currentView = ViewState.CLIENT_LIST;
    
    // Réinitialiser les sélections
    this.clients.forEach(client => client.selected = false);
  }
  
  // Retour à l'écran de recherche
  backToSearch(): void {
    this.currentView = ViewState.SEARCH;
  }
  
  // Retour à la liste des clients
  backToClientList(): void {
    this.currentView = ViewState.CLIENT_LIST;
  }
  
  // Réinitialiser le formulaire de recherche
  resetSearchForm(): void {
    this.searchCriteria = {
      directionRegionale: '',
      departement: '',
      agence: '',
      classe: '',
      montantMin: null,
      montantMax: null,
      nature: '',
      produit: ''
    };
  }
  
  // Sélectionner/désélectionner tous les clients
  toggleAllClients(event: any): void {
    const isChecked = event.target.checked;
    this.clients.forEach(client => client.selected = isChecked);
  }
  
  // Vérifier si au moins un client est sélectionné
  hasSelectedClients(): boolean {
    return this.clients.some(client => client.selected);
  }
  
  // Créer une action pour un client spécifique
  createActionForClient(client: Client): void {
    this.resetActionForm();
    this.actionFormData.client = client.id;
    this.currentView = ViewState.ACTION_CREATION;
  }
  
  // Créer une action pour les clients sélectionnés
  createActionForSelectedClients(): void {
    const selectedClients = this.clients.filter(client => client.selected);
    if (selectedClients.length > 0) {
      this.resetActionForm();
      // Joindre les IDs des clients sélectionnés avec une virgule
      this.actionFormData.client = selectedClients.map(c => c.id).join(', ');
      this.currentView = ViewState.ACTION_CREATION;
    }
  }
  
  // Réinitialiser le formulaire d'action
  resetActionForm(): void {
    this.actionFormData = {
      actionName: '',
      actionType: '',
      client: '',
      responsable: '',
      dateDebut: '',
      dateFin: '',
      description: '',
      priorite: 'moyenne',
      statut: 'planifiee'
    };
  }
  
  // Soumettre le formulaire d'action
  onSubmitAction(event: Event): void {
    event.preventDefault();
    console.log('Action créée:', this.actionFormData);
    // Dans une application réelle, vous appelleriez ici un service pour sauvegarder l'action
    
    // Retour à la liste des clients après la création
    this.currentView = ViewState.CLIENT_LIST;
    
    // Réinitialiser les sélections
    this.clients.forEach(client => client.selected = false);
  }
  
  // Add this method to load agencies based on selected direction and department
  loadAgences() {
    // In a real application, this would be an API call to fetch agencies
    // based on the selected direction and department
    this.agenceOptions = [];
    
    // Reset the selected agency when the options change
    this.searchCriteria.agence = '';
  }

  // Update these methods to call loadAgences when direction or department changes
  onDirectionChange() {
    this.loadAgences();
  }

  onDepartementChange() {
    this.loadAgences();
  }
  
  // Add this method to handle agency changes
  onAgenceChange() {
    // Handle agency change if needed
    console.log('Selected agency:', this.searchCriteria.agence);
  }
}