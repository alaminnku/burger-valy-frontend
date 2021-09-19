import Account from "@/components/account/Account";
import styles from "@styles/account/accountPage.module.css";
import Alert from "@/components/layout/Alert";
import { useSelector } from "react-redux";

const AccountPage = () => {
  // States
  const alerts = useSelector((state) => state.alerts);

  return (
    <div className={styles.AccountPage}>
      <Account />
      <Alert alerts={alerts} />
    </div>
  );
};

export default AccountPage;
