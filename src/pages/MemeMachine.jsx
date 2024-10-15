import { useContext, useRef, useState, useEffect } from "react";
import MemeContext from "../context/MemeContext";
import domtoimage from "dom-to-image";

const MemeMachine = () => {
  const { state } = useContext(MemeContext);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMemes, setFilteredMemes] = useState([]); // For storing searched memes
  const [currentMeme, setCurrentMeme] = useState(null); // Initialize as null to handle loading state
  const [imgName, setImgName] = useState(""); // State for imgName
  const imageContainerRef = useRef(null);

  // Function to fetch a random meme
  const fetchRandomMeme = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      if (data.success) {
        const memes = data.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        setCurrentMeme(randomMeme); // Set random meme as current
        setImgName(randomMeme.name); // Set meme name to imgName state
      }
    } catch (error) {
      console.error("Error fetching random meme:", error);
    }
  };

  // Fetch a random meme when the component mounts (initial load)
  useEffect(() => {
    fetchRandomMeme(); // Fetch a random meme on component mount
  }, []);

  // Function to search memes from the Imgflip API
  const searchMemesFromAPI = async (searchTerm) => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      if (data.success) {
        const memes = data.data.memes.filter((meme) =>
          meme.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMemes(memes);
      }
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  // Handle search input change and trigger API call
  useEffect(() => {
    if (searchTerm) {
      searchMemesFromAPI(searchTerm);
    } else {
      setFilteredMemes([]); // Clear search grid when search term is empty
    }
  }, [searchTerm]);

  // Function to set clicked image as the main meme
  const handleMemeClick = (meme) => {
    setCurrentMeme(meme); // Update the selected meme and trigger re-render
    setImgName(meme.name); // Update the imgName with the clicked meme name
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
        setCurrentMeme(uploadedMeme); // Set the uploaded image as current meme
        setImgName(uploadedMeme.name); // Set the filename as the imgName
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64)
    }
  };

  const compressImage = (src, callback) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxWidth = 500; // Set a maximum width for the image
      const scaleSize = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scaleSize;
  
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Convert the canvas to base64 with a lower quality
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // 0.7 quality
      callback(compressedBase64);
    };
  };

  const saveMemeToLocalStorage = () => {
    if (currentMeme) {
      domtoimage.toPng(imageContainerRef.current).then((base64Image) => {
        compressImage(base64Image, (compressedImage) => {
          const savedMeme = {
            name: imgName, // Use the editable imgName value
            topText: topText,
            bottomText: bottomText,
            image: compressedImage, // Save the compressed image
            savedAt: new Date().toISOString(),
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
      });
    }
  };

  const resetInputs = () => {
    setTopText("");
    setBottomText("");
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
              value={imgName} // Controlled input value
              onChange={(e) => setImgName(e.target.value)} // Allow editing
            />
            <div
              className="imageContainer max-w-[750px] relative"
              ref={imageContainerRef}
            >
              {currentMeme ? (
                <>
                  <img
                    src={currentMeme.url}
                    alt={currentMeme.name}
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
                    {topText}
                  </div>
                  <div
                    className="bottomText absolute bottom-2 left-0 w-full text-center text-white uppercase font-bold text-4xl"
                    style={{
                      textShadow:
                        "2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000",
                    }}
                  >
                    {bottomText}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Trigger search on change
            />
            <div className="inputContainer">
              <input
                className="topInput w-full input input-bordered input-primary mt-6"
                type="text"
                placeholder="TOP_TEXT"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
              />
              <input
                className="btmInput w-full input input-bordered input-secondary my-6"
                type="text"
                placeholder="BOTTOM_TEXT"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
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
              {filteredMemes.map((meme) => (
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
