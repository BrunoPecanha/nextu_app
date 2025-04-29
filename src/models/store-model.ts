import { HighLight } from "./hig-hlight-model";
import { OpeningHours } from "./opening-hours";
import { StatusEnum } from "./status-enum";
import { To } from "./to";
import { UserModel } from "./user-model";

export interface StoreModel extends To {
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
  openingHours: OpeningHours[];
  highLights: HighLight[];
  ownerId: number;
  owner?: UserModel;
  status: StatusEnum;
  liked: boolean;
}