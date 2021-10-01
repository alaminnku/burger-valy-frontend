import ForgotPassword from "@/components/passwordReset/ForgotPassword";
import styles from "@styles/passwordReset/forgotPassword.module.css";
import HeadSection from "@/components/layout/HeadSection";

const ForgotPasswordPage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valy | Forgot Password'
        content='Forgot your password? Get a password reset link to your email.'
        pageURL='https://www.burgervaly.com/forgot-password'
      />
      <div className={styles.ForgotPasswordPage}>
        <ForgotPassword />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
