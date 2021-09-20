import ForgotPassword from "@/components/passwordReset/ForgotPassword";
import styles from "@styles/passwordReset/forgotPassword.module.css";
import HeadSection from "@/components/layout/HeadSection";

const ForgotPasswordPage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valley | Forgot Password'
        content='Forgot your password? Get a password reset link to your email.'
        pageURL='https://www.burgervalley.com/forgot-password'
      />
      <div className={styles.ForgotPasswordPage}>
        <ForgotPassword />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
