import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../features/new-invoice/new-invoice.component')
      .then(m => m.NewInvoiceComponent)
  },
  {
    path: 'preview',
    loadComponent: () => import('../features/preview-invoice/preview-invoice.component')
      .then(m => m.PreviewInvoiceComponent)
  }
];



