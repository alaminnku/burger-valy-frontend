import Cards from "@/components/side/Cards";
import Summary from "@/components/side/Summary";
import styles from "@styles/side/side.module.css";
import { useSelector } from "react-redux";

const SidePage = () => {
  // States
  const { token } = useSelector((state) => state.auth);

  return (
    <div className={styles.Side}>
      <Summary />
      <Cards token={token} />
    </div>
  );
};

export default SidePage;
