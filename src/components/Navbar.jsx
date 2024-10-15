import { useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);
  const logoRef = useRef(null);

  useEffect(() => {
    if (state.fuckoMode) {
      document.body.style.backgroundImage = `url('https://i.ibb.co/D4ZGDv6/unicorn.gif')`;
      document.body.style.backgroundSize = "200px 200px";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundPosition = "top left";
      document.body.style.height = "4000px";
    } else {
      document.body.style.backgroundImage = "none";
    }
  }, [state.fuckoMode]);

  const handleImageClick = () => {
    const currentRotation = getComputedStyle(logoRef.current).getPropertyValue("transform");
    const matrixValues = currentRotation.match(/matrix.*\((.+)\)/);

    if (matrixValues) {
      const values = matrixValues[1].split(", ");
      const a = values[0];
      const b = values[1];
      const degrees = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      dispatch({ type: "TOGGLE_SPIN_DIRECTION", payload: degrees });
    }
  };

  useEffect(() => {
    const handleClickAnywhere = (e) => {
      if (e.target !== logoRef.current) {
        handleImageClick();
      }
    };

    document.addEventListener("click", handleClickAnywhere);

    return () => {
      document.removeEventListener("click", handleClickAnywhere);
    };
  }, []);

  return (
    <>
      <div
        className={`nav p-4 lg:p-6 flex flex-col lg:flex-row items-center justify-between ${
          state.fuckoMode ? "bg-transparent" : "bg-base-100"
        } text-white border-b border-white`}
      >
        {/* Left Section: Logo and Heading */}
        <div className="flex items-center gap-2 lg:gap-4 mb-4 lg:mb-0">
          <img
            ref={logoRef}
            className={`logo h-12 lg:h-20 ${state.isClockwise ? "spin-clockwise" : "spin-counterclockwise"}`}
            src="https://i.ibb.co/FVzQ5JX/stupid-face.png"
            alt="logo"
            style={{ transform: `rotate(${state.rotation}deg)` }}
          />
          <h2 className="text-primary text-2xl lg:text-4xl">1337 MEMEZ</h2>
        </div>

        {/* Center Section: Navigation Links */}
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-4 lg:mb-0">
          <li>
            <Link to="/" className="btn btn-outline btn-info w-full lg:w-auto text-sm lg:text-base">
              MEME MACHINE
            </Link>
          </li>
          <li>
            <Link to="/yomamasfavmemes" className="btn btn-outline btn-warning w-full lg:w-auto text-sm lg:text-base">
              YO MAMAS FAV MEMEZ
            </Link>
          </li>
        </ul>

        {/* Right Section: Toggle Button */}
        <div className="flex items-center gap-2">
          <p className="text-sm lg:text-base">🚫 DO NOT TOUCH 🚫 -&gt;</p>
          <input
            type="checkbox"
            className="fuckoMode toggle border-blue-500 bg-blue-500 [--tglbg:yellow] hover:bg-blue-700"
            onChange={() => dispatch({ type: "TOGGLE_FUCKO_MODE" })}
            checked={state.fuckoMode}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
