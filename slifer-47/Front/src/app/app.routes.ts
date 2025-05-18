import { Routes } from '@angular/router';
import { ClientTargetingComponent } from './features/client-targeting/client-targeting.component';
import { TraitementComponent } from './features/Traitement/traitement.component';
import { ActionsComponent } from './features/Consulter-actions/consulter-actions.component';
import { LoginComponent } from './features/auth/login/login.component';
import { InscriptionComponent } from './features/auth/inscription/inscription.component';
import { HomeComponent } from './features/home/home.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'home', component: HomeComponent, canActivate: [() => authGuard()] },
  { path: 'ciblage-clients', component: ClientTargetingComponent, canActivate: [() => authGuard()] },
  { path: 'creation-actions', component: TraitementComponent, canActivate: [() => authGuard()] },
  { path: 'Actions', component: ActionsComponent, canActivate: [() => authGuard()] },
];
