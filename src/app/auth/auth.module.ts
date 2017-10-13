import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatStepperModule, MatInputModule, MatAutocompleteModule } from '@angular/material';

import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatButtonModule,
        MatInputModule, MatStepperModule, MatAutocompleteModule
    ],
    declarations: [
        WelcomeComponent
    ],
    bootstrap: [],
    providers: [],
    exports: [
        WelcomeComponent
    ]
})
export class AuthModule {}
