import { HighLightRequest } from "./highlight-request";
import { OpeningHoursRequest } from "./opening-hours-request";

export interface StoreRequest {
  ownerId: number;
  cnpj: string;
  name: string;
  address: string;
  number: string;
  city: string;
  state: string;
  openAutomatic: boolean;
  storeSubtitle: string;
  acceptOtherQueues: boolean;
  answerOutOfOrder: boolean;
  answerScheduledTime: boolean;
  timeRemoval?: number | null;
  whatsAppNotice: boolean;
  logoPath: string;
  wallPaperPath: string;
  categoryId: number;
  openingHours: OpeningHoursRequest[];
  highLights: HighLightRequest[];
}
