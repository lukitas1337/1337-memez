import { useContext, useRef, useEffect } from "react";
import MemeContext from "../context/MemeContext";
import domtoimage from "dom-to-image";

const MemeMachine = () => {
  const { state, dispatch, fetchRandomMeme } = useContext(MemeContext);
  const imageContainerRef = useRef(null);

  // Fetch a random meme on component mount (initial load)
  useEffect(() => {
    if (!state.currentMeme) { // Only fetch if there's no current meme
      fetchRandomMeme();
    }
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to handle search input change
  const handleSearchChange = (term) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  };

  // Function to set top text
  const handleTopTextChange = (text) => {
    dispatch({ type: "SET_TOP_TEXT", payload: text });
  };

  // Function to set bottom text
  const handleBottomTextChange = (text) => {
    dispatch({ type: "SET_BOTTOM_TEXT", payload: text });
  };

  // Function to set clicked image as the main meme
  const handleMemeClick = (meme) => {
    dispatch({ type: "SET_RANDOM_MEME", payload: meme });
  };

  // Function to handle image upload from the device
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create a custom meme object with the uploaded image
        const uploadedMeme = {
          url: reader.result, // Base64 image data
          name: file.name.replace(/\.[^/.]+$/, ""), // Get filename without extension
        };
        dispatch({ type: "SET_RANDOM_MEME", payload: uploadedMeme });
        dispatch({ type: "SET_IMG_NAME", payload: uploadedMeme.name });
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64)
    }
  };

  // Function to search memes from the Imgflip API
  const searchMemesFromAPI = async (searchTerm) => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      if (data.success) {
        const memes = data.data.memes.filter((meme) =>
          meme.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        dispatch({ type: "SET_FILTERED_MEMES", payload: memes });
      }
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  // Handle search input change and trigger API call
  useEffect(() => {
    if (state.searchTerm) {
      searchMemesFromAPI(state.searchTerm);
    } else {
      dispatch({ type: "SET_FILTERED_MEMES", payload: [] }); // Clear search grid when search term is empty
    }
  }, [state.searchTerm]);

  // Function to save meme to local storage
  const saveMemeToLocalStorage = () => {
    if (state.currentMeme) {
      domtoimage.toPng(imageContainerRef.current).then((base64Image) => {
        const savedMeme = {
          name: state.imgName, // Use the editable imgName value
          topText: state.topText,
          bottomText: state.bottomText,
          image: base64Image, // Save the compressed image
          savedAt: new Date().toISOString(), // Save the time of creation
        };

        let savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
        savedMemes.push(savedMeme);

        try {
          localStorage.setItem("savedMemes", JSON.stringify(savedMemes));
          alert("Meme saved successfully!");
        } catch (e) {
          console.error("Error saving to localStorage: ", e);
          alert("Storage limit exceeded! Try clearing some saved memes.");
        }
      });
    }
  };

  // Function to reset inputs
  const resetInputs = () => {
    dispatch({ type: "SET_TOP_TEXT", payload: "" });
    dispatch({ type: "SET_BOTTOM_TEXT", payload: "" });
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
              value={state.imgName} // Controlled input value from context
              onChange={(e) => dispatch({ type: "SET_IMG_NAME", payload: e.target.value })} // Allow editing
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
                    className="topText absolute top-2 left-0 w-full text-center text-white uppercase font-bold text-4xl"
                    style={{
                      textShadow:
                        "2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000",
                    }}
                  >
                    {state.topText}
                  </div>
                  <div
                    className="bottomText absolute bottom-2 left-0 w-full text-center text-white uppercase font-bold text-4xl"
                    style={{
                      textShadow:
                        "2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000",
                    }}
                  >
                    {state.bottomText}
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div className="controlSide p-16">
            <div className="upperButtonContainer flex justify-around">
              <label className="uplBtn btn btn-accent">
                UPLOAD MA MEMEZ
                <input
                  type="file"
                  accept="image/*"
                  className="hidden" // Hide the actual file input
                  onChange={handleImageUpload} // Handle image upload
                />
              </label>
              <button className="rndmBtn btn btn-warning" onClick={fetchRandomMeme}>
                GIMME RANDOM
              </button>
            </div>
            <input
              className="searchInput w-full input input-bordered input-base-100 mt-6"
              type="text"
              placeholder="SEARCH_MEMEZ"
              value={state.searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)} // Trigger search on change
            />
            <div className="inputContainer">
              <input
                className="topInput w-full input input-bordered input-primary mt-6"
                type="text"
                placeholder="TOP_TEXT"
                value={state.topText}
                onChange={(e) => handleTopTextChange(e.target.value)}
              />
              <input
                className="btmInput w-full input input-bordered input-secondary my-6"
                type="text"
                placeholder="BOTTOM_TEXT"
                value={state.bottomText}
                onChange={(e) => handleBottomTextChange(e.target.value)}
              />
            </div>
            <div className="lowerButtonContainer flex justify-around">
              <button
                className="genBtn btn btn-success"
                onClick={saveMemeToLocalStorage}
              >
                I MAKE THIS
              </button>
              <button className="resBtn btn btn-error" onClick={resetInputs}>
                GET OUTTA HERE
              </button>
            </div>
            {/* Search Grid */}
            <div className="searchGrid grid grid-cols-2 gap-4 p-6">
              {state.filteredMemes.map((meme) => (
                <img
                  key={meme.id}
                  className="w-36 cursor-pointer"
                  src={meme.url}
                  alt={meme.name}
                  onClick={() => handleMemeClick(meme)} // Click to set main meme
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MemeMachine;
