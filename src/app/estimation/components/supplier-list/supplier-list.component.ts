import {Component, Input} from '@angular/core';
import { NgModel } from '@angular/forms';

import { SupplierItemModel } from '../../../core/models/supplier-item.model';

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html'
})
export class SupplierListComponent {

    @Input() items: SupplierItemModel[];
    public suppliers: NgModel[] = [];

    readonly suppliersDesc = {
        homedepot: {
            name: 'Home Depot',
            delta: '1.4'
        },
        lowers: {
            name: 'Lowers',
            delta: '1.3'
        },
        menards: {
            name: 'Menards',
            delta: '1.2'
        }
    };

    public calculateCost(supplierKey: string, item: SupplierItemModel): string {
        if (supplierKey === undefined) {
            return 'Not Specified';
        }
        const supplierDelta = this.suppliersDesc[supplierKey].delta;
        return ((item.cost * item.units) * supplierDelta).toFixed(2);
    }

    public applySuplier(supplierKey: string, item: SupplierItemModel) {
        const supplierName = this.suppliersDesc[supplierKey].name;
        item.supplier = supplierName;
        item.price = this.calculateCost(supplierKey, item);
    }
}
