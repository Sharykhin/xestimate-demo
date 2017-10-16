import {Observable} from "rxjs";

import {EstimationItemModel} from "../../models/estimation-item.model";

export interface ApiEstimationItemInterface {

    getItems(): Observable<EstimationItemModel[]>;

    save(item: EstimationItemModel, isNew: boolean): Observable<boolean>;

    remove(item: EstimationItemModel): Observable<boolean>;
}
