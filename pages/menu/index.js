import Menu from "@/components/menu/Menu";
import HeadSection from "@/components/layout/HeadSection";
import styles from "@styles/menu/menuPage.module.css";

const MenuPage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valy | Menu'
        content='Choose delicious foods from the menu. Order and pickup hot in 30 minutes.'
        pageURL='https://www.burgervaly.com/menu'
      />
      <main className={styles.MenuPage}>
        <div className={styles.Title}>
          <h2>Order Food for You and Your Family!</h2>
          <small>
            Get the food you like! Order and pickup hot in 30 minutes and enjoy
            the deliciousness together!
          </small>
        </div>
        <Menu />
      </main>
    </>
  );
};

export default MenuPage;
