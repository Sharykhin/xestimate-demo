import {Component, Inject, OnInit} from '@angular/core';
import {ApiEstimationItemService} from "../../../core/providers";
import {ApiEstimationItemInterface} from "../../../core/interfaces/services/api-estimation-item.interface";
import {EstimationItemModel} from "../../../core/models/estimation-item.model";

@Component({
    selector: 'app-estimation-items',
    templateUrl: './estimation-items.component.html',
    styleUrls: ['./estimation-items.component.css']
})
export class EstimationItemsComponent implements OnInit {

    public items: EstimationItemModel[];
    public showSpinner = true;

    constructor(@Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface) {

    }

    ngOnInit() {
        this.apiItem.getItems()
            .subscribe((items: EstimationItemModel[]) => {
                console.log(items);
                this.items = items;
                this.showSpinner = false;
            })
    }

    addItem(item: EstimationItemModel): void {
        this.items.push(item);
    }
}
