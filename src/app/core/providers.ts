import { InjectionToken } from '@angular/core';

import { EstimationItemFactoryInterface } from './interfaces/factories/estimation-item-factory.interface';
import { ApiEstimationItemInterface } from './interfaces/services/api-estimation-item.interface';
import { DispatcherInterface } from './interfaces/dispatcher.interface';
import { AuthInterface } from './interfaces/services/auth.interface';
import { UserFactoryInterface } from './interfaces/factories/user.factory';
import { SupplierItemFactoryInterface } from './interfaces/factories/supplier-item-factory.interface';

export const EstimationItemFactory = new InjectionToken<EstimationItemFactoryInterface>('EstimationItemFactory');
export const ApiEstimationItemService = new InjectionToken<ApiEstimationItemInterface>('ApiEstimationItemService');
export const Dispatcher = new InjectionToken<DispatcherInterface>('Dispatcher');
export const AuthService = new InjectionToken<AuthInterface>('AuthService');
export const UserFactory = new InjectionToken<UserFactoryInterface>('UserFactory');
export const SupplierItemFactory = new InjectionToken<SupplierItemFactoryInterface>('SupplierItemFactory');
