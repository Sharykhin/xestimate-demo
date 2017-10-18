import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { EstimationItemModel } from '../../../core/models/estimation-item.model';


@Component({
    selector: 'app-estimation-list-page',
    templateUrl: './estimation-list-page.component.html'
})
export class EstimationListPageComponent {

    constructor(
       @Inject(Router) private router: Router
    ) {}

    public edit(item: EstimationItemModel) {
        this.router.navigate(['/estimation/', item.id, 'edit']);
    }
}
