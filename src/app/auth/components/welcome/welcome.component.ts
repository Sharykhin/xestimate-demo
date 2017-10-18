import { Component, Inject, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { AuthService } from '../../../core/providers';
import { AuthInterface } from '../../../core/interfaces/services/auth.interface';
import { UserModel } from '../../../core/models/user.model';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    public firstFormGroup: FormGroup;
    public secondFormGroup: FormGroup;
    private options = [
        'Ronnie',
        'Eero',
        'Jean',
        'Erika',
    ];

    public filteredOptions: Observable<string[]>;

    @Output() register = new EventEmitter<UserModel>();
    @ViewChild('addressInput') addressInput;

    constructor(
        @Inject(FormBuilder) private formBuilder: FormBuilder,
        @Inject(AuthService) private authService: AuthInterface,
        @Inject(Router) private router: Router
    ) {
    }

    ngOnInit() {

        this.firstFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
        });

        this.secondFormGroup = this.formBuilder.group({
            address: ['', Validators.required]
        });

        this.filteredOptions = this.firstFormGroup.controls['name'].valueChanges
            .startWith(null)
            .map(val => val ? this.filter(val) : this.options.slice());

    }

    addFocus() {
        // After view is changed with animation effect. we need to focus.
        // BUG: Material doesn't provide some callbacks of next or previous steps
        setTimeout(() => {
            this.addressInput.nativeElement.focus();
        }, 300);
    }

    registerAddress() {
        this.authService.register({
            name: this.firstFormGroup.controls['name'].value,
            address: this.secondFormGroup.controls['address'].value
        }).subscribe((user: UserModel) => {
            this.register.emit(user);
            this.router.navigate(['/estimation']);
        });
    }

    private filter(val: string): string[] {
        return this.options.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
}
