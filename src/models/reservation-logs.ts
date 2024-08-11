import { Status } from "@prisma/client";

export interface Logs {
  id: number;
  reservation_id: number;
  user_id: number;
  old_status: Status;
  new_status: Status;
  reason: string;
  created_at: Date;
}
