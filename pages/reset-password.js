import ResetPassword from "@/components/passwordReset/ResetPassword";
import styles from "@styles/passwordReset/resetPassword.module.css";
import HeadSection from "@/components/layout/HeadSection";

const ResetPasswordPage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valley | Reset Password'
        content='Reset your burger valley password.'
        pageURL='https://www.burgervalley.com/reset-password'
      />

      <main className={styles.ResetPasswordPage}>
        <ResetPassword />
      </main>
    </>
  );
};

export default ResetPasswordPage;
