import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-modal-remove-estimate-item',
    templateUrl: './process-estimate.component.html'
})
export class ModalProcessEstimateComponent {

    constructor(
        public dialogRef: MatDialogRef<ModalProcessEstimateComponent>
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
