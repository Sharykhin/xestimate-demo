import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

import { EstimationHomeComponent } from './components/estimation-home/estimation-home.component';
import { routing } from './estimation.routing';
import { PreventAccessGuard } from './guards/prevent-access.guard';
import { EstimationItemsComponent } from './components/estimation-items/estimation-items.component';
import {
    MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { EstimationItemFormComponent } from './components/estimation-item-form/estimation-item-form.component';


@NgModule({
    declarations: [
        EstimationHomeComponent, EstimationItemsComponent, EstimationItemFormComponent
    ],
    imports: [
        routing, CommonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule,
        ReactiveFormsModule, MatProgressSpinnerModule
    ],
    providers: [
        PreventAccessGuard
    ],
    bootstrap: []
})
export class EstimationModule {}
