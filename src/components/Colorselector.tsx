import React from 'react';

interface ColorSelectorProps {
  color: string; // The color code (e.g., #0E9F6E)
  colorCode: string; // The color code (e.g., #0E9F6E)
  isSelected: boolean; // Indicates if this color is currently selected
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}



export default function ColorSelector({ color,colorCode, isSelected, setSelectedColor }: ColorSelectorProps) {
  return (
    <div className="flex flex-row my-3">
      <span
        className={`rounded-full h-10 w-10 me-1 flex items-center justify-center cursor-pointer ${
          isSelected ? 'border-4 border-white' : ''
        }`}
        style={{
          backgroundColor: colorCode  , // Use the color prop for background
        }}
        onClick={() =>setSelectedColor((prev)=>  prev ? '' :color )}
      >
        {isSelected && <svg className="w-[30px] h-[30px] font-thin text-slate-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
    </svg>
}
      </span>
    </div>
  );
}

