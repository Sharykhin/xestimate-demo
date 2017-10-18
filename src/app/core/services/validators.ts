import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class AppValidators {

    unitType(control: FormControl): { [s: string]: boolean} {
        if (['SF', 'EA', 'LF', 'GL', 'BX', 'BN', 'SH', 'TB', 'BG', 'CY'].indexOf(control.value.toUpperCase()) === -1) {
            return { invalidUnitType: true };
        }
    }
}
