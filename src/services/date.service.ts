import moment from "moment";
import { DateRangeInvalid } from "../errors/error.module";

export interface ISODateRange {
  startDate: string,
  endDate: string
}

export interface TimestampDateRange {
  startDate: number,
  endDate: number
}

export type ServerDateType = number;

export class DateService {
  public static ISO_DATE_FORMAT = "YYYY-MM-DD";
  public static MINUTE = 60 * 1000;
  public static HOUR = 60 * this.MINUTE;
  public static DAY = this.HOUR * 24;
  public static WEEK = this.DAY * 7;
  public static MONTH = this.DAY * 30;


  public static getDateNow = () => Date.now();
  public static getNowPlus = (timeInMillis: number) => Date.now() + timeInMillis;
  public static getNowPlusHour = (): ServerDateType => this.getNowPlus(this.HOUR);
  public static getNowPlusDay = (): ServerDateType => this.getNowPlus(this.DAY);
  public static getNowPlusWeek = (): ServerDateType => this.getNowPlus(this.WEEK);
  public static getNowPlusMonth = (): ServerDateType => this.getNowPlus(this.MONTH);


  public static validateDateRange = (startDate: ServerDateType, endDate: ServerDateType, defaultMaximumRange = this.getNowPlusMonth()): boolean => {
    const now = this.getDateNow();
    return startDate >= now && startDate < endDate && endDate <= defaultMaximumRange;
  };


  public static formatDateRange = (startDate: ServerDateType, endDate: ServerDateType): ISODateRange => {
    const isValid = this.validateDateRange(startDate, endDate);
    if (!isValid)
      throw new DateRangeInvalid();

    return this.convertTimestampDateRangeToISODateRange({ startDate, endDate });
  };


  public static getTimestampDate = (isoDate: string): number => new Date(isoDate).getTime();
  public static convertISODateRangeToTimestampDateRange = (isoDateRange: ISODateRange): TimestampDateRange => ({
    startDate: DateService.getTimestampDate(isoDateRange.startDate),
    endDate: DateService.getTimestampDate(isoDateRange.endDate)
  });


  public static getISODate = (date: number): string => moment(date).format(this.ISO_DATE_FORMAT);
  public static convertTimestampDateRangeToISODateRange = (timestampDateRange: TimestampDateRange): ISODateRange => ({
      startDate: DateService.getISODate(timestampDateRange.startDate),
      endDate: DateService.getISODate(timestampDateRange.endDate)
    }
  );
}
