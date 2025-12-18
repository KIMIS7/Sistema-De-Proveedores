import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirige la raíz a providers
  { path: '', redirectTo: '/providers', pathMatch: 'full' },
  
  // ==================== PROVIDERS ====================
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

  // ==================== SERVICES ====================
  { 
    path: 'services', 
    loadComponent: () => import('./features/services/service-list/service-list.component')
      .then(m => m.ServiceListComponent) 
  },
  { 
    path: 'services/new', 
    loadComponent: () => import('./features/services/service-form/service-form.component')
      .then(m => m.ServiceFormComponent) 
  },
  { 
    path: 'services/:id', 
    loadComponent: () => import('./features/services/service-detail/service-detail.component')
      .then(m => m.ServiceDetailComponent) 
  },
  { 
    path: 'services/:id/edit', 
    loadComponent: () => import('./features/services/service-form/service-form.component')
      .then(m => m.ServiceFormComponent) 
  },

  // ==================== RATES ====================
  { 
    path: 'rates', 
    loadComponent: () => import('./features/rates/rate-list/rate-list.component')
      .then(m => m.RateListComponent) 
  },
  { 
    path: 'rates/new', 
    loadComponent: () => import('./features/rates/rate-form/rate-form.component')
      .then(m => m.RateFormComponent) 
  },
  { 
    path: 'rates/:id', 
    loadComponent: () => import('./features/rates/rate-detail/rate-detail.component')
      .then(m => m.RateDetailComponent) 
  },
  { 
    path: 'rates/:id/edit', 
    loadComponent: () => import('./features/rates/rate-form/rate-form.component')
      .then(m => m.RateFormComponent) 
  },
];