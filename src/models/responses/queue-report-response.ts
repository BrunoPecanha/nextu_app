import { QueueReportItemModel } from "../queue-report-item-model";

export interface QueueReportResponse {
  valid: boolean;
  data: QueueReportItemModel[];
  message: string;
}
  