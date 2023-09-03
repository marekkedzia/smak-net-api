import { NextFunction, Request, Response } from "express";
import { DateUtils, ISODateRange } from "../utils/date.utils";
import { internalLocalStorage } from "../config/internal.local.storage.config";

export const storeDateRange = (req: Request, res: Response, next: NextFunction) => {
  const provideDefaultStartDate = (): string => DateUtils.getISODate(DateUtils.getDateNow());
  const provideDefaultEndDate = (): string => DateUtils.getISODate(DateUtils.getNowPlus(DateUtils.WEEK * 2));


  if (!req.query.startDate || !req.query.endDate)
    internalLocalStorage.setDateRange({ startDate: provideDefaultStartDate(), endDate: provideDefaultEndDate() });
  else {
    const formattedDateRange: ISODateRange = DateUtils.formatDateRange(parseInt(req.query.startDate as string), parseInt(req.query.endDate as string));
    internalLocalStorage.setDateRange(formattedDateRange);
  }

  next();
};

