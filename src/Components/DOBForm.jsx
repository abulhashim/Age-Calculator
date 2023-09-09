/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import arrowIcon from "../assets/images/icon-arrow.svg";
import {
  calculateAge,
  validateDay,
  validateMonth,
  validateYear,
} from "../Utils";
import { useAge } from "../App";

const DOBForm = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [isDayValid, setIsDayValid] = useState(true);
  const [isMonthValid, setIsMonthValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);

  const [isDayProvided, setIsDayProvided] = useState(true);
  const [isMonthProvided, setIsMonthProvided] = useState(true);
  const [isYearProvided, setIsYearProvided] = useState(true);

  // to prevent the useEffect from running on initial render
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (!initialRender) {
      const isValid = validateDay(day, month, year);
      day ? setIsDayProvided(true) : setIsDayProvided(false);
      setIsDayValid(isValid);
    } else {
      setInitialRender(false);
    }
  }, [day, month, year]);

  useEffect(() => {
    if (!initialRender) {
      month ? setIsMonthProvided(true) : setIsMonthProvided(false);
      const isValid = validateMonth(month);
      setIsMonthValid(isValid);
    } else {
      setInitialRender(false);
    }
  }, [month]);

  useEffect(() => {
    if (!initialRender) {
      year ? setIsYearProvided(true) : setIsYearProvided(false);
      const isValid = validateYear(year);
      setIsYearValid(isValid);
    } else {
      setInitialRender(false);
    }
  }, [year]);

  // to update the age in the context
  const { updateUserAge } = useAge();

  const handleSubmit = (e) => {
    e.preventDefault();

    // if any of the fields are empty, set the isProvided state to false
    day ? setIsDayProvided(true) : setIsDayProvided(false);
    month ? setIsMonthProvided(true) : setIsMonthProvided(false);
    year ? setIsYearProvided(true) : setIsYearProvided(false);

    // if all the fields are valid, calculate the age
    if (day && month && year) {
      const DOB = new Date(`${month}/${day}/${year}`);
      const age = calculateAge(DOB);
      updateUserAge(age);
    }
  };

  return (
    <form>
      <div className="flex gap-4 md:gap-8">
        <label
          htmlFor="day"
          className={`flex flex-col gap-[0.625rem] text-xs font-bold uppercase tracking-[0.3em] text-SmokeyGrey md:text-sm ${
            (!isDayProvided || !isDayValid) && "text-red-400"
          }`}
        >
          day
          <input
            type="text"
            name="day"
            id="day"
            value={day}
            placeholder="DD"
            onChange={(e) => setDay(e.target.value)}
            className={`w-[5.8rem] rounded-lg border border-LightGrey px-3 py-3 text-[1.5rem] font-bold placeholder:text-SmokeyGrey md:w-[10rem] md:text-[2rem] ${
              (!isDayProvided || !isDayValid) && "border-LightRed"
            }`}
          />
          {(!isDayProvided || !isDayValid) && (
            <div className="text-xs font-normal lowercase italic tracking-normal text-LightRed">
              {!isDayProvided
                ? "This field is required"
                : (day, month, year)
                ? "Must be a valid date"
                : "Must be a valid day"}
            </div>
          )}
        </label>
        <label
          htmlFor="month"
          className={`flex flex-col gap-[0.625rem] text-xs font-bold uppercase tracking-[0.3em] text-SmokeyGrey md:text-sm ${
            (!isMonthProvided || !isMonthValid) && "text-red-400"
          }`}
        >
          month
          <input
            type="text"
            name="month"
            id="month"
            value={month}
            placeholder="MM"
            onChange={(e) => setMonth(e.target.value)}
            className={`w-[5.8rem] rounded-lg border border-LightGrey px-3 py-3 text-[1.5rem] font-bold placeholder:text-SmokeyGrey md:w-[10rem] md:text-[2rem] ${
              (!isMonthProvided || !isMonthValid) && "border-LightRed"
            }`}
          />
          {(!isMonthProvided || !isMonthValid) && (
            <div className="text-xs font-normal lowercase italic tracking-normal text-LightRed">
              {!isMonthProvided
                ? "This field is required"
                : "Must be a valid Month"}
            </div>
          )}
        </label>
        <label
          htmlFor="year"
          className={`flex flex-col gap-[0.625rem] text-xs font-bold uppercase tracking-[0.3em] text-SmokeyGrey md:text-sm ${
            (!isYearProvided || !isYearValid) && "text-red-400"
          }`}
        >
          year
          <input
            type="text"
            name="year"
            id="year"
            value={year}
            placeholder="YYYY"
            onChange={(e) => setYear(e.target.value)}
            className={`w-[5.8rem] rounded-lg border border-LightGrey px-3 py-3 text-[1.5rem] font-bold placeholder:text-SmokeyGrey md:w-[10rem] md:text-[2rem] ${
              (!isYearProvided || !isYearValid) && "border-LightRed"
            }`}
          />
          {(!isYearProvided || !isYearValid) && (
            <div className="text-xs font-normal lowercase italic tracking-normal text-LightRed">
              {!isYearProvided ? "This field is required" : "Must be in past"}
            </div>
          )}
        </label>
      </div>
      <hr className="mt-14 md:mt-12" />
      <button
        type="submit"
        aria-label="get age"
        className="mx-auto -mt-[2em] flex items-center justify-center rounded-full bg-Purple p-3 transition-all duration-300 hover:bg-OffBlack md:-mt-[3em] md:ml-auto md:mr-0 md:p-6"
        onClick={handleSubmit}
      >
        <img src={arrowIcon} alt="arrow icon" />
      </button>
    </form>
  );
};

export default DOBForm;
