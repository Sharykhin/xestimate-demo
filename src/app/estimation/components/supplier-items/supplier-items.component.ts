import { Component, Inject, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import * as alasql from 'alasql';

import { ApiEstimationItemService, SupplierItemFactory } from '../../../core/providers';
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';
import { EstimationItemModel } from '../../../core/models/estimation-item.model';
import { SupplierItemModel } from '../../../core/models/supplier-item.model';
import { SupplierItemFactoryInterface } from '../../../core/interfaces/factories/supplier-item-factory.interface';

@Component({
    selector: 'app-supplier-items',
    templateUrl: './supplier-items.component.html',
    styleUrls: ['./supplier-items.component.css']
})
export class SupplierItemsComponent implements OnInit {

    public typeConvert: NgModel;
    public checkedTerms = false;
    public submit = false;
    public items: SupplierItemModel[];

    constructor(
        @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface,
        @Inject(Router) private router: Router,
        @Inject(SupplierItemFactory) private supplierItemFactory: SupplierItemFactoryInterface
    ) { }

    ngOnInit() {
        this.apiItem.getItems()
            .subscribe((items: EstimationItemModel[]) => {
                this.items = [];
                items.forEach((item: EstimationItemModel) => {
                    const model = this.supplierItemFactory.createItem({
                        category: item.category,
                        selector: item.selector,
                        description: item.description,
                        units: item.units,
                        cost: item.cost
                    });
                    this.items.push(model);
                });
            });
    }


    public convert(): void {
        this.submit = true;

        if (this.checkedTerms === false) {
            return;
        }

        const data = [];
        this.items.forEach((item) => {
            data.push({
                description: item.description,
                supplier: item.supplier,
                price: item.price + '$'
            });
        });

        const mystyle = {
            headers: true,
            column: {
                style: {
                    Font: {
                        Bold: '1'
                    }
                }
            }
        };
        alasql('SELECT * INTO XLSXML("tdts.xls",?) FROM ?', [mystyle, data]);
    }

    public checkTermsAndConditions(value): void {
        this.checkedTerms = value.checked;
    }
}
