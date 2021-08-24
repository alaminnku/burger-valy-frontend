import { useState } from "react";
import Alert from "../layout/Alert";
import Button from "@/components/layout/Button";
import styles from "@styles/passwordReset/resetPassword.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "config";
import { useRouter } from "next/router";
import { setAlert } from "@store/actions/alertActions";
import Loader from "../layout/Loader";

const ResetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // States
  const [values, setValues] = useState({
    password: "",
    confirmedPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const alerts = useSelector((state) => state.alerts);
  const [disabled, setDisabled] = useState(true);

  const { password, confirmedPassword } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });

    if (
      password !== "" &&
      confirmedPassword !== "" &&
      password.length > 6 &&
      confirmedPassword.length > 6
    ) {
      setDisabled(false);
    }

    console.log(password.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Token
    const code = router.query.code;

    try {
      setLoading(true);

      await axios.post(`${API_URL}/auth/reset-password`, {
        code,
        password,
        passwordConfirmation: confirmedPassword,
      });

      // Update the state
      setLoading(false);
      setValues({
        ...values,
        password: "",
        confirmedPassword: "",
      });

      // Show the alert
      dispatch(setAlert("Password reset successful!", "Success"));

      router.push("/login");
    } catch (err) {
      const message = err.response.data.message[0].messages[0].message;

      // Remove the laoder
      setLoading(false);

      // Show the alert
      dispatch(setAlert(message, "Danger"));
    }
  };

  return (
    <form className={styles.ResetPassword}>
      <div className={styles.Item}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={handleChange}
          id="password"
        />
      </div>

      <div className={styles.Item}>
        <label htmlFor="confirmedPassword">Confirm password</label>
        <input
          type="password"
          value={confirmedPassword}
          onChange={handleChange}
          id="confirmedPassword"
        />
      </div>

      <Button
        text={loading ? <Loader /> : "Update Password"}
        clicked={handleSubmit}
        disabled={disabled}
      />

      <small>Passwords must be 8 characters long!</small>

      <Alert alerts={alerts} />
    </form>
  );
};

export default ResetPassword;
