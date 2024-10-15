import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="nav p-6">
        <ul className="flex justify-center gap-8">
          <li>
            <Link to="/" className="text-info">MEME MACHINE</Link>
          </li>
          <li>
            <Link to="/yomamasfavmemes" className="text-warning">YO MAMAS FAV MEMES</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
