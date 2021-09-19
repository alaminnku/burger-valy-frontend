import Cards from "@/components/side/Cards";
import Summary from "@/components/side/Summary";
import styles from "@styles/side/side.module.css";

const SidePage = () => {
  return (
    <div className={styles.Side}>
      <Summary />
      <Cards />
    </div>
  );
};

export default SidePage;
