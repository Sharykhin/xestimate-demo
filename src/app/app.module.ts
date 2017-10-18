import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { MatButtonModule, MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, CoreModule, AuthModule, routing, MatButtonModule, MatToolbarModule, ToastModule.forRoot()
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
