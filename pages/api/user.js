import axios from "axios";
import { API_URL } from "config";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    // If there is no cookie in the header
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    // Return if there is no token in the cookie
    if (!cookie.parse(req.headers.cookie).token) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    // If there is a token in cookie
    const { token } = cookie.parse(req.headers.cookie);

    // Parse the token to string
    const parsedToken = JSON.parse(token);

    // Get user data
    try {
      // Post the token to get the data
      const userRes = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });

      // User data
      const user = userRes.data;

      // Return the user
      res.status(200).json({ user });
    } catch (err) {
      // If user fetching fails
      const message = err.response.data.message[0].messages[0].message;
      res.status(err.response.data.statusCode).json({ message });
    }
  } else {
    // If the request isn't a GET
    req.setHeader("Allow", ["GET"]);
    req.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
