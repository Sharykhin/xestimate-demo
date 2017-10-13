import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        loadChildren: './modules/about/about.module#AboutModule'
    }
    // {
    //     path: 'pupils',
    //     loadChildren: '/app/modules/pupil/pupil.module#PupilModule'
    // },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);