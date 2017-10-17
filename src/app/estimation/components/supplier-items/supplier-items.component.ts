import { Component, Inject, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import * as alasql from 'alasql';

import { ApiEstimationItemService } from "../../../core/providers";
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';
import { EstimationItemModel } from '../../../core/models/estimation-item.model';
import { SupplierItemModel } from '../../../core/models/supplier-item.model';


@Component({
    selector: 'app-supplier-items',
    templateUrl: './supplier-items.component.html',
    styleUrls: ['./supplier-items.component.css']
})
export class SupplierItemsComponent implements OnInit {

    public items: EstimationItemModel[];
    public suppliers: NgModel[] = [];
    public typeConvert: NgModel;
    public checkedTerms = false;
    public submit = false;
    public convertItems: SupplierItemModel[] = [];

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

    constructor(
        @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface,
        @Inject(Router) private router: Router
    ) {
    }

    ngOnInit() {
        this.apiItem.getItems()
            .subscribe((items: EstimationItemModel[]) => {
                this.items = items;
                this.items.forEach((item: EstimationItemModel, index) => {
                    const model = new SupplierItemModel();
                    model.description = item.description;
                    model.supplier = '';
                    this.convertItems[index] = model;
                });
            });
    }

    public back() {
        this.router.navigate(['/estimation']);
    }

    public calculateCost(supplierKey: string, item: EstimationItemModel): string {
        if (supplierKey === undefined) {
            return 'Not Specified';
        }
        const supplierDelta = this.suppliersDesc[supplierKey].delta;
        return ((item.cost * item.units) * supplierDelta).toFixed(2);
    }

    public applySuplier(supplierKey: string, index: number, item: EstimationItemModel) {
        const supplierName = this.suppliersDesc[supplierKey].name;
        this.convertItems[index].supplier = supplierName;
        this.convertItems[index].price = this.calculateCost(supplierKey, item);
    }

    public convert(): void {
        this.submit = true;
        if (this.checkedTerms === false) {
            return;
        }
        let data = [];
        this.convertItems.forEach((item) => {
            data.push({
                a: item.description,
                b: item.supplier,
                c: item.price + '$'
            });
        });

        var mystyle = {
            headers:true,
            column: {style:{Font:{Bold:'1'}}}
        };
        alasql('SELECT * INTO XLSXML("tdts.xls",?) FROM ?',[mystyle, data]);
    }

    public checkTermsAndConditions(value): void {
        this.checkedTerms = value.checked;
    }
}
