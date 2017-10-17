import { Component, Inject, OnInit, OnDestroy, ViewContainerRef, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiEstimationItemService, Dispatcher } from '../../../core/providers';
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';
import { EstimationItemModel } from '../../../core/models/estimation-item.model';
import { DispatcherInterface } from '../../../core/interfaces/dispatcher.interface';
import { EVENTS } from '../../../core/services/events';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModalRemoveEstimateComponent } from '../modals/remove-estimate/remove-estimate.component';
import { ModalProcessEstimateComponent } from '../modals/process-estimate/process-estimate.component';
import * as _ from '../../../core/utils';

@Component({
    selector: 'app-estimation-items',
    templateUrl: './estimation-items.component.html',
    styleUrls: ['./estimation-items.component.css']
})
export class EstimationItemsComponent implements OnInit, OnDestroy {

    public items: EstimationItemModel[];
    public showSpinner = true;
    public todayDate: Date;
    public uploadValue = 0;
    public uploadingFile = false;

    private listener;

    @ViewChildren('fileInput') fi;

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
                this.router.navigate(['/estimation/suppliers']);
            }
        });
    }

    openFileUpload(): void {
        this.fi.first.nativeElement.click()
    }

    uploadFile(): void {
        const file = this.fi.first.nativeElement.files[0];
        this.uploadingFile = true;
        // Simulate uploading process
        setTimeout(() => {
            this.uploadValue = 50;
            setTimeout(() => {
                this.uploadValue = 100;
                setTimeout(() => {
                    this.uploadingFile = false;
                    this.uploadCallback();
                }, 1000);
            }, 1000);
        }, 1000);
    }

    private uploadCallback() {

        const model1 = new EstimationItemModel();
        model1.id = _.guid();
        model1.category = 'CAB';
        model1.selector = 'CTFL+';
        model1.description = 'Countertop - flad laid plastic laminate';
        model1.unitType = 'LF';
        model1.units = 8.00;
        model1.cost = 40.09;

        const model2 = new EstimationItemModel();
        model2.id = _.guid();
        model2.category = 'CAB';
        model2.selector = 'CTPF';
        model2.description = 'Countertop - post formed laminate';
        model2.unitType = 'LF';
        model2.units = 10.00;
        model2.cost = 52.25;

        Observable.forkJoin([
            this.apiItem.save(model1, true),
            this.apiItem.save(model2, true)
        ]).subscribe(() => {
            this.dispatcher.dispatch(EVENTS.FILE_MATERIALS_UPLOADED, [model1, model2]);
        });
    }
}
