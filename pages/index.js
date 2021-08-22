import Cards from "@/components/home/Cards";
import Alert from "@/components/layout/Alert";
import { useSelector } from "react-redux";

const HomePage = () => {
  const alerts = useSelector((state) => state.alerts);

  return (
    <>
      <Cards />
      <Alert alerts={alerts} />
    </>
  );
};

export default HomePage;
