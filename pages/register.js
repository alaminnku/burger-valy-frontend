import RegisterForm from "@/components/auth/RegisterForm";
import Alert from "@/components/layout/Alert";
import styles from "@styles/auth/register.module.css";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const alerts = useSelector((state) => state.alerts);

  return (
    <div className={styles.Register}>
      <RegisterForm />
      <Alert alerts={alerts} />
    </div>
  );
};

export default RegisterPage;
