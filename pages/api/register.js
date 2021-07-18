import axios from "axios";
import { API_URL } from "config";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    // Get the data form body and create an object
    const { name, email, password } = req.body;
    const details = { name, email, username: email, password };

    // Try complete the registration
    try {
      // Post the request
      const registrationRes = await axios.post(
        `${API_URL}/auth/local/register`,
        details
      );

      const data = registrationRes.data;

      // Set cookie
      res.setHeader(
        "SET-Cookie",
        cookie.serialize("token", JSON.stringify(data.jwt), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
        })
      );

      // Return the user
      res.status(200).json({ user: data.user });
    } catch (err) {
      // If registration fails
      const message = err.response.data.message[0].messages[0].message;
      res.status(err.response.data.statusCode).json({ message });
    }
  } else {
    // If the method isn't post
    req.setHeader("Allow", ["POST"]);
    req.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
