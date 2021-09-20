export const API_URL = "https://burger-valley.herokuapp.com";

export const NEXT_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://burgervalley.vercel.app/api";

// "https://burger-valley.herokuapp.com";
// "https://burgervalley.vercel.app/api";
