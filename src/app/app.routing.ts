import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    // {
    //     path: '',
    //     component: AppComponent
    // },
    {
        path: 'estimation',
        loadChildren: './estimation/estimation.module#EstimationModule'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
