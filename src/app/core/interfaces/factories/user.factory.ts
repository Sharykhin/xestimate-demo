import {UserModel} from "../../models/user.model";
import {UserRequest} from "../requests/user.request";

export interface UserFactoryInterface {
    createUser(data: UserRequest): UserModel;
}
