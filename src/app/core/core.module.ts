import { NgModule } from '@angular/core';

import { AuthLocalStorageService } from './services/auth/auth-local-storage.service';
import { DefaultUserFactory } from './factories/user/default-user.factory';
import { AppValidators } from './services/validators';
import { DefaultEstimationItemFacotry } from './factories/item/default-estimation-item.factory';
import { DefaultSupplierItemFactory } from './factories/supplier-item/default-supplier-item.factory';
import { EstimationItemFactory, ApiEstimationItemService, Dispatcher, AuthService, UserFactory, SupplierItemFactory } from './providers';
import { LocalStorageApiEstimationItem } from './services/api/local-storage-api-estimation-item.service';
import { CoreDispatcher } from './services/core-dispatcher';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
    declarations: [
        NotFoundComponent
    ],
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
            provide: SupplierItemFactory,
            useClass: DefaultSupplierItemFactory
        },
        {
            provide: ApiEstimationItemService,
            useClass: LocalStorageApiEstimationItem
        },
        {
            provide: Dispatcher,
            useClass: CoreDispatcher
        }
    ],
    bootstrap: []
})
export class CoreModule {}
