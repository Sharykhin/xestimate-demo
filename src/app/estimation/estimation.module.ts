import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { EstimationHomeComponent } from './components/estimation-home/estimation-home.component';
import { routing } from './estimation.routing';
import { PreventAccessGuard } from './guards/prevent-access.guard';
import { EstimationItemsComponent } from './components/estimation-items/estimation-items.component';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [
        EstimationHomeComponent, EstimationItemsComponent
    ],
    imports: [
        routing, CommonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule
    ],
    providers: [
        PreventAccessGuard
    ],
    bootstrap: []
})
export class EstimationModule {}
