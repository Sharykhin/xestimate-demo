import { InjectionToken } from '@angular/core';

import {EstimationItemFactoryInterface} from "./interfaces/factories/estimation-item-factory.interface";
import {ApiEstimationItemInterface} from "./interfaces/services/api-estimation-item.interface";

export const EstimationItemFactory = new InjectionToken<EstimationItemFactoryInterface>('EstimationItemFactory');

export const ApiEstimationItemService = new InjectionToken<ApiEstimationItemInterface>('ApiEstimationItemService');
