import { Response } from 'express';
import { CustomError } from './custom.error';
import { LogService } from '../../presentation/services';
import { LogEntity, LogSeverityLevel } from '../entities';

export class CustomErrorImpl extends Error {
    private readonly logService = new LogService();
    public originName: string = 'undefined';

    public handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        const log = new LogEntity({
            message: `${error}`,
            level: LogSeverityLevel.high,
            origin: this.originName,
        });
        this.logService.saveLog(log);
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };
}
