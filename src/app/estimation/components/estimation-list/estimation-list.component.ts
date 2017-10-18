import { Component, OnInit, Inject, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MatDialog } from '@angular/material';

import { ApiEstimationItemService } from '../../../core/providers';
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';
import { EstimationItemModel } from '../../../core/models/estimation-item.model';
import { ModalRemoveEstimateComponent } from '../modals/remove-estimate/remove-estimate.component';

@Component({
    selector: 'app-estimation-list',
    templateUrl: './estimation-list.component.html',
    styleUrls: ['./estimation-list.component.css']
})
export class EstimationListComponent implements OnInit {

    @Output() onEdit = new EventEmitter<EstimationItemModel>();

    public showSpinner: boolean = true;
    public items: EstimationItemModel[];

    constructor(
       @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface,
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
    }

    public edit(item: EstimationItemModel): void {
        this.onEdit.next(item);
    }

    public remove(item: EstimationItemModel, index: number): void {
        const dialogRef = this.dialog.open(ModalRemoveEstimateComponent, {
            width: '250px',
            data: { name: item.description }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.apiItem.remove(item).
                subscribe(() => {
                    this.items.splice(index, 1);
                    this.toastr.info('Item has been removed.', null, {
                        dismiss: 'click',
                        toastLife: 3000
                    });
                });
            }
        });
    }
}
