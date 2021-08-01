import LoginForm from "@/components/auth/LoginForm";
import styles from "@styles/auth/login.module.css";

const login = () => {
  return (
    <div className={styles.Login}>
      <LoginForm />
    </div>
  );
};

export default login;
