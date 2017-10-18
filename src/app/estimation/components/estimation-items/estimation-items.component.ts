import { Component, Inject, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { ApiEstimationItemService, Dispatcher } from '../../../core/providers';
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';
import { EstimationItemModel } from '../../../core/models/estimation-item.model';
import { DispatcherInterface } from '../../../core/interfaces/dispatcher.interface';
import { EVENTS } from '../../../core/services/events';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModalProcessEstimateComponent } from '../modals/process-estimate/process-estimate.component';

@Component({
    selector: 'app-estimation-items',
    templateUrl: './estimation-items.component.html',
    styleUrls: ['./estimation-items.component.css']
})
export class EstimationItemsComponent implements OnInit, OnDestroy {

    public items: EstimationItemModel[];
    public showSpinner: boolean = true;
    public todayDate: Date;
    private listener: () => void;

    constructor(
        @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface,
        @Inject(Dispatcher) private dispatcher: DispatcherInterface,
        @Inject(ToastsManager) private toastr: ToastsManager,
        @Inject(ViewContainerRef) private vcr: ViewContainerRef,
        @Inject(MatDialog) private dialog: MatDialog,
        @Inject(Router) private router: Router
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {

        this.todayDate = new Date();

        this.apiItem.getItems()
            .subscribe((items: EstimationItemModel[]) => {
                this.items = items;
                this.showSpinner = false;
            });

        this.listener = this.dispatcher.on(EVENTS.FILE_MATERIALS_UPLOADED, (...items) => {
            items.forEach((item) => {
                this.items.push(item);
            });

            this.toastr.success('Two items were uploaded!', null, {
                dismiss: 'click',
                toastLife: 3000
            });
        });
    }

    ngOnDestroy() {
        this.listener();
    }

    public addItem(item: EstimationItemModel): void {
        this.items.push(item);
        this.toastr.success('A new item has been added!', null, {
            dismiss: 'click',
            toastLife: 3000
        });
    }

    public editItem(item: EstimationItemModel) {
        this.toastr.success('Item has been edited!', null, {
            dismiss: 'click',
            toastLife: 3000
        });
    }

    public edit(item: EstimationItemModel): void {
        this.dispatcher.dispatch(EVENTS.EDIT_ITEM, [item]);
    }

    public process(): void {
        const dialogRef = this.dialog.open(ModalProcessEstimateComponent, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.router.navigate(['/estimation/suppliers']);
            }
        });
    }
}
