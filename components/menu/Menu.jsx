import Item from "./Item";
import styles from "@styles/menu/menu.module.css";

const Menu = () => {
  return (
    <div className={styles.Menu}>
      <Item
        bgImage="/images/menu/cheese-pizza.jpg"
        title="Cheese Pizza"
        href="/menu/cheese-pizza"
      />
      <Item
        bgImage="/images/menu/club-sandwich.jpg"
        title="Club Sandwich"
        href="/menu/club-sandwich"
      />
      <Item
        bgImage="/images/menu/crispy-fried-chicken.jpg"
        title="Crispy Fried Chicken"
        href="/menu/crispy-fried-chicken"
      />
      <Item
        bgImage="/images/menu/fish-fingers.jpg"
        title="Fish Fingers"
        href="/menu/fish-fingers"
      />
      <Item
        bgImage="/images/menu/oven-baked-pasta.jpg"
        title="Oven Baked Pasta"
        href="/menu/oven-baked-pasta"
      />
      <Item
        bgImage="/images/menu/mexican-taco.jpg"
        title="Mexican Taco"
        href="/menu/mexican-taco"
      />
      <Item
        bgImage="/images/menu/sub-sandwich.jpg"
        title="Sub Sandwich"
        href="/menu/sub-sandwich"
      />

      <Item
        bgImage="/images/menu/pepperoni-pizza.jpg"
        title="Pepperoni Pizza"
        href="/menu/pepperoni-pizza"
      />
    </div>
  );
};

export default Menu;
