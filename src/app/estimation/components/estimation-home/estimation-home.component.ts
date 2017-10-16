import {Component, OnInit, ViewChildren, Inject} from '@angular/core';
import {CoreDispatcher} from "../../../core/services/core-dispatcher";

@Component({
    selector: 'app-estimation-home',
    templateUrl: './estimation-home.component.html',
    styleUrls: ['./estimation-home.component.css']
})
export class EstimationHomeComponent implements OnInit {

    todayDate: Date;
    public uploadValue = 0;
    public uploadingFile = false;

    @ViewChildren('fileInput') fi;

    constructor(
        @Inject(CoreDispatcher) private dispatcher: CoreDispatcher
    ) {}

    ngOnInit() {
        this.todayDate = new Date();
    }

    openFileUpload(): void {
        this.fi.first.nativeElement.click()
    }

    uploadFile(): void {
        const file = this.fi.first.nativeElement.files[0];
        this.uploadingFile = true;
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
        this.dispatcher.dispatch(CoreDispatcher.FILE_MATERIALS_UPLOADED, [
            {
                category: 'CAB',
                selector: 'CTFL+',
                description: 'Countertop - flad laid plastic laminate',
                unitType: 'LF',
                units: 8.00,
                cost: 40.09
            },
            {
                category: 'CAB',
                selector: 'CTPF',
                description: 'Countertop - post formed laminate',
                unitType: 'LF',
                units: 10.00,
                cost: 52.25
            }
        ]);
    }
}
