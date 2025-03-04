import { ServiceModel } from "./service-model";

export interface StoreModel {
    id: string;
    ownerId: string;
    name: string;
    description: string;
    registeringDate?: Date;
    lastUpDate?: Date;
    phone?: string;
    street?: string;
    number?: string;
    city?: string;
    state?: string;
    logo?: string;
    backgrounding?: string;
    status?: StatusStoreEnum;
    services?: ServiceModel[];
  }

export enum StatusStoreEnum {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING'
}