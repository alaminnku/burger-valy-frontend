import Link from "next/link";
import styles from "@styles/auth/loginForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@store/actions/authActions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

const LoginForm = () => {
  // Dispatch
  const dispatch = useDispatch();

  // isAuthenticated state
  const { user } = useSelector((state) => state.auth);

  // Router
  const router = useRouter();

  // Values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  // Check if isAuthenticated and push to homepage
  {
    user && router.push("/account");
  }

  // Handle the change
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.LoginForm}>
      <h3>User login</h3>
      <form>
        <div className={styles.Item}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            name='email'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button onClick={handleLogin}>LOGIN</button>
      </form>

      <small>
        Don't have an account? Please <Link href='/register'>register</Link>
      </small>
    </div>
  );
};

export default LoginForm;
