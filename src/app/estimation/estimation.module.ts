import { NgModule } from '@angular/core';

import { EstimationHomeComponent } from "./components/estimation-home/estimation-home.component";
import { routing } from './estimation.routing';
import { PreventAccessGuard } from "./guards/prevent-access.guard";

@NgModule({
    declarations: [
        EstimationHomeComponent
    ],
    imports: [
        routing
    ],
    providers: [
        PreventAccessGuard
    ],
    bootstrap: []
})
export class EstimationModule {}
