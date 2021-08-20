import UserDetails from "@/components/account/UserDetails";
import { parseCookies } from "helpers";
import styles from "@styles/account/account.module.css";
import Alert from "@/components/layout/Alert";
import { useSelector } from "react-redux";

const account = ({ parsedToken }) => {
  const alerts = useSelector((state) => state.alerts);

  return (
    <div className={styles.Account}>
      <UserDetails token={parsedToken} />
      <Alert alerts={alerts} />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  // Get the token from cookie
  const { token } = parseCookies(req);

  console.log(token);

  // Parse the token
  let parsedToken;

  // If there is a token, parse it else set final token to null
  {
    token ? (parsedToken = JSON.parse(token)) : (parsedToken = null);
  }

  return {
    props: {
      parsedToken,
    },
  };
}

export default account;
