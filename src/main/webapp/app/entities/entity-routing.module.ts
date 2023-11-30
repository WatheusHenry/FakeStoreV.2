import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        data: { pageTitle: 'fakeStoreApp.product.home.title' },
        loadChildren: () => import('./product/product.routes'),
      },
      {
        path: 'category',
        data: { pageTitle: 'fakeStoreApp.category.home.title' },
        loadChildren: () => import('./category/category.routes'),
      },
      {
        path: 'customer',
        data: { pageTitle: 'fakeStoreApp.customer.home.title' },
        loadChildren: () => import('./customer/customer.routes'),
      },
      {
        path: 'order',
        data: { pageTitle: 'fakeStoreApp.order.home.title' },
        loadChildren: () => import('./order/order.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
