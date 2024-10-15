import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  // State for managing the "fuckoMode"
  const [fuckoMode, setFuckoMode] = useState(false);

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
  }, [fuckoMode]); // Trigger this effect whenever "fuckoMode" changes

  // Toggle handler
  const handleToggle = () => {
    setFuckoMode(!fuckoMode);
  };

  return (
    <>
      <div className="nav p-6">
        <ul className="flex justify-center gap-8">
          <li>
            <Link to="/" className="text-info">MEME MACHINE</Link>
          </li>
          <li>
            <Link to="/yomamasfavmemes" className="text-warning">YO MAMAS FAV MEMEZ</Link>
          </li>
        </ul>
        <div className="flex justify-end">
          <p className="pr-4">DO NOT TOUCH -></p>
          <input
            type="checkbox"
            className="fuckoMode toggle border-blue-500 bg-blue-500 [--tglbg:yellow] hover:bg-blue-700"
            onChange={handleToggle} // Call the toggle handler
            checked={fuckoMode} // Reflect the state in the checkbox
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
