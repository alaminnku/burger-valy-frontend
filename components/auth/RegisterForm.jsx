import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import Button from "../layout/Button";
import styles from "@styles/auth/registerForm.module.css";
import { setAlert } from "@store/actions/alertActions";
import Loader from "../layout/Loader";
import axios from "axios";
import { API_URL } from "config";

const RegisterForm = () => {
  // Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  // States
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { name, email, password, confirmPassword } = values;

  // Handle input change
  const handleChange = (e) => {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password.length > 6 &&
      confirmPassword.length > 6
    ) {
      setDisabled(false);
    }

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();

    // Check password match
    if (password !== confirmPassword) {
      dispatch(setAlert("Passwords don't match!", "Danger"));
      return;
    }

    try {
      // Start the laoder
      setLoading(true);

      // Post the request
      await axios.post(`${API_URL}/auth/local/register`, {
        name,
        email,
        username: email,
        password,
      });

      // Stop the laoder and clear the fields
      setLoading(false);
      setValues({
        ...values,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Show the message
      dispatch(setAlert("Confirmation email sent to your email!", "Success"));

      // Push to homepage
      router.push("/");
    } catch (err) {
      const message = err.response.data.message[0].messages[0].message;

      // Stop the loader and show the message
      setLoading(false);
      dispatch(setAlert(message, "Danger"));
    }
  };

  return (
    <div className={styles.RegisterForm}>
      <h3>
        <FaUserAlt className={styles.Icon} />
        User registration
      </h3>
      <form>
        <div className={styles.Item}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email address"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <Button
          disabled={disabled}
          text={loading ? <Loader /> : "Register"}
          clicked={handleRegister}
        />
      </form>

      <small>
        Already have an account? Please <Link href="/login">login</Link>
      </small>
    </div>
  );
};

export default RegisterForm;
