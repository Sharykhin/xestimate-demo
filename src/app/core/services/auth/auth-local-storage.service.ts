import { Injectable, Inject } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { AuthInterface } from '../../interfaces/services/auth.interface';
import { UserModel } from '../../models/user.model';
import { UserRequest } from '../../interfaces/requests/user.request';
import { UserFactory } from '../../providers';
import { UserFactoryInterface } from '../../interfaces/factories/user.factory';

@Injectable()
export class AuthLocalStorageService implements AuthInterface {

    readonly USER_KEY = 'e_user';

    constructor(@Inject(UserFactory) private userFactory: UserFactoryInterface) {
    }

    isAuthenticated(): boolean {
        return !!window.localStorage.getItem(this.USER_KEY);
    }

    register(data: UserRequest): Observable<UserModel> {
        return new Observable((observer: Observer<any>) => {
            const user = this.userFactory.createUser(data);
            window.localStorage.setItem(this.USER_KEY, JSON.stringify(user));
            observer.next(user);
            observer.complete();
        });
    }

    logout() {
        window.localStorage.removeItem(this.USER_KEY);
    }
}
