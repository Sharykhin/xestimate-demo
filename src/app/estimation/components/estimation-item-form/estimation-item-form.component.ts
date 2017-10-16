import {
    Component, OnInit, Input, Output, EventEmitter, Inject, ViewChildren, AfterViewInit,
    OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EstimationItemModel } from '../../../core/models/estimation-item.model';
import { EstimationItemRequest } from '../../../core/interfaces/requests/estimation-item.request';
import { AppValidators } from '../../../core/services/validators';
import { EstimationItemFactory, ApiEstimationItemService, Dispatcher } from '../../../core/providers';
import { EstimationItemFactoryInterface } from '../../../core/interfaces/factories/estimation-item-factory.interface';
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';
import { DispatcherInterface } from '../../../core/interfaces/dispatcher.interface';
import {EVENTS} from "../../../core/services/events";

@Component({
    selector: 'app-estimation-item-form',
    templateUrl: './estimation-item-form.component.html',
    styleUrls: ['./estimation-item-form.component.css']
})
export class EstimationItemFormComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() item: EstimationItemModel;
    @Output() onSave = new EventEmitter<EstimationItemModel>();
    @Output() onEdit = new EventEmitter<EstimationItemModel>();

    @ViewChildren('input') vc;

    public itemForm: FormGroup;
    private isNew: boolean;
    public submitted = false;
    private removeListener;

    constructor(
        @Inject(FormBuilder) private formBuilder: FormBuilder,
        @Inject(AppValidators) private validators: AppValidators,
        @Inject(EstimationItemFactory) private itemFactory: EstimationItemFactoryInterface,
        @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface,
        @Inject(Dispatcher) private dispatcher: DispatcherInterface
    ) {}

    ngOnInit() {

        this.buildForm();

        if (!this.item) {
            this.isNew = true;
            this.item = this.itemFactory.createItem({});
        } else {
            this.isNew = false;
        }

        this.removeListener = this.dispatcher.on(EVENTS.EDIT_ITEM, (item: EstimationItemModel) => {
            this.item = item;
            this.itemForm.setValue({
                category: item.category,
                selector: item.selector,
                description: item.description,
                unitType: item.unitType,
                units: item.units,
                cost: item.cost
            });
            this.isNew = false;
        });
    }

    ngOnDestroy() {
        this.removeListener();
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

        this.apiItem.save(this.item, this.isNew)
            .subscribe(() => {
                if (this.isNew) {
                    this.onSave.emit(this.item);
                } else {
                    this.onEdit.emit(this.item);
                }
                this.itemForm.markAsPending();
                this.itemForm.markAsUntouched();
                this.resetForm();
                this.submitted = false;
                this.item = this.itemFactory.createItem({});
                if (this.isNew) {
                    this.vc.first.nativeElement.focus();
                }

                this.isNew = true;
            });
    }

    cancel(): void {
        this.itemForm.markAsPending();
        this.itemForm.markAsUntouched();
        this.resetForm();
        this.submitted = false;
        this.item = this.itemFactory.createItem({});
        this.isNew = true;
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
