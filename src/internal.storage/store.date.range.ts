import { NextFunction, Request, Response } from "express";
import { DateService, ISODateRange } from "../services/date.service";
import { internalLocalStorage } from "../config/internal.local.storage.config";

export const storeDateRange = (req: Request, res: Response, next: NextFunction) => {
  const provideDefaultStartDate = (): string => DateService.getISODate(DateService.getDateNow());
  const provideDefaultEndDate = (): string => DateService.getISODate(DateService.getNowPlus(DateService.WEEK * 2));


  if (!req.query.startDate || !req.query.endDate)
    internalLocalStorage.setDateRange({ startDate: provideDefaultStartDate(), endDate: provideDefaultEndDate() });
  else {
    const formattedDateRange: ISODateRange = DateService.formatDateRange(parseInt(req.query.startDate as string), parseInt(req.query.endDate as string));
    internalLocalStorage.setDateRange(formattedDateRange);
  }

  next();
};

