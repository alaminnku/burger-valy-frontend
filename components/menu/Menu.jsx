import Item from "./Item";
import { items } from "data/items";
import styles from "@styles/menu/menu.module.css";

const Menu = () => {
  return (
    <div className={styles.Menu}>
      {items.map((item) => (
        <Item
          key={item.slug}
          bgImage={item.img}
          title={item.name}
          href={`/menu/${item.slug}`}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default Menu;
