import LoginForm from "@/components/auth/LoginForm";
import styles from "@styles/auth/login.module.css";
import Alert from "@/components/layout/Alert";
import { useSelector } from "react-redux";

const login = () => {
  const alerts = useSelector((state) => state.alerts);

  return (
    <div className={styles.Login}>
      <LoginForm />
      <Alert alerts={alerts} />
    </div>
  );
};

export default login;
