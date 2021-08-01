import UserDetails from "@/components/account/UserDetails";
import { parseCookies } from "helpers";
import styles from "@styles/account/account.module.css";
const account = ({ parsedToken }) => {
  return (
    <div className={styles.Account}>
      <UserDetails token={parsedToken} />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  // Get the token from cookie
  const { token } = parseCookies(req);

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
