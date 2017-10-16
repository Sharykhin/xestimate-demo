import { NgModule } from '@angular/core';

import { AuthLocalStorageService } from './services/auth/auth-local-storage.service';
import { AuthService, UserFactory } from './providers/core.provider';
import { DefaultUserFactory } from './factories/user/default-user.factory';
import { AppValidators } from './services/validators';
import { DefaultEstimationItemFacotry } from './factories/item/default-estimation-item.factory';
import { EstimationItemFactory, ApiEstimationItemService } from './providers';
import { LocalStorageApiEstimationItem } from './services/api/local-storage-api-estimation-item.service';
import { CoreDispatcher } from './services/core-dispatcher';

@NgModule({
    declarations: [],
    imports: [

    ],
    providers: [
        {
            provide: AuthService,
            useClass: AuthLocalStorageService
        },
        {
            provide: UserFactory,
            useClass: DefaultUserFactory
        },
        AppValidators,
        {
            provide: EstimationItemFactory,
            useClass: DefaultEstimationItemFacotry
        },
        {
            provide: ApiEstimationItemService,
            useClass: LocalStorageApiEstimationItem
        },
        CoreDispatcher
    ],
    bootstrap: []
})
export class CoreModule {}
