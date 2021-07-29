import Cards from "@/components/side/Cards";
import Summary from "@/components/side/Summary";
import { parseCookies } from "../../helpers/index";

const side = ({ parsedToken }) => {
  return (
    <div>
      <Summary />
      <Cards token={parsedToken} />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  // Get the token from cookie
  const { token } = parseCookies(req);

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

export default side;
