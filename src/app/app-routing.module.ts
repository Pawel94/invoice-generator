import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../features/new-invoice/new-invoice.component')
      .then(m => m.NewInvoiceComponent)
  },
  {
    path: 'test',
    loadComponent: () => import('../features/new-invoice/new-invoice.component')
      .then(m => m.NewInvoiceComponent)
  }
];



