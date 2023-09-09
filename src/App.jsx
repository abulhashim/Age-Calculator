import DOBForm from "./Components/DOBForm";
import AgeView from "./Components/AgeView";
import { createContext, useContext, useState } from "react";

const AgeContext = createContext();
export const useAge = () => useContext(AgeContext);

const App = () => {
  const [userAge, setUserAge] = useState({
    years: "--",
    months: "--",
    days: "--",
  });

  const updateUserAge = (age) => {
    setUserAge(age);
  };

  return (
    <main>
      <article>
        <AgeContext.Provider value={{ updateUserAge }}>
          <div className="w-[22rem] rounded-2xl rounded-br-[7rem] bg-White px-5 py-10 md:h-[40.6rem] md:w-[52.6rem] md:rounded-br-[11.5rem] md:p-[3.75rem]">
            <h1 className="sr-only">Age Calculator</h1>
            <DOBForm />
            <AgeView {...userAge} />
          </div>
        </AgeContext.Provider>
      </article>
    </main>
  );
};

export default App;
