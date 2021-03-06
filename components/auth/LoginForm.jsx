import Link from "next/link";
import styles from "@styles/auth/loginForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@store/actions/authActions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";
import Button from "../layout/Button";
import Loader from "../layout/Loader";

const LoginForm = () => {
  // Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  // States
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loader);
  const [disabled, setDisabled] = useState(true);

  // Values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  // Handle the change
  const handleChange = (e) => {
    if (email !== "" && password !== "") {
      setDisabled(false);
    }

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  // Check if isAuthenticated and push to homepage
  {
    token && router.push("/dashboard");
  }

  return (
    <div className={styles.LoginForm}>
      <h3>
        <FaUserAlt className={styles.Icon} />
        User login
      </h3>
      <form>
        <div className={styles.Item}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            placeholder="Enter your email address"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <Button
          disabled={disabled}
          text={loading ? <Loader /> : "Login"}
          clicked={handleLogin}
        />
      </form>

      <small>
        Don't have an account? Register <Link href="/register">here</Link>
      </small>
      <small>
        Forgot password? Reset <Link href="/forgot-password">here</Link>
      </small>
    </div>
  );
};

export default LoginForm;
