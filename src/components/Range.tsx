import React, { useState } from "react";

type FilterProps = {
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>,
  min : number, max : number, initialOne : number, initialTwo : number,
};


const DoubleRangeSlider = (props:FilterProps) => {

  const { setPriceRange } = props; 
  const { min } = props; 
  const { max } = props; 
  const { initialOne } = props; 
  const { initialTwo } = props; 



  const [rangeOne, setRangeOne] = useState(initialOne);
  const [rangeTwo, setRangeTwo] = useState(initialTwo);

  const handleRangeOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), rangeTwo - 1);
    setRangeOne(value);
    setPriceRange([value,rangeTwo])

  };
  
  const handleRangeTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), rangeOne + 1);
    setRangeTwo(value);
    setPriceRange([rangeOne,value])

  };
  const calculatePercentage = (value: number) => ((value - min) / (max - min)) * 100;

  
  

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative mt-8">
        {/* Track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
        {/* Selected Range */}
        <div
          className="absolute h-2 bg-black text-black rounded-lg"
          style={{
            left: `${calculatePercentage(rangeOne)}%`,
            width: `${calculatePercentage(rangeTwo) - calculatePercentage(rangeOne)}%`,
          }}
        ></div>
        {/* Range Input One */}
        <input
          type="range"
          min={min}
          max={max}
          value={rangeOne}
          onChange={handleRangeOneChange}
          className="absolute w-full h-2 bg-transparent  appearance-none cursor-pointer pointer-events-auto"
          style={{
            zIndex: rangeOne > max / 2 ? "5" : "3",
          }}
        />
        {/* Range Input Two */}
        <input
          type="range"
          min={min}
          max={max}
          value={rangeTwo}
          onChange={handleRangeTwoChange}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-auto"
          style={{
            zIndex: rangeTwo < max / 2 ? "5" : "3",
          }}
        />
        {/* Value Display for Range One */}
        <div
          className="absolute top-4 text-sm font-medium text-gray-900 dark:text-white"
          style={{
            left: `calc(${calculatePercentage(rangeOne)}% - 12px)`,
          }}
        >
          
          ${rangeOne}
        </div>
        {/* Value Display for Range Two */}
        <div
          className="absolute top-4 text-sm font-medium text-gray-900 dark:text-white"
          style={{
            left: `calc(${calculatePercentage(rangeTwo)}% - 12px)`,
          }}
        >
          ${rangeTwo}
        </div>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
