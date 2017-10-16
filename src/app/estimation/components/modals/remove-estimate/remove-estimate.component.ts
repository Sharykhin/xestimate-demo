import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-modal-remove-estimate-item',
    templateUrl: './remove-estimate.component.html'
})
export class ModalRemoveEstimateComponent {

    constructor(
        public dialogRef: MatDialogRef<ModalRemoveEstimateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
