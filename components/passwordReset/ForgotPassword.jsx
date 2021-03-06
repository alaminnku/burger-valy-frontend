import Alert from "../layout/Alert";
import Button from "@/components/layout/Button";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "config";
import { setAlert } from "@store/actions/alertActions";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../layout/Loader";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "@styles/passwordReset/forgotPassword.module.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // States
  const [email, setEmail] = useState("");
  const alerts = useSelector((state) => state.alerts);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Handle change
  const handleChange = (e) => {
    setEmail(e.target.value);

    if (email !== "") {
      setDisabled(false);
    }
  };

  // Submit the email
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/forgot-password`, {
        email: email,
      });

      dispatch(setAlert("Email sent successfully!", "Success"));

      setLoading(false);
      setEmail("");

      router.push("/");
    } catch (err) {
      const message = err.response.data.message[0].messages[0].message;

      dispatch(setAlert(message, "Danger"));
      setLoading(false);
    }
  };

  return (
    <form className={styles.ForgotPassword}>
      <h3>
        <RiLockPasswordFill className={styles.Icon} />
        Reset password
      </h3>
      <div className={styles.Item}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email address"
          onChange={handleChange}
          id="email"
        />
      </div>
      <Button
        text={loading ? <Loader /> : "Send email"}
        clicked={handleSubmit}
        disabled={disabled}
      />
      <small>
        Sign in{" "}
        <Link href="/login">
          <a>here</a>
        </Link>
      </small>
      <Alert alerts={alerts} />
    </form>
  );
};

export default ForgotPassword;
