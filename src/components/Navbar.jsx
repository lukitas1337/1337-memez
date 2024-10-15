import { useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);
  const logoRef = useRef(null); // Ref for the logo image

  // Use effect to apply/remove the background image based on "fuckoMode"
  useEffect(() => {
    if (state.fuckoMode) {
      document.body.style.backgroundImage = `url('src/unicorn.gif')`;
      document.body.style.backgroundSize = "200px 200px";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundPosition = "top left";
    } else {
      document.body.style.backgroundImage = "none"; // Remove background when toggle is off
    }
  }, [state.fuckoMode]);

  // Function to toggle the spinning direction
  const handleImageClick = () => {
    const currentRotation = getComputedStyle(logoRef.current).getPropertyValue("transform");
    const matrixValues = currentRotation.match(/matrix.*\((.+)\)/);

    if (matrixValues) {
      const values = matrixValues[1].split(', ');
      const a = values[0]; // cos(θ)
      const b = values[1]; // sin(θ)
      const degrees = Math.round(Math.atan2(b, a) * (180 / Math.PI)); // Get the current angle in degrees
      dispatch({ type: "TOGGLE_SPIN_DIRECTION", payload: degrees }); // Dispatch with the current rotation
    }
  };

  // Use effect to detect clicks anywhere on the page
  useEffect(() => {
    const handleClickAnywhere = (e) => {
      // Check if the click target is not the logo to prevent firing on the logo click itself
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
      <div className="nav p-6 flex items-center justify-between">
        {/* Left Section: Logo and Heading */}
        <div className="flex items-center gap-4">
          <img
            ref={logoRef} // Ref to track rotation
            className={`logo h-20 ${state.isClockwise ? "spin-clockwise" : "spin-counterclockwise"}`}
            src="src/stupid-face.svg"
            alt=""
            style={{ transform: `rotate(${state.rotation}deg)` }} // Apply rotation
          />
          <h2 className="text-primary text-4xl">1337 MEMEZ</h2>
        </div>

        {/* Center Section: Navigation Links */}
        <ul className="flex gap-8">
          <li>
            <Link to="/" className="btn btn-outline btn-info">MEME MACHINE</Link>
          </li>
          <li>
            <Link to="/yomamasfavmemes" className="btn btn-outline btn-warning">YO MAMAS FAV MEMEZ</Link>
          </li>
        </ul>

        {/* Right Section: Toggle Button */}
        <div className="flex items-center gap-2">
          <p className="pr-4">🚫 DO NOT TOUCH 🚫 -&gt;</p>
          <input
            type="checkbox"
            className="fuckoMode toggle border-blue-500 bg-blue-500 [--tglbg:yellow] hover:bg-blue-700"
            onChange={() => dispatch({ type: "TOGGLE_FUCKO_MODE" })} // Handle background change
            checked={state.fuckoMode} // Reflect state in checkbox
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
