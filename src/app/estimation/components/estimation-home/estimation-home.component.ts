import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-estimation-home',
    templateUrl: './estimation-home.component.html',
    styleUrls: ['./estimation-home.component.css']
})
export class EstimationHomeComponent implements OnInit {

    todayDate: Date;

    ngOnInit() {
        this.todayDate = new Date();
    }
}
