import {Injectable, Inject} from '@angular/core';
import { AuthInterface } from '../../interfaces/services/auth.interface';
import {UserModel} from "../../models/user.model";
import {UserRequest} from "../../interfaces/requests/user.request";
import {UserFactory} from "../../providers/core.provider";
import {UserFactoryInterface} from "../../interfaces/factories/user.factory";
import {Observable, Observer} from "rxjs";

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
        });
    }

    logout() {
        window.localStorage.removeItem(this.USER_KEY);
    }
}
