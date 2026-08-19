import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Wildcard route to catch any 404s and send them to login
  { path: '**', redirectTo: '/login' } 
];
