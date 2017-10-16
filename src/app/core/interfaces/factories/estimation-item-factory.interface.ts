import { EstimationItemRequest } from '../requests/estimation-item.request';
import { EstimationItemModel } from '../../models/estimation-item.model';

export interface EstimationItemFactoryInterface {

    createItem(data: EstimationItemRequest): EstimationItemModel;
}
