import { useContext, useRef } from "react";
import MemeContext from "../context/MemeContext";
import domtoimage from "dom-to-image";

const MemeMachine = () => {
  const { state, fetchRandomMeme } = useContext(MemeContext);

  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const imageContainerRef = useRef(null);

  const saveMemeToLocalStorage = () => {
    if (state.currentMeme) {
      // Use dom-to-image to capture the meme
      domtoimage.toPng(imageContainerRef.current).then((base64Image) => {
        const savedMeme = {
          name: state.currentMeme.name,
          topText: topTextRef.current.value,
          bottomText: bottomTextRef.current.value,
          image: base64Image,
          savedAt: new Date().toISOString(),
        };

        // Save the meme to local storage
        let savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
        savedMemes.push(savedMeme);
        localStorage.setItem("savedMemes", JSON.stringify(savedMemes));

        alert("Meme saved successfully!");
      });
    }
  };

  return (
    <>
      <section className="memeMachine text-center">
        <div className="controlRoom rounded-md flex justify-center align-middle">
          <div className="imageSide">
            <input
              className="imgName w-full input input-bordered input-base-100 my-4"
              type="text"
              placeholder="Meme name"
              value={state.currentMeme ? state.currentMeme.name : ""}
              readOnly
            />
            <div
              className="imageContainer max-w-[750px] relative"
              ref={imageContainerRef}
            >
              {state.currentMeme ? (
                <>
                  <img
                    src={state.currentMeme.url}
                    alt={state.currentMeme.name}
                    className="rounded"
                  />
                  {/* Display the top and bottom text over the image */}
                  <div
                    className="topText absolute top-2 left-0 w-full text-center text-white text-xl font-bold"
                    ref={topTextRef}
                  >
                    {topTextRef.current ? topTextRef.current.value : ""}
                  </div>
                  <div
                    className="bottomText absolute bottom-2 left-0 w-full text-center text-white text-xl font-bold"
                    ref={bottomTextRef}
                  >
                    {bottomTextRef.current ? bottomTextRef.current.value : ""}
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div className="controlSide p-16">
            <div className="upperButtonContainer flex justify-around">
              <button className="uplBtn btn btn-accent">UPLOAD MA MEMEZ</button>
              <button
                className="rndmBtn btn btn-warning"
                onClick={fetchRandomMeme}
              >
                GIMME RANDOM
              </button>
            </div>
            <input
              className="searchInput w-full input input-bordered input-base-100 mt-6"
              type="text"
              placeholder="SEARCH_MEMEZ"
            />
            <div className="inputContainer">
              <input
                className="topInput w-full input input-bordered input-primary mt-6"
                type="text"
                placeholder="TOP_TEXT"
                ref={topTextRef}
              />
              <input
                className="btmInput w-full input input-bordered input-secondary my-6"
                type="text"
                placeholder="BOTTOM_TEXT"
                ref={bottomTextRef}
              />
            </div>
            <div className="lowerButtonContainer flex justify-around">
              <button
                className="genBtn btn btn-success"
                onClick={saveMemeToLocalStorage}
              >
                I MAKE THIS
              </button>
              <button className="resBtn btn btn-error">GET OUTTA HERE</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MemeMachine;
