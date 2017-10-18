import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EstimationHomeComponent } from './components/estimation-home/estimation-home.component';
import { EstimationItemsComponent } from './components/estimation-items/estimation-items.component';
import { PreventAccessGuard } from './guards/prevent-access.guard';
import { SupplierItemsComponent } from './components/supplier-items/supplier-items.component';
import { EstimationListPageComponent } from './components/estimation-list-page/estimation-list-page.component';
import { EstimationEditPageComponent } from './components/estimation-edit-page/estimation-edit-page.component';
import { EstimateItemResolver } from './resolvers/estimate-item.resolver';

const estimationRoutes: Routes = [
    {
        path: '',
        component: EstimationHomeComponent,
        canActivate: [PreventAccessGuard],
        children: [
            {
                path: '',
                component: EstimationItemsComponent
            },
            {
                path: 'suppliers',
                component: SupplierItemsComponent,
            },
            {
                path: 'list',
                component: EstimationListPageComponent
            },
            {
                path: ':id/edit',
                component: EstimationEditPageComponent,
                resolve: {
                    item: EstimateItemResolver
                },
                pathMatch: 'full',
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(estimationRoutes);
