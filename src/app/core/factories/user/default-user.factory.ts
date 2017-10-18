import { Injectable } from '@angular/core';

import { UserFactoryInterface } from '../../interfaces/factories/user.factory';
import { UserRequest } from '../../interfaces/requests/user.request';
import { UserModel } from '../../models/user.model';
import * as _ from '../../utils';

@Injectable()
export class DefaultUserFactory implements UserFactoryInterface {

    createUser(data: UserRequest): UserModel {
        const user = new UserModel();
        user.id = _.guid();
        user.name = data.name;
        user.address = data.address;
        return user;
    }
}
