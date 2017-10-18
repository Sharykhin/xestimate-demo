import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EstimationHomeComponent } from './components/estimation-home/estimation-home.component';
import { routing } from './estimation.routing';
import { PreventAccessGuard } from './guards/prevent-access.guard';
import { EstimationItemsComponent } from './components/estimation-items/estimation-items.component';
import {
    MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule,
    MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, MatRadioModule, MatCheckboxModule
} from '@angular/material';
import { EstimationItemFormComponent } from './components/estimation-item-form/estimation-item-form.component';
import { ModalRemoveEstimateComponent } from './components/modals/remove-estimate/remove-estimate.component';
import { ModalProcessEstimateComponent } from './components/modals/process-estimate/process-estimate.component';
import { SupplierItemsComponent } from './components/supplier-items/supplier-items.component';
import { EstimationUploadComponent } from './components/estimation-upload/estimation-upload.component';
import { EstimationListComponent } from './components/estimation-list/estimation-list.component';
import { GoToEstimationFormComponent } from './components/go-to-estimation-form/go-to-estimation-form.component';
import { EstimationListPageComponent } from './components/estimation-list-page/estimation-list-page.component';
import { EstimationEditPageComponent } from './components/estimation-edit-page/estimation-edit-page.component';
import { EstimateItemResolver } from './resolvers/estimate-item.resolver';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';


@NgModule({
    declarations: [
        EstimationHomeComponent, EstimationItemsComponent, EstimationItemFormComponent, ModalRemoveEstimateComponent,
        ModalProcessEstimateComponent, SupplierItemsComponent, EstimationUploadComponent, EstimationListComponent,
        GoToEstimationFormComponent, EstimationListPageComponent, EstimationEditPageComponent, SupplierListComponent
    ],
    imports: [
        routing, CommonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule,
        ReactiveFormsModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, FormsModule, MatRadioModule,
        MatCheckboxModule
    ],
    providers: [
        PreventAccessGuard,
        EstimateItemResolver
    ],
    bootstrap: [ ModalRemoveEstimateComponent, ModalProcessEstimateComponent ]
})
export class EstimationModule {}
