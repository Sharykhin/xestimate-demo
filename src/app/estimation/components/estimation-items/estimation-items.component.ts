import { Component, Inject, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ApiEstimationItemService, Dispatcher } from '../../../core/providers';
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';
import { EstimationItemModel } from '../../../core/models/estimation-item.model';
import { DispatcherInterface } from '../../../core/interfaces/dispatcher.interface';
import { EVENTS } from '../../../core/services/events';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModalRemoveEstimateComponent } from '../modals/remove-estimate/remove-estimate.component';
import { ModalProcessEstimateComponent } from '../modals/process-estimate/process-estimate.component';

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
        @Inject(Dispatcher) private dispatcher: DispatcherInterface,
        @Inject(ToastsManager) private toastr: ToastsManager,
        @Inject(ViewContainerRef) private vcr: ViewContainerRef,
        @Inject(MatDialog) private dialog: MatDialog
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {

        this.apiItem.getItems()
            .subscribe((items: EstimationItemModel[]) => {
                this.items = items;
                this.showSpinner = false;
            });

        this.listener = this.dispatcher.on(EVENTS.FILE_MATERIALS_UPLOADED, (...items) => {
            items.forEach((item) => {
                this.items.push(item);
            });

            this.toastr.success('Two items were uploaded!', 'Success!', {
                dismiss: 'click'
            });
        });
    }

    ngOnDestroy() {
        this.listener();
    }

    addItem(item: EstimationItemModel): void {
        this.items.push(item);
        this.toastr.success('A new item has been added!', 'Success!', {
            dismiss: 'click'
        });
    }

    editItem() {
        this.toastr.success('Item has been edited!', 'Success!', {
            dismiss: 'click'
        });
    }

    edit(item: EstimationItemModel): void {
        this.dispatcher.dispatch(EVENTS.EDIT_ITEM, [item]);
    }

    remove(item: EstimationItemModel, index: number): void {
        let dialogRef = this.dialog.open(ModalRemoveEstimateComponent, {
            width: '250px',
            data: { name: item.description }
        });

        dialogRef.afterClosed().subscribe(result => {
           if (result === true) {
               this.apiItem.remove(item).
                   subscribe(() => {
                   this.items.splice(index, 1);
                   this.toastr.info('Item has been removed.');
               });
           }
        });
    }

    process(): void {
        let dialogRef = this.dialog.open(ModalProcessEstimateComponent, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                console.log('process');
            }
        });
    }
}
