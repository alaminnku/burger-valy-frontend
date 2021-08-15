import RegisterForm from "@/components/auth/RegisterForm";
import Alert from "@/components/layout/Alert";
import styles from "@styles/auth/register.module.css";
import { useSelector } from "react-redux";

const register = () => {
  const alerts = useSelector((state) => state.alerts);

  console.log(alerts);

  return (
    <div className={styles.Register}>
      <RegisterForm />
      <Alert alerts={alerts} />
    </div>
  );
};

export default register;
