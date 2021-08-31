import UserDetails from "@/components/account/UserDetails";
import styles from "@styles/account/account.module.css";
import Alert from "@/components/layout/Alert";
import { useSelector } from "react-redux";

const AccountPage = () => {
  // States
  const { token } = useSelector((state) => state.auth);
  const alerts = useSelector((state) => state.alerts);

  return (
    <div className={styles.Account}>
      <UserDetails token={token} />
      <Alert alerts={alerts} />
    </div>
  );
};

export default AccountPage;
