import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { EstimationItemModel } from '../../../core/models/estimation-item.model';

@Component({
    selector: 'app-estimation-edit-page',
    templateUrl: './estimation-edit-page.component.html'
})
export class EstimationEditPageComponent implements OnInit {

    public item: EstimationItemModel;

    constructor(
       @Inject(ActivatedRoute) private route: ActivatedRoute,
       @Inject(Router) private router: Router,
       @Inject(ToastsManager) private toastr: ToastsManager,
       @Inject(ViewContainerRef) private vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.route.data.forEach((data: { item: EstimationItemModel }) => {
            this.item = data.item;
        });
    }

    public edit(item: EstimationItemModel): void {
        setTimeout(() => {
            this.toastr.success('Item has been edited!', null, {
                dismiss: 'click',
                toastLife: 3000
            });
        }, 0);
        this.router.navigate(['/estimation/list']);
    }
}
