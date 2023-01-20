import { useState } from "react";
import Nav_dynamic from "./Nav_dynamic";

const Nav_row = () => {
  const [nOpen, setNOpen] = useState(false);
  const borderStyle = {
    padding: "1rem",
    borderBottomWidth: "2px",
    height: "40px",
    borderColor: "black",
    marginTop: "8px",
    marginBottom: "8px",
  };

  const openClickHandler = () => {
    setNOpen(!nOpen);
    console.log(nOpen);
  };

  return (
    <div className="flex bg-blue-900 relative">
      <div
        className="flex w-12 h-8 m-3 mr-0 bg-inherit content-center justify-center cursor-pointer"
        onClick={openClickHandler}
      >
        <img src="./image/burger.png" width="40px" height="50px" />
      </div>
      <div className="flex m-auto">
        <input
          className="bg-white outline-none rounded-full p-12"
          style={borderStyle}
        />
        <label className="mt-3 bg-white h-8 rounded-full">
          <img
            src="./image/images.png"
            alt="searchImage"
            width="50px"
            height="30px"
            className="rounded-full"
          ></img>
        </label>
      </div>
      <Nav_dynamic nOpen={nOpen} />
    </div>
  );
};

export default Nav_row;
