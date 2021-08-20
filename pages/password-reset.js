import Button from "@/components/layout/Button";
import { setAlert } from "@store/actions/alertActions";
import axios from "axios";
import { API_URL } from "config";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@/components/layout/Alert";

const PasswordReset = () => {
  const dispatch = useDispatch();

  // States
  const [email, setEmail] = useState("");
  const alerts = useSelector((state) => state.alerts);

  // Handle change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Submit the email
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/auth/forgot-password`, {
        email: email,
      });

      dispatch(setAlert("Email sent successfully!", "Success"));
    } catch (err) {
      const message = err.response.data.message[0].messages[0].message;

      dispatch(setAlert(message, "Danger"));
    }
  };

  return (
    <form>
      <input type="email" value={email} onChange={handleChange} />
      <Button text="Submit" clicked={handleSubmit} />
      <Alert alerts={alerts} />
    </form>
  );
};

export default PasswordReset;
