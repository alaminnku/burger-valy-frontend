import RegisterForm from "@/components/auth/RegisterForm";
import Alert from "@/components/layout/Alert";
import styles from "@styles/auth/register.module.css";
import { useSelector } from "react-redux";
import HeadSection from "@/components/layout/HeadSection";

const RegisterPage = () => {
  const alerts = useSelector((state) => state.alerts);

  return (
    <>
      <HeadSection
        title='Burger Valley | Create Account'
        content='Create your burger valley account and start ordering delicious foods.'
        pageURL='https://www.burgervalley.com/register'
      />
      <main className={styles.Register}>
        <RegisterForm />
        <Alert alerts={alerts} />
      </main>
    </>
  );
};

export default RegisterPage;
