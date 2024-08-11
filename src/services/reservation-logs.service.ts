import { LogRepository } from "../repositories/reservation-logs.repository";

export class LogService {
  private logRepository = new LogRepository();

  getLogs = async () => {
    const result = await this.logRepository.getLogs();

    return result;
  };
}
