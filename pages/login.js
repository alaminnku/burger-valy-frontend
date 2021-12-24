import LoginForm from "@/components/auth/LoginForm";
import styles from "@styles/auth/login.module.css";
import Alert from "@/components/layout/Alert";
import { useSelector } from "react-redux";
import HeadSection from "@/components/layout/HeadSection";

const LoginPage = () => {
  const alerts = useSelector((state) => state.alerts);

  return (
    <>
      <HeadSection
        title='Burger Valy | Sing In'
        content='Sign in to your burger valy account to see the active and all previous orders.'
        pageURL='https://www.burgervaly.com/login'
      />
      <main className={styles.Login}>
        <LoginForm />
        <Alert alerts={alerts} />
      </main>
    </>
  );
};

export default LoginPage;
