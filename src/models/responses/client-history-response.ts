import { ClientHistoryRecordModel } from "../client-history-record-model";

export interface ClientHistoryResponse {
  valid: boolean;
  data: ClientHistoryRecordModel[];
  message: string;
}
  