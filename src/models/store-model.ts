import { HighLightModel } from "./highlight-model";
import { OpeningHoursModel } from "./opening-hours-model";

import { StatusEnum } from "./enums/status-enum";
import { To } from "./to";
import { UserModel } from "./user-model";

export interface StoreModel extends To {
  id: number;
  cnpj: string;
  name: string;
  address: string;
  number: string;
  rating: number;
  votes: number;
  minorQueue: number;
  city: string;
  category: string;
  state: string;
  openAutomatic: boolean;
  storeSubtitle: string;
  acceptOtherQueues: boolean;
  answerOutOfOrder: boolean;
  answerScheduledTime: boolean;
  timeRemoval?: number; 
  whatsAppNotice: boolean;
  logoPath?: string;
  wallPaperPath?: string; 
  openingHours: OpeningHoursModel[];
  highLights: HighLightModel[];
  ownerId: number;
  owner?: UserModel;
  status: StatusEnum;
  liked: boolean;
  createdAt?: string | any;
  isNew?: boolean
}