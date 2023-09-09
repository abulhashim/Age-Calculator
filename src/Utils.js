export function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const ageInMilliseconds = today - birthDate;
  // Constants for milliseconds in a day, average year, and average month
  const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
  const MILLISECONDS_IN_AVERAGE_YEAR = 365.2425 * MILLISECONDS_IN_A_DAY;
  const MILLISECONDS_IN_AVERAGE_MONTH = MILLISECONDS_IN_AVERAGE_YEAR / 12;
  // Calculate years, months, and days
  const years = Math.floor(ageInMilliseconds / MILLISECONDS_IN_AVERAGE_YEAR);
  const months = Math.floor(
    (ageInMilliseconds % MILLISECONDS_IN_AVERAGE_YEAR) /
      MILLISECONDS_IN_AVERAGE_MONTH,
  );
  const days = Math.floor(
    (ageInMilliseconds % MILLISECONDS_IN_AVERAGE_MONTH) / MILLISECONDS_IN_A_DAY,
  );

  const age = {
    years,
    months,
    days,
  };

  return age;
}

export function validateDay(day, month, year) {
  if (!year && !month && day) {
    return validateWithinRange(day, 1, 31);
  }

  if (!year && month && day) {
    if (!validateMonth(month)) {
      return false;
    }
    const lastDayOfMonth = getLastDayOfMonth(year, month);
    return validateWithinRange(day, 1, lastDayOfMonth);
  }

  if (year && month && day) {
    if (!validateYear(year)) {
      return false;
    }
    if (!validateMonth(month)) {
      return false;
    }
    const lastDayOfMonth = getLastDayOfMonth(year, month);
    return validateWithinRange(day, 1, lastDayOfMonth);
  }

  return false;
}

export function validateMonth(month) {
  return validateWithinRange(month, 1, 12);
}

export function validateYear(year) {
  const currentYear = new Date().getFullYear();
  return validateWithinRange(year, 1900, currentYear);
}

function validateWithinRange(value, min, max) {
  const intValue = parseInt(value, 10);
  return !isNaN(intValue) && intValue >= min && intValue <= max;
}

function getLastDayOfMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
