import ResetPassword from "@/components/passwordReset/ResetPassword";
import styles from "@styles/passwordReset/resetPassword.module.css";

const ResetPasswordPage = () => {
  return (
    <div className={styles.ResetPasswordPage}>
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
