import { Observable } from 'rxjs/Observable';

import { EstimationItemModel } from '../../models/estimation-item.model';

export interface ApiEstimationItemInterface {

    getItems(): Observable<EstimationItemModel[]>;

    getItem(id: string): Observable<EstimationItemModel>;

    save(item: EstimationItemModel, isNew: boolean): Observable<boolean>;

    remove(item: EstimationItemModel): Observable<boolean>;
}
