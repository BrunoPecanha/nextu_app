import { ServiceCategoryModel } from "./service-category-model";

export interface ServiceModel {
    id: number,
    storeId: number,
    name: string,
    description: string,
    category: ServiceCategoryModel,
    price: number,
    duration: number,
    imgPath?: any,
    activated: boolean,
    variableTime: boolean,
    variablePrice: boolean,
    icon: string,
    finalPrice: number;
    finalDuration: number;
    quantity: number
}