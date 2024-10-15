import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  // State for managing the "fuckoMode"
  const [fuckoMode, setFuckoMode] = useState(false);
  const [isClockwise, setIsClockwise] = useState(true); // Track direction
  const [rotation, setRotation] = useState(0); // Track current rotation in degrees
  const logoRef = useRef(null); // Ref for the logo image

  // Use effect to apply/remove the background image based on "fuckoMode"
  useEffect(() => {
    if (fuckoMode) {
      document.body.style.backgroundImage = `url('src/assets/unicorn.gif')`;
      document.body.style.backgroundSize = "200px 200px";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundPosition = "top left";
    } else {
      document.body.style.backgroundImage = "none"; // Remove background when toggle is off
    }
  }, [fuckoMode]);

  // Function to handle direction toggle
  const handleImageClick = () => {
    const currentRotation = getComputedStyle(logoRef.current).getPropertyValue("transform");
    const matrixValues = currentRotation.match(/matrix.*\((.+)\)/);
    
    if (matrixValues) {
      const values = matrixValues[1].split(', ');
      const a = values[0]; // cos(θ)
      const b = values[1]; // sin(θ)
      const degrees = Math.round(Math.atan2(b, a) * (180 / Math.PI)); // Get the current angle in degrees
      setRotation(degrees); // Store the current rotation
    }

    setIsClockwise(!isClockwise); // Toggle direction
  };

  // Use effect to detect clicks anywhere on the page
  useEffect(() => {
    const handleClickAnywhere = () => {
      handleImageClick();
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleClickAnywhere);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickAnywhere);
    };
  }, []); // Empty dependency array so it only attaches the event listener once

  return (
    <>
      <div className="nav p-6 flex items-center justify-between">
        {/* Left Section: Logo and Heading */}
        <div className="flex items-center gap-4">
          <img
            ref={logoRef} // Ref to track rotation
            className={`logo h-20 ${isClockwise ? "spin-clockwise" : "spin-counterclockwise"}`}
            src="src/assets/stupid-face.svg"
            alt=""
            style={{ transform: `rotate(${rotation}deg)` }} // Apply rotation
          />
          <h2 className="text-primary text-4xl">1337 MEMEZ</h2>
        </div>

        {/* Center Section: Navigation Links */}
        <ul className="flex gap-8">
          <li>
            <Link to="/" className="text-info">MEME MACHINE</Link>
          </li>
          <li>
            <Link to="/yomamasfavmemes" className="text-warning">YO MAMAS FAV MEMEZ</Link>
          </li>
        </ul>

        {/* Right Section: Toggle Button */}
        <div className="flex items-center gap-2">
          <p className="pr-4">🚫 DO NOT TOUCH 🚫 -&gt;</p>
          <input
            type="checkbox"
            className="fuckoMode toggle border-blue-500 bg-blue-500 [--tglbg:yellow] hover:bg-blue-700"
            onChange={() => setFuckoMode(!fuckoMode)} // Handle background change
            checked={fuckoMode} // Reflect state in checkbox
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
