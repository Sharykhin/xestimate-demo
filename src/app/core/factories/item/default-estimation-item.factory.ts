import { Injectable } from '@angular/core';
import { EstimationItemRequest } from '../../interfaces/requests/estimation-item.request';
import { EstimationItemModel } from '../../models/estimation-item.model';
import { EstimationItemFactoryInterface } from '../../interfaces/factories/estimation-item-factory.interface';
import * as _ from '../../../core/utils';

@Injectable()
export class DefaultEstimationItemFacotry implements EstimationItemFactoryInterface {

    createItem(data: EstimationItemRequest): EstimationItemModel {
        const item = new EstimationItemModel();
        item.id = data.id || _.guid();
        item.category = data.category;
        item.selector = data.selector;
        item.description = data.description;
        item.unitType = data.unitType;
        item.units = data.units;
        item.cost = data.cost;
        return item;
    }
}
