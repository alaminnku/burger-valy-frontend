import UserDetails from "@/components/account/UserDetails";
import { parseCookies } from "helpers";
import axios from "axios";
import { API_URL } from "config";

const account = ({ parsedToken, orders }) => {
  return (
    <div>
      <UserDetails token={parsedToken} orders={orders} />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  // Get the token from cookie
  const { token } = parseCookies(req);

  // Parse the token
  const parsedToken = JSON.parse(token);

  // Get the orders with the token
  const res = await axios.get(`${API_URL}/orders/me`, {
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  });

  // Orders
  const orders = res.data;

  return {
    props: {
      parsedToken,
      orders,
    },
  };
}

export default account;
