import { createContext, useReducer, useEffect } from "react";

const MemeContext = createContext();

const memeReducer = (state, action) => {
  switch (action.type) {
    case "SET_RANDOM_MEME":
      return { ...state, currentMeme: action.payload };
    default:
      return state;
  }
};

export const MemeProvider = ({ children }) => {
  const initialState = {
    currentMeme: null, // Store the current random meme here
  };

  const [state, dispatch] = useReducer(memeReducer, initialState);

  const fetchRandomMeme = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    if (data.success) {
      const memes = data.data.memes;
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      dispatch({ type: "SET_RANDOM_MEME", payload: randomMeme });
    }
  };

  // Fetch a random meme on initial load
  useEffect(() => {
    fetchRandomMeme();
  }, []);

  return (
    <MemeContext.Provider value={{ state, dispatch, fetchRandomMeme }}>
      {children}
    </MemeContext.Provider>
  );
};

export default MemeContext;
