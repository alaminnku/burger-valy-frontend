import { useSelector } from "react-redux";
import Link from "next/link";

const userDetails = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const userDetails = <div>This is user details</div>;
  const loginPage = (
    <div>
      Please <Link href='/login'>login</Link>
    </div>
  );

  return <>{isAuthenticated ? userDetails : loginPage}</>;
};

export default userDetails;
