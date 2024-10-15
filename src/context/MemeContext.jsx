/* eslint-disable react/prop-types */
// Updated MemeContext with local storage management
import { createContext, useReducer, useEffect } from "react";

const MemeContext = createContext();

const memeReducer = (state, action) => {
  switch (action.type) {
    case "SET_RANDOM_MEME":
      return { ...state, currentMeme: action.payload, imgName: action.payload.name };
    case "SET_TOP_TEXT":
      return { ...state, topText: action.payload };
    case "SET_BOTTOM_TEXT":
      return { ...state, bottomText: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_FILTERED_MEMES":
      return { ...state, filteredMemes: action.payload };
    case "SET_IMG_NAME":
      return { ...state, imgName: action.payload };
    case "SET_SAVED_MEMES":
      return { ...state, savedMemes: action.payload };
    case "DELETE_MEME":
      return { ...state, savedMemes: state.savedMemes.filter((_, index) => index !== action.payload) };
    default:
      return state;
  }
};

const initialState = {
  currentMeme: null,
  topText: "",
  bottomText: "",
  searchTerm: "",
  filteredMemes: [],
  imgName: "",
  savedMemes: [], // Add saved memes to the state
};

export const MemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memeReducer, initialState);

  useEffect(() => {
    // Load memes from local storage on initial load
    const savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
    dispatch({ type: "SET_SAVED_MEMES", payload: savedMemes });
  }, []);

  const fetchRandomMeme = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    if (data.success) {
      const memes = data.data.memes;
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      dispatch({ type: "SET_RANDOM_MEME", payload: randomMeme });
    }
  };

  // Add the delete and download functionalities to context
  const deleteMeme = (index) => {
    dispatch({ type: "DELETE_MEME", payload: index });
    const updatedMemes = state.savedMemes.filter((_, i) => i !== index);
    localStorage.setItem("savedMemes", JSON.stringify(updatedMemes));
  };

  const downloadMeme = (meme) => {
    const link = document.createElement("a");
    link.href = meme.image;
    link.download = `${meme.name}.png`;
    link.click();
  };

  return (
    <MemeContext.Provider value={{ state, dispatch, fetchRandomMeme, deleteMeme, downloadMeme }}>
      {children}
    </MemeContext.Provider>
  );
};

export default MemeContext;
