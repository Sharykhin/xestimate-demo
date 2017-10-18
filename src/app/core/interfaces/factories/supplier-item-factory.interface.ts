import { SupplierItemModel } from '../../models/supplier-item.model';
import { SupplierItemRequest } from '../requests/supplier-item.request';

export interface SupplierItemFactoryInterface {

    createItem(data: SupplierItemRequest): SupplierItemModel;
}
