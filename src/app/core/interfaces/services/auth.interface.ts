import { UserModel } from '../../models/user.model';
import { UserRequest } from '../requests/user.request';
import {Observable} from "rxjs";

export interface AuthInterface {

    isAuthenticated(): boolean;

    register(data: UserRequest): Observable<UserModel>;

    logout();
}
