import { Component, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EstimationItemFactory, ApiEstimationItemService, Dispatcher } from '../../../core/providers';
import { EstimationItemFactoryInterface } from '../../../core/interfaces/factories/estimation-item-factory.interface';
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';
import { DispatcherInterface } from '../../../core/interfaces/dispatcher.interface';
import { EVENTS } from '../../../core/services/events';

@Component({
    selector: 'app-estimation-upload',
    templateUrl: './estimation-upload.component.html',
    styleUrls: ['./estimation-upload.component.css']
})
export class EstimationUploadComponent {

    @ViewChild('fileUpload') fi;

    public uploadValue = 0;
    public uploadingFile = false;

    constructor(
        @Inject(EstimationItemFactory) private estimateItemFactory: EstimationItemFactoryInterface,
        @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface,
        @Inject(Dispatcher) private dispatcher: DispatcherInterface
    ) {}

    openFileUpload(): void {
        this.fi.nativeElement.click();
    }

    uploadFile(): void {
        this.uploadingFile = true;
        // Simulate uploading process
        setTimeout(() => {
            this.uploadValue = 50;
            setTimeout(() => {
                this.uploadValue = 100;
                setTimeout(() => {
                    this.uploadingFile = false;
                    this.uploadCallback();
                }, 1000);
            }, 1000);
        }, 1000);
    }

    private uploadCallback() {

        const model1 = this.estimateItemFactory.createItem({});
        model1.category = 'CAB';
        model1.selector = 'CTFL+';
        model1.description = 'Countertop - flad laid plastic laminate';
        model1.unitType = 'LF';
        model1.units = 8.00;
        model1.cost = 40.09;

        const model2 = this.estimateItemFactory.createItem({});
        model2.category = 'CAB';
        model2.selector = 'CTPF';
        model2.description = 'Countertop - post formed laminate';
        model2.unitType = 'LF';
        model2.units = 10.00;
        model2.cost = 52.25;

        Observable.forkJoin([
            this.apiItem.save(model1, true),
            this.apiItem.save(model2, true)
        ]).subscribe(() => {
            this.dispatcher.dispatch(EVENTS.FILE_MATERIALS_UPLOADED, [model1, model2]);
        });
    }
}
