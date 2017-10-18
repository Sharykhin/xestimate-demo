import { Injectable, Inject } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { EstimationItemModel } from '../../core/models/estimation-item.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ApiEstimationItemService } from '../../core/providers';
import { ApiEstimationItemInterface } from '../../core/interfaces/services/api-estimation-item.interface';
import { Location } from '@angular/common';

@Injectable()
export class EstimateItemResolver implements Resolve<EstimationItemModel> {

    private url: string;

    constructor(
        @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface,
        @Inject(Router) private router: Router,
        @Inject(Location) private location: Location
    ) {
        this.url = this.location.path();
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const id = route.params['id'];
        return Observable.create((observer: Observer<any>) => {
            this.apiItem.getItem(id)
                .subscribe(
                    (item: EstimationItemModel) => {
                        observer.next(item);
                        observer.complete();
                    },
                    (error: any) => {
                        if (error.code === 404) {
                            observer.complete();
                            this.router.navigate(['/**'], { skipLocationChange: true})
                                .then(() => {
                                    this.location.go(this.url);
                                });
                        }
                    }
                );
        });
    }
}
