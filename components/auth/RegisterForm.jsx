import Link from "next/link";
import { useState } from "react";
import styles from "@styles/auth/registerForm.module.css";

const RegisterForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = values;

  const handleRegister = (e) => {
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
    <div className={styles.RegisterForm}>
      <h3>User register</h3>
      <form>
        <div className={styles.Item}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='confirmPassword'>Confirm password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button onClick={handleRegister}>REGISTER</button>
      </form>

      <small>
        Already have an account? Please <Link href='/login'>login</Link>
      </small>
    </div>
  );
};

export default RegisterForm;
