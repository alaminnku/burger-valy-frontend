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
  const parsedToken = JSON.parse(token);

  // Set finalToken to null if there is no cookie
  const finalToken = parsedToken || null;

  return {
    props: {
      finalToken,
    },
  };
}

export default side;
