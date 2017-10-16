import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {ApiEstimationItemService} from "../../../core/providers";
import {ApiEstimationItemInterface} from "../../../core/interfaces/services/api-estimation-item.interface";
import {EstimationItemModel} from "../../../core/models/estimation-item.model";
import {CoreDispatcher} from "../../../core/services/core-dispatcher";

@Component({
    selector: 'app-estimation-items',
    templateUrl: './estimation-items.component.html',
    styleUrls: ['./estimation-items.component.css']
})
export class EstimationItemsComponent implements OnInit, OnDestroy {

    public items: EstimationItemModel[];
    public showSpinner = true;
    private listener;

    constructor(
        @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface,
        @Inject(CoreDispatcher) private dispatcher: CoreDispatcher
    ) {

    }

    ngOnInit() {
        this.apiItem.getItems()
            .subscribe((items: EstimationItemModel[]) => {
                console.log(items);
                this.items = items;
                this.showSpinner = false;
            });

        this.listener = this.dispatcher.on(CoreDispatcher.FILE_MATERIALS_UPLOADED, (...items) => {
            items.forEach((item) => {
                this.items.push(item);
            });
        });
    }

    ngOnDestroy() {
        this.listener();
    }

    addItem(item: EstimationItemModel): void {
        this.items.push(item);
    }
}
