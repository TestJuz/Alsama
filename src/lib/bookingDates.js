const BUSINESS_DAYS_OF_ADVANCE = 1;

export const ONE_BUSINESS_DAY_NOTICE_ERROR = "Please select a date with at least one business day of advance.";
export const SAME_DAY_OR_FUTURE_ERROR = "Please select today or a future date.";

export function startOfLocalDay(date = new Date()) {
  const localDate = new Date(date);
  localDate.setHours(0, 0, 0, 0);
  return localDate;
}

export function toDateInputValue(date) {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

export function toDateTimeInputValue(date) {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
}

export function getTodayDateInputValue() {
  return toDateInputValue(startOfLocalDay());
}

export function getOneBusinessDayAdvanceDate(fromDate = new Date()) {
  const date = startOfLocalDay(fromDate);
  let businessDays = 0;

  while (businessDays < BUSINESS_DAYS_OF_ADVANCE) {
    date.setDate(date.getDate() + 1);

    if (isBusinessDay(date)) {
      businessDays += 1;
    }
  }

  date.setDate(date.getDate() + 1);
  return date;
}

export function getOneBusinessDayAdvanceDateInputValue(fromDate = new Date()) {
  return toDateInputValue(getOneBusinessDayAdvanceDate(fromDate));
}

export function getOneBusinessDayAdvanceDateTimeInputValue(fromDate = new Date()) {
  return toDateTimeInputValue(getOneBusinessDayAdvanceDate(fromDate));
}

export function isDateBeforeMinimumInput(value, minimumValue) {
  if (!value) return false;

  const selected = new Date(`${value}T00:00`);
  const minimum = new Date(`${minimumValue}T00:00`);

  return (
    !Number.isNaN(selected.getTime()) &&
    !Number.isNaN(minimum.getTime()) &&
    selected < minimum
  );
}

export function isDateTimeBeforeMinimumInput(value, minimumValue) {
  if (!value) return false;

  const selected = new Date(value);
  const minimum = new Date(minimumValue);

  return (
    !Number.isNaN(selected.getTime()) &&
    !Number.isNaN(minimum.getTime()) &&
    selected < minimum
  );
}

function isBusinessDay(date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}
