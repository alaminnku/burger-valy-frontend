import ForgotPassword from "@/components/passwordReset/ForgotPassword";
import styles from "@styles/passwordReset/forgotPassword.module.css";

const ForgotPasswordPage = () => {
  return (
    <div className={styles.ForgotPasswordPage}>
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
