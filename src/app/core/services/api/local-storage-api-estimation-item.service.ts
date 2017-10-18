import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { EstimationItemModel } from '../../models/estimation-item.model';
import { EstimationItemRequest } from '../../interfaces/requests/estimation-item.request';
import { ApiEstimationItemInterface } from '../../interfaces/services/api-estimation-item.interface';
import { EstimationItemFactory } from '../../providers';
import { EstimationItemFactoryInterface } from '../../interfaces/factories/estimation-item-factory.interface';

@Injectable()
export class LocalStorageApiEstimationItem implements ApiEstimationItemInterface {

    readonly ITEMS_KEY = 'estimationItems';

    constructor(
        @Inject(EstimationItemFactory) private itemFactory: EstimationItemFactoryInterface
    ) {}

    getItems(): Observable<EstimationItemModel[]> {
        return new Observable((observer: Observer<any>) => {
            const items = window.localStorage.getItem(this.ITEMS_KEY);
            const itemsArray = items !== null ? JSON.parse(items) : [];
            itemsArray.forEach((index: number, item: EstimationItemRequest) => {
                itemsArray[index] = this.itemFactory.createItem(item);
            });

            observer.next(itemsArray);
            observer.complete();
        });
    }

    save(item: EstimationItemModel, isNew: boolean): Observable<boolean> {
        return new Observable((observer: Observer<any>) => {
            const items = window.localStorage.getItem(this.ITEMS_KEY);
            const itemsArray = items !== null ? JSON.parse(items) : [];
            if (isNew) {
                itemsArray.push(item);
            } else {
                itemsArray.forEach((itemToCheck, i) => {
                    if (itemToCheck.id === item.id) {
                        itemsArray[i] = item;
                    }
                });
            }
            window.localStorage.setItem(this.ITEMS_KEY, JSON.stringify(itemsArray));
            observer.next(true);
            observer.complete();
        });
    }

    remove(item: EstimationItemModel): Observable<boolean> {
        return new Observable((observer: Observer<any>) => {
            const items = window.localStorage.getItem(this.ITEMS_KEY);
            const itemsArray = items !== null ? JSON.parse(items) : [];
            itemsArray.forEach((itemToCheck, i) => {
                if (itemToCheck.id === item.id) {
                    itemsArray.splice(i, 1);
                }
            });
            window.localStorage.setItem(this.ITEMS_KEY, JSON.stringify(itemsArray));
            observer.next(true);
            observer.complete();
        });
    }
}
