import Range from "@/components/Range";
import ColorSelector from "./Colorselector";
import { useState } from "react";

type FilterProps = {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  setSelectedStyle: React.Dispatch<React.SetStateAction<string>>;
  setApplyFilter: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string | null;
  selectedStyle: string | null;
  selectedColor: string | null;
  selectedSize: string | null;
};

export default function Page(props: FilterProps) {
  const { setSelectedCategory } = props;
  const { setPriceRange } = props;
  const { setSelectedStyle } = props;
  const { setSelectedColor } = props;
  const { setSelectedSize } = props;
  const { setApplyFilter } = props;
  const { selectedCategory } = props;
  const { selectedStyle } = props;
  const { selectedColor } = props;
  const { selectedSize } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);


  // const handleColorSelect = (color: string) => {
  //   setSelectedColor( prev => prev ? '' :color );
  // };
  const toggleAccordion = () => {           
    setIsOpen(!isOpen);
  };
  const toggleAccordion1 = () => {
    setIsOpen1(!isOpen1);
  };
  const toggleAccordion2 = () => {
    setIsOpen2(!isOpen2);
  };
  const toggleAccordion3 = () => {
    setIsOpen3(!isOpen3);
  };            

  const subCategories = [
    { name: "T-shirts", href: "#" },
    { name: "Shorts", href: "#" },
    { name: "Shirts", href: "#" },
    { name: "Hoodie", href: "#" },
    { name: "Jeans", href: "#" },
  ];
  const dressStyle = [
    { name: "casual", href: "#" },
    { name: "formal", href: "#" },
    { name: "Party", href: "#" },
    { name: "Gym", href: "#" },
  ];
  type Color = {
    name: string;
    code:string
  };
  const Colors: Color[] = [
    {
      name: "green",
      code: "#00c04b",
    },
    {
      name: "red",
      code: "#E02424",
    },
    {
      name: "yellow",
      code: "#FACA15",
    },
    {
      name: "brown",
      code: "#8E4B10",
    },
    {
      name: "skyblue",
      code: "#3F83F8",
    },
    {
      name: "blue",
      code: "#1A56DB",
    },
    {
      name: "violot",
      code: "#6C2BD9",
    },
    {
      name: "pink",
      code: "#D61F69",
    },
    {
      name: "grey",
      code: "#FDF2F2",
    },
    {
      name: "black",
      code: "#111827",
    },
  ];

  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  return (
    <form className=" lg:border  lg:rounded-xl h-auto">
      <div className="flex my-3 justify-between px-4">
        <h1 className="text-lg font-bold  text-gray-900">Filters</h1>
        <svg
          className=" text-gray-500 dark:text-white hidden lg:block"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M5 13.17a3.001 3.001 0 0 0 0 5.66V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 0 0-2 0v9.17ZM11 20v-9.17a3.001 3.001 0 0 1 0-5.66V4a1 1 0 1 1 2 0v1.17a3.001 3.001 0 0 1 0 5.66V20a1 1 0 1 1-2 0Zm6-1.17V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 1 0-2 0v9.17a3.001 3.001 0 0 0 0 5.66Z" />
        </svg>
      </div>
      <hr className="mx-4" />
      <h3 className="sr-only">Categories</h3>
      <ul
        role="list"
        className="space-y-4 px-3 mt-2  border-gray-200 pb-6 text-sm font-medium  text-gray-500"
      >
        {subCategories.map((category) => (
          <li key={category.name} className="flex justify-between">
            <span
              onClick={() =>
                setSelectedCategory((prev) =>
                  prev == category.name ? "" : category.name
                )
              }
              className={`cursor-pointer   ${
                selectedCategory === category.name
                  ? "text-black font-bold"
                  : "text-gray-500"
              }`}
            >
              {category.name}
            </span>
            <svg
              className="w-[19px] h-[19px] text-gray-400 dark:text-white cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </li>
        ))}
      </ul>
      <hr className="mx-4" />
      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black    gap-3"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded={isOpen}
            onClick={toggleAccordion}
            aria-controls="accordion-collapse-body-1"
          >
            <h1 className="text-lg font-bold  text-gray-900">Price</h1>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className={`${isOpen ? "" : "hidden"} h-[100px]`}
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div className="p-5   border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <Range
              min={0}
              max={500}
              initialOne={50}
              initialTwo={200}
              setPriceRange={setPriceRange}
            />
          </div>
        </div>
        <hr className="mx-4" />
        <h2 id="accordion-collapse-heading-2">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black    gap-3"
            data-accordion-target="#accordion-collapse-body-2"
            aria-expanded={isOpen1}
            onClick={toggleAccordion1}
            aria-controls="accordion-collapse-body-2"
          >
            <h1 className="text-lg font-bold  text-gray-900">Colours</h1>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-2"
          className={`${isOpen1 ? "" : "hidden"}`}
          aria-labelledby="accordion-collapse-heading-2"
        >
          <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap">
              {Colors.map((color) => (
                <ColorSelector
                  key={color.name}
                  color={color.name}
                  colorCode={color.code}
                  isSelected={selectedColor === color.name}
                  setSelectedColor={setSelectedColor}
                />
              ))}
            </div>
          </div>
        </div>
        <hr className="mx-4" />
        <h2 id="accordion-collapse-heading-3">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black    gap-3"
            data-accordion-target="#accordion-collapse-body-3"
            aria-expanded={isOpen2}
            onClick={toggleAccordion2}
            aria-controls="accordion-collapse-body-3"
          >
            <h1 className="text-lg font-bold  text-gray-900">Size</h1>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-3"
          className={`${isOpen2 ? "" : "hidden"}`}
          aria-labelledby="accordion-collapse-heading-3"
        >
          <div className="py-5 border border-t-0 border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap justify-between my-3">
              {sizes.map((size, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={` ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : " bg-secondary "
                  }
                        rounded-full   cursor-pointer text-gray-500 h-11 w-32 m-1 text-center place-content-center px-5
                        `}
                >
                  {size}
                </span>
              ))}
              {/* <span className="rounded-full bg-secondary hover:bg-black hover:text-white text-gray-400 h-11 w-auto m-1 place-content-center px-5"> small </span>
            <span className="rounded-full bg-secondary  hover:bg-black hover:text-white text-gray-400 h-11 w-auto m-1 place-content-center px-5"> medium </span>
            <span className="rounded-full bg-secondary  hover:bg-black hover:text-white text-gray-400 h-11 w-auto m-1 place-content-center px-5"> Large </span>
            <span className="rounded-full bg-secondary  hover:bg-black hover:text-white text-gray-400 h-11 w-auto m-1 place-content-center px-5"> X-Large</span> */}
            </div>
          </div>
        </div>
        <hr className="mx-4" />
        <h2 id="accordion-collapse-heading-4">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black    gap-3"
            data-accordion-target="#accordion-collapse-body-4"
            aria-expanded={isOpen3}
            onClick={toggleAccordion3}
            aria-controls="accordion-collapse-body-4"
          >
            <h1 className="text-lg font-bold  text-gray-900">Dress Style</h1>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-4"
          className={`${isOpen3 ? "" : "hidden"}`}
          aria-labelledby="accordion-collapse-heading-4"
        >
          <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
            <ul
              role="list"
              className="space-y-4 px-3 mt-2  border-gray-200 pb-6 text-sm font-medium  text-gray-500"
            >
              {dressStyle.map((style) => (
                <li key={style.name} className="flex justify-between">
                  <span
                    onClick={() =>
                      setSelectedStyle((prev) =>
                        prev == style.name ? "" : style.name
                      )
                    }
                    className={`cursor-pointer   ${
                      selectedStyle === style.name
                        ? "text-black font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    {style.name}
                  </span>{" "}
                  <svg
                    className="w-[19px] h-[19px] text-gray-400 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          onClick={()=>setApplyFilter( prev => !prev)}
          className="text-white w-11/12 my-3 mx-3 bg-black focus:outline-0 focus:ring-0 f font-medium rounded-full text-sm px-5 py-3  "
        >
          Apply Filter
        </button>
      </div>
    </form>
  );
}
