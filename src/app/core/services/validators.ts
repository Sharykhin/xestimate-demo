import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable()
export class AppValidators {

    unitType(control: FormControl): { [s: string]: boolean} {
        if (['SF', 'EA', 'LF'].indexOf(control.value.toUpperCase()) === -1) {
            return { invalidUnitType: true}
        }
    }
}
