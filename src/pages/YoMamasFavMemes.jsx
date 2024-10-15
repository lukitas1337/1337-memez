import { useEffect, useState } from "react";

const YoMamasFavMemes = () => {
  const [savedMemes, setSavedMemes] = useState([]);

  // Function to load memes from local storage
  const loadMemes = () => {
    const memes = JSON.parse(localStorage.getItem("savedMemes")) || [];
    setSavedMemes(memes);
  };

  useEffect(() => {
    loadMemes();

    const handleStorageChange = () => {
      loadMemes(); // Reload memes when localStorage changes
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setSavedMemes((prevMemes) => {
        return prevMemes.map((meme) => {
          return {
            ...meme,
            timeRemaining: calculateTimeRemaining(meme.savedAt),
          };
        });
      });
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const deleteMeme = (index) => {
    const updatedMemes = [...savedMemes];
    updatedMemes.splice(index, 1); // Remove the meme at the given index
    setSavedMemes(updatedMemes);
    localStorage.setItem("savedMemes", JSON.stringify(updatedMemes)); // Update local storage
  };

  const downloadMeme = (meme) => {
    const link = document.createElement("a");
    link.href = meme.image; // Use the base64 image URL
    link.download = `${meme.name}.png`; // Save with the meme name
    link.click();
  };

  return (
    <>
      <section className="text-center px-4 lg:px-24 py-8">
        <h1 className="text-4xl lg:text-7xl text-warning py-4 lg:py-8">
          IT&apos;S YO MAMAS FAV MEMEZ OF ALL TIMES!
        </h1>
        <div className="gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {savedMemes.map((meme, index) => (
            <div
              key={index}
              className="memeContainer border-2 text-center flex flex-col justify-between p-4"
            >
              <h3 className="memeName text-xs lg:text-sm py-2">{meme.name}</h3>
              <img
                src={meme.image}
                alt={meme.name}
                className="w-full object-contain h-[150px] lg:h-[250px]"
              />
              <div className="expMessage pt-4">
                <p className="memeExp text-xs lg:text-base">💀🔥💀THIS MEME IS DOOMED IN:💀🔥💀</p>
                <p className="memeExpTimer text-xs lg:text-base">
                  {meme.timeRemaining || calculateTimeRemaining(meme.savedAt)}
                </p>
              </div>
              <div className="memeButtons flex justify-between p-4 lg:p-8">
                <button
                  className="dwnMeme btn btn-success text-xs lg:text-base"
                  onClick={() => downloadMeme(meme)}
                >
                  💾 SAVE MEME
                </button>
                <button
                  className="delMeme btn btn-error text-xs lg:text-base"
                  onClick={() => deleteMeme(index)}
                >
                  🔥 GO TO HELL
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
