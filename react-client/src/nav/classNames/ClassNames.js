import classNames from "classnames";

export const button = classNames(
  "rounded-full p-2 m-1.5 bg-inherit text-white cursor-pointer ring-1 ring-yellow-400 hover:bg-white hover:text-black hover:ring"
);

export const wrapperDiv = classNames(
  "min-h-64",
  "w-full",
  "grid",
  "grid-cols-4"
);
export const nameSpan = classNames(
  "place-self-center",
  "border-b-2",
  "border-black"
);
export const itemwrap = classNames("flex flex-col m-12 ml-6 w-10/12 shadow-lg");

export const navDyna = classNames("m-auto cursor-pointer w-20 h-20");

export const navRow = classNames(
  "rounded-full p-2 m-1.5 bg-inherit text-white font-semibold cursor-pointer ring-1 ring-yellow-400 hover:bg-white hover:text-black hover:ring"
);

export const navRowMlAuto = classNames(
  "ml-auto rounded-full p-2 m-1.5 bg-inherit text-white font-semibold cursor-pointer ring-1 ring-yellow-400 hover:bg-white hover:text-black hover:ring"
);

export const navCol = classNames(
  "mt-12 w-full bg-inherit text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded text-center ring-1 ring-yellow-400"
);
