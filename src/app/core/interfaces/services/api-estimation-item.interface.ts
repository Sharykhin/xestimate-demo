import {Observable} from "rxjs";

import {EstimationItemModel} from "../../models/estimation-item.model";

export interface ApiEstimationItemInterface {

    getItems(): Observable<EstimationItemModel[]>;

    save(item: EstimationItemModel): Observable<boolean>;
}
