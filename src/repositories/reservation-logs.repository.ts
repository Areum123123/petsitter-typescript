import { Logs } from "../models/reservation-logs.js";
import { prisma } from "../utils/prisma.util.js";

export class LogRepository {
  getLogs = async (): Promise<Logs[]> => {
    return await prisma.reservation_logs.findMany({
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        reservation_id: true,
        user_id: true,
        old_status: true,
        new_status: true,
        reason: true,
        created_at: true,
      },
    });
  };
}
