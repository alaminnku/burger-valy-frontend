import { API_URL } from "config";
import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    const details = { identifier, password };

    // Try to login and send error if fails
    try {
      // Post request to strapi backend
      const loginRes = await axios.post(`${API_URL}/auth/local`, details);

      // Response data
      const data = loginRes.data;

      // Set Cookie with jwt token
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", JSON.stringify(data.jwt), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );

      // Return the user and token
      res.status(200).json({ token: data.jwt, user: data.user });
    } catch (err) {
      // If login fails
      const message = err.response.data.message[0].messages[0].message;
      console.log(message);
      res.status(err.response.data.statusCode).json({ message });
    }
  } else {
    // If the request isn't a post request
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
