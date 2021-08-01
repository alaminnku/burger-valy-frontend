import RegisterForm from "@/components/auth/RegisterForm";
import styles from "@styles/auth/register.module.css";

const register = () => {
  return (
    <div className={styles.Register}>
      <RegisterForm />
    </div>
  );
};

export default register;
