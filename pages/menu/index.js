import Menu from "@/components/menu/Menu";
import styles from "@styles/menu/menuPage.module.css";

const MenuPage = () => {
  return (
    <div className={styles.MenuPage}>
      <div className={styles.Title}>
        <h2>Order Food for You and Your Family!</h2>
        <small>
          Pick your order up hot in 30 minutes and enjoy the deliciousness
          together!
        </small>
      </div>
      <Menu />
    </div>
  );
};

export default MenuPage;
