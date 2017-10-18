import {Component, Inject, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-go-to-estimation-form',
    templateUrl: './go-to-estimation-form.component.html'
})
export class GoToEstimationFormComponent {

    @Input() route: Array<any>;

    constructor(
        @Inject(Router) private router: Router
    ) {}

    public back() {
        if (this.route) {
            this.router.navigate(this.route);
        } else {
            this.router.navigate(['/estimation']);
        }

    }
}
