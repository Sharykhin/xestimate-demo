import {
    Component, OnInit, Input, Output, EventEmitter, Inject, ViewChildren, AfterViewInit,
    OnDestroy, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EstimationItemModel } from '../../../core/models/estimation-item.model';
import { EstimationItemRequest } from '../../../core/interfaces/requests/estimation-item.request';
import { AppValidators } from '../../../core/services/validators';
import { EstimationItemFactory, ApiEstimationItemService, Dispatcher } from '../../../core/providers';
import { EstimationItemFactoryInterface } from '../../../core/interfaces/factories/estimation-item-factory.interface';
import { ApiEstimationItemInterface } from '../../../core/interfaces/services/api-estimation-item.interface';
import { DispatcherInterface } from '../../../core/interfaces/dispatcher.interface';
import { EVENTS } from '../../../core/services/events';

@Component({
    selector: 'app-estimation-item-form',
    templateUrl: './estimation-item-form.component.html',
    styleUrls: ['./estimation-item-form.component.css']
})
export class EstimationItemFormComponent implements OnInit, AfterViewInit, OnDestroy {

    // TODO: it would work if form is used on separate page, but not with the list
    @Input() item: EstimationItemModel;
    @Input() hideCancel: boolean;
    @Output() onSave = new EventEmitter<EstimationItemModel>();
    @Output() onEdit = new EventEmitter<EstimationItemModel>();

    @ViewChildren('input') vc;
    @ViewChild('formView') formView;

    public itemForm: FormGroup;
    public isNew: boolean;
    public submitted: boolean = false;
    private removeListener: () => void;

    constructor(
        @Inject(FormBuilder) private formBuilder: FormBuilder,
        @Inject(AppValidators) private validators: AppValidators,
        @Inject(EstimationItemFactory) private itemFactory: EstimationItemFactoryInterface,
        @Inject(ApiEstimationItemService) private apiItem: ApiEstimationItemInterface,
        @Inject(Dispatcher) private dispatcher: DispatcherInterface,
        private pizda: ChangeDetectorRef
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
        // TODO: This hack fix bug with ExpressionChange Error.It looks lkie
        // EstimationItemFormComponent.html:3
        // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError:
        // Expression has changed after it was checked. Previous value: 'false'. Current value: 'true'
        // setTimeout(() => {
        //     this.vc.first.nativeElement.focus();
        // }, 0);
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
        this.resetForm();
        this.submitted = false;
        this.item = this.itemFactory.createItem({});
        this.isNew = true;
    }

    private buildForm(): void {
        this.itemForm = this.formBuilder.group({
            category: [ this.item ? this.item.category : '', Validators.required ],
            selector: [ this.item ? this.item.selector : '', Validators.required ],
            description: [ this.item ? this.item.description : '', Validators.required ],
            unitType: [this.item ? this.item.unitType : '', Validators.compose([
                Validators.required,
                this.validators.unitType
            ])],
            units: [this.item ? this.item.units : '', Validators.required ],
            cost: [this.item ? this.item.cost : '', Validators.required ]
        });
    }

    private resetForm() {
        for (const name in this.itemForm.controls) {
            if (this.itemForm.controls.hasOwnProperty(name)) {
                this.itemForm.controls[name].setErrors(null);
                this.itemForm.controls[name].setValue('');
                // Need to mark as untouched to show default validation of material.
                this.itemForm.controls[name].markAsUntouched();
            }
        }

        // By some reasons without delayed call it doesn't work.
        setTimeout(() => {
            this.formView.nativeElement.querySelectorAll('mat-form-field').forEach((formElement) => {
                formElement.classList.remove('mat-form-field-invalid');
            });
        }, 0);
    }
}
