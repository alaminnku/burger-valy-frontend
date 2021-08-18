import Button from "@/components/layout/Button";
import axios from "axios";
import { useState } from "react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  // Handle change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Submit the email
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:1337/auth/forgot-password", {
        email: email, // user's email
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form>
      <input type="email" value={email} onChange={handleChange} />
      <Button text="Submit" clicked={handleSubmit} />
    </form>
  );
};

export default PasswordReset;
