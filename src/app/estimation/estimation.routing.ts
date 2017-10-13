import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { EstimationHomeComponent } from './components/estimation-home/estimation-home.component';
import { PreventAccessGuard } from './guards/prevent-access.guard';

const estimationRoutes: Routes = [
    {
        path: '',
        component: EstimationHomeComponent,
        canActivate: [PreventAccessGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(estimationRoutes);
