import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { EstimationItemModel } from '../../../core/models/estimation-item.model';
import { ApiEstimationItemService } from '../../../core/providers';
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';


@Component({
    selector: 'app-estimation-list-page',
    templateUrl: './estimation-list-page.component.html',
    styleUrls: ['./estimation-list-page.component.css']
})
export class EstimationListPageComponent implements OnInit {

    public items: EstimationItemModel[];
    public showSpinner: boolean = true;

    constructor(
        @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface,
        @Inject(Router) private router: Router
    ) {}

    ngOnInit() {
        this.apiItem.getItems()
            .subscribe((items: EstimationItemModel[]) => {
                this.items = items;
                this.showSpinner = false;
            });
    }

    public edit(item: EstimationItemModel) {
        this.router.navigate(['/estimation/', item.id, 'edit']);
    }
}
