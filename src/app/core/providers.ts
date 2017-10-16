import { InjectionToken } from '@angular/core';

import {EstimationItemFactoryInterface} from "./interfaces/factories/estimation-item-factory.interface";
import {ApiEstimationItemInterface} from "./interfaces/services/api-estimation-item.interface";
import {DispatcherInterface} from "./interfaces/dispatcher.interface";

export const EstimationItemFactory = new InjectionToken<EstimationItemFactoryInterface>('EstimationItemFactory');

export const ApiEstimationItemService = new InjectionToken<ApiEstimationItemInterface>('ApiEstimationItemService');

export const Dispatcher = new InjectionToken<DispatcherInterface>('Dispatcher');
