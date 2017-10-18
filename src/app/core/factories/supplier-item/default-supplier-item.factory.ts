import { Injectable } from '@angular/core';

import * as _ from '../../utils';
import { SupplierItemModel } from '../../models/supplier-item.model';
import { SupplierItemRequest } from '../../interfaces/requests/supplier-item.request';
import { SupplierItemFactoryInterface } from '../../interfaces/factories/supplier-item-factory.interface';

@Injectable()
export class DefaultSupplierItemFactory implements SupplierItemFactoryInterface {

    createItem(data: SupplierItemRequest): SupplierItemModel {
        const item = new SupplierItemModel();
        item.id = _.guid();
        item.description = data.description;
        item.supplier = data.supplier;
        item.price = data.price;
        item.category = data.category;
        item.selector = data.selector;
        item.units = data.units;
        item.cost = data.cost;
        return item;
    }
}
