import { NgModule } from '@angular/core';

import { AuthLocalStorageService } from './services/auth/auth-local-storage.service';
import { AuthService, UserFactory } from './providers/core.provider';
import { DefaultUserFactory } from './factories/user/default-user.factory';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        {
            provide: AuthService,
            useClass: AuthLocalStorageService
        },
        {
            provide: UserFactory,
            useClass: DefaultUserFactory
        }
    ],
    bootstrap: []
})
export class CoreModule {}
