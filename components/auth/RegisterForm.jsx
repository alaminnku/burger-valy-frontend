import Link from "next/link";
import { useState } from "react";
import { register } from "@store/actions/authActions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import Button from "../layout/Button";
import styles from "@styles/auth/registerForm.module.css";
import { setAlert } from "@store/actions/alertActions";
import Loader from "../layout/Loader";

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
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loader);
  const [disabled, setDisabled] = useState(true);

  const { name, email, password, confirmPassword } = values;

  // Handle register
  const handleRegister = (e) => {
    e.preventDefault();

    // Check password match
    if (password !== confirmPassword) {
      dispatch(setAlert("Passwords don't match", "Danger"));
      return;
    }

    // Dispatch action
    dispatch(register({ name, email, password }));
  };

  // If there is a user then redirect to account
  {
    user && router.push("/account");
  }

  // Handle input change
  const handleChange = (e) => {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setDisabled(false);
    }

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
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
