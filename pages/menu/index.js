import Menu from "@/components/menu/Menu";
import HeadSection from "@/components/layout/HeadSection";
import styles from "@styles/menu/menuPage.module.css";

const MenuPage = () => {
  return (
    <>
      <HeadSection
        title="Burger Valy | Menu"
        content="Choose delicious foods from the menu. Order and pickup hot in 30 minutes."
        pageURL="https://www.burgervaly.com/menu"
      />
      <main className={styles.MenuPage}>
        <div className={styles.Title}>
          <h2>Choose, learn and order</h2>
          <p>Get the food you like! Order and pickup hot in 30 minutes</p>
        </div>
        <Menu />
      </main>
    </>
  );
};

export default MenuPage;
