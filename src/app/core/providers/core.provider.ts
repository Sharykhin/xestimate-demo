import { InjectionToken } from '@angular/core';

import { AuthInterface } from '../interfaces/services/auth.interface';
import { UserFactoryInterface } from '../interfaces/factories/user.factory';

export const AuthService = new InjectionToken<AuthInterface>('AuthService');
export const UserFactory = new InjectionToken<UserFactoryInterface>('UserFactory');
