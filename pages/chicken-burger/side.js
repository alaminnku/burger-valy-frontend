import Cards from "@/components/side/Cards";
import Summary from "@/components/side/Summary";
import { parseCookies } from "../../helpers/index";

const side = ({ finalToken }) => {
  return (
    <div>
      <Summary />
      <Cards token={finalToken} />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  // Get the token from cookie
  const { token } = parseCookies(req);

  let finalToken;

  // If there is a token, parse it else set final token to null
  {
    token ? (finalToken = JSON.parse(token)) : (finalToken = null);
  }

  return {
    props: {
      finalToken,
    },
  };
}

export default side;
