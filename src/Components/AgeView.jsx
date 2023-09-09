/* eslint-disable react/prop-types */
const Output = ({ years, months, days }) => {
  return (
    <div className="mt-8 text-5xl font-extrabold italic leading-[1.1] text-OffBlack md:mt-0 md:text-[6.5rem] md:leading-[1.07]">
      <p>
        <span className="text-Purple">{years}</span> years
      </p>
      <p>
        <span className="text-Purple">{months}</span> months
      </p>
      <p>
        <span className="text-Purple">{days}</span> days
      </p>
    </div>
  );
};

export default Output;
