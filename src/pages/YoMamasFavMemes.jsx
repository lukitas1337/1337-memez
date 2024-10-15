import { useContext, useEffect } from "react";
import MemeContext from "../context/MemeContext";

const YoMamasFavMemes = () => {
  const { state, deleteMeme, downloadMeme } = useContext(MemeContext);
  const savedMemes = state.savedMemes;

  // Function to calculate the time remaining for each meme
  const calculateTimeRemaining = (savedAt) => {
    const now = new Date().getTime();
    const expirationTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const timeRemaining = expirationTime - (now - new Date(savedAt).getTime());

    if (timeRemaining <= 0) {
      return "00 DAYS 00 HOURS 00 MINUTES 00 SECONDS";
    }

    const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

    return `${days} DAYS ${hours} HOURS ${minutes} MINUTES ${seconds} SECONDS`;
  };

  // Update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Since this uses context, no need for `setSavedMemes` anymore.
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <>
      <section className="text-center px-24">
        <h1 className="text-7xl text-warning p-8">
          IT&apos;S YO MAMAS FAV MEMES OF ALL TIMES!
        </h1>
        <div className="gallery grid grid-cols-4 gap-4">
          {savedMemes.map((meme, index) => (
            <div
              key={index}
              className="memeContainer border-2 text-center flex flex-col justify-between"
            >
              <h3 className="memeName text-sm p-4">{meme.name}</h3>
              <img
                src={meme.image}
                alt={meme.name}
                className="w-full object-contain h-[250px]" // Set a fixed height and maintain aspect ratio
              />
              <div className="expMessage pt-4">
                <p className="memeExp">THIS MEME IS DOOMED IN:</p>
                <p className="memeExpTimer">
                  {calculateTimeRemaining(meme.savedAt)}
                </p>
              </div>
              <div className="memeButtons flex justify-between p-8">
                <button
                  className="dwnMeme btn btn-success"
                  onClick={() => downloadMeme(meme)}
                >
                  SAVE MEME
                </button>
                <button
                  className="delMeme btn btn-error"
                  onClick={() => deleteMeme(index)}
                >
                  GO TO HELL
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default YoMamasFavMemes;
