import Cards from "@/components/side/Cards";
import Summary from "@/components/side/Summary";
import HeadSection from "@/components/layout/HeadSection";
import styles from "@styles/side/side.module.css";

const SidePage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valy | Add Side'
        content='See the initial summary and add side with your beef burger.'
        pageURL='https://www.burgervaly.com/beef-burger/side'
      />
      <main className={styles.Side}>
        <Summary />
        <Cards />
      </main>
    </>
  );
};

export default SidePage;
