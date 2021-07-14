import Link from "next/link";
import styles from "@styles/auth/loginForm.module.css";
import { useState } from "react";

const LoginForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(values);
  };

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
            type='text'
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
