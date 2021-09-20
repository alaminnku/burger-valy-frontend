import Cards from "@/components/side/Cards";
import Summary from "@/components/side/Summary";
import HeadSection from "@/components/layout/HeadSection";
import styles from "@styles/side/side.module.css";

const SidePage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valley | Add Side'
        content='See the initial summary and add side with your cheese burger.'
        pageURL='https://www.burgervalley.com/cheese-burger/side'
      />
      <main className={styles.Side}>
        <Summary />
        <Cards />
      </main>
    </>
  );
};

export default SidePage;
