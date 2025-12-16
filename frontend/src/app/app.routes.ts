import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/providers', pathMatch: 'full' },
  
  // Providers
  { 
    path: 'providers', 
    loadComponent: () => import('./features/providers/provider-list/provider-list.component')
      .then(m => m.ProviderListComponent) 
  },
  { 
    path: 'providers/new', 
    loadComponent: () => import('./features/providers/provider-form/provider-form.component')
      .then(m => m.ProviderFormComponent) 
  },
  { 
    path: 'providers/:id', 
    loadComponent: () => import('./features/providers/provider-detail/provider-detail.component')
      .then(m => m.ProviderDetailComponent) 
  },
  { 
    path: 'providers/:id/edit', 
    loadComponent: () => import('./features/providers/provider-form/provider-form.component')
      .then(m => m.ProviderFormComponent) 
  },
];