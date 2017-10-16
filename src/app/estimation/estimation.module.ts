import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

import { EstimationHomeComponent } from './components/estimation-home/estimation-home.component';
import { routing } from './estimation.routing';
import { PreventAccessGuard } from './guards/prevent-access.guard';
import { EstimationItemsComponent } from './components/estimation-items/estimation-items.component';
import {
    MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule,
    MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule
} from '@angular/material';
import { EstimationItemFormComponent } from './components/estimation-item-form/estimation-item-form.component';
import { ModalRemoveEstimateComponent } from './components/modals/remove-estimate/remove-estimate.component';


@NgModule({
    declarations: [
        EstimationHomeComponent, EstimationItemsComponent, EstimationItemFormComponent, ModalRemoveEstimateComponent
    ],
    imports: [
        routing, CommonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule,
        ReactiveFormsModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule
    ],
    providers: [
        PreventAccessGuard
    ],
    bootstrap: [ ModalRemoveEstimateComponent ]
})
export class EstimationModule {}
