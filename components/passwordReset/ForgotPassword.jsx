import Alert from "../layout/Alert";
import Button from "@/components/layout/Button";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "config";
import { setAlert } from "@store/actions/alertActions";
import { useState } from "react";
import axios from "axios";
import styles from "@styles/passwordReset/forgotPassword.module.css";
import Link from "next/link";

const ForgotPassword = () => {
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

      setEmail("");
    } catch (err) {
      const message = err.response.data.message[0].messages[0].message;

      dispatch(setAlert(message, "Danger"));
    }
  };

  return (
    <form className={styles.ForgotPassword}>
      <label htmlFor="email">Email</label>
      <input type="email" value={email} onChange={handleChange} id="email" />
      <Button text="Submit" clicked={handleSubmit} />
      <small>
        <Link href="/login">
          <a>Sign in here</a>
        </Link>
      </small>
      <Alert alerts={alerts} />
    </form>
  );
};

export default ForgotPassword;
