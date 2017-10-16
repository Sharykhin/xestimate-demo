import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChildren, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EstimationItemModel } from '../../../core/models/estimation-item.model';
import { EstimationItemRequest } from '../../../core/interfaces/requests/estimation-item.request';
import { AppValidators } from '../../../core/services/validators';
import { EstimationItemFactory, ApiEstimationItemService } from '../../../core/providers';
import { EstimationItemFactoryInterface } from '../../../core/interfaces/factories/estimation-item-factory.interface';
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';

@Component({
    selector: 'app-estimation-item-form',
    templateUrl: './estimation-item-form.component.html',
    styleUrls: ['./estimation-item-form.component.css']
})
export class EstimationItemFormComponent implements OnInit, AfterViewInit {

    @Input() item: EstimationItemModel;
    @Output() onSave = new EventEmitter<EstimationItemModel>();

    @ViewChildren('input') vc;

    public itemForm: FormGroup;
    private isNew: boolean;
    public submitted = false;

    constructor(
        @Inject(FormBuilder) private formBuilder: FormBuilder,
        @Inject(AppValidators) private validators: AppValidators,
        @Inject(EstimationItemFactory) private itemFactory: EstimationItemFactoryInterface,
        @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface
    ) {}

    ngOnInit() {

        this.buildForm();

        if (!this.item) {
            this.isNew = true;
            this.item = this.itemFactory.createItem({});
        } else {
            this.isNew = false;
        }
    }

    ngAfterViewInit() {
        // This hack fix bug with ExpressionChange Error
        setTimeout(() => {
            this.vc.first.nativeElement.focus();
        }, 0);
    }

    onSubmit(values: EstimationItemRequest): void {
        this.submitted = true;
        if (this.itemForm.invalid) {
            return;
        }
        this.item.category = values.category;
        this.item.selector = values.selector;
        this.item.description = values.description;
        this.item.unitType = values.unitType;
        this.item.units = values.units;
        this.item.cost = values.cost;

        this.apiItem.save(this.item)
            .subscribe(() => {
                this.onSave.emit(this.item);
                this.itemForm.markAsPending();
                this.itemForm.markAsUntouched();
                this.resetForm();
                this.submitted = false;
                this.item = this.itemFactory.createItem({});
                this.vc.first.nativeElement.focus();
            });
    }

    private buildForm(): void {
        this.itemForm = this.formBuilder.group({
            category: [ '', Validators.required ],
            selector: [ '', Validators.required ],
            description: [ '', Validators.required ],
            unitType: ['', Validators.compose([
                Validators.required,
                this.validators.unitType
            ])],
            units: ['', Validators.required ],
            cost: ['', Validators.required ]
        });
    }

    private resetForm() {
        for (let name in this.itemForm.controls) {
            this.itemForm.controls[name].setErrors(null);
            this.itemForm.controls[name].setValue('');
            this.itemForm.controls[name].markAsUntouched();
        }
    }
}
