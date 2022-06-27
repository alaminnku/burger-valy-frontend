import Card from "./Card";
import styles from "@styles/home/cards.module.css";

const Cards = () => {
  return (
    <div className={styles.Cards}>
      <Card
        title="Beef burger"
        href="/beef-burger"
        bgImage="/images/burger/beef-burger.jpg"
      />
      <Card
        title="Chicken burger"
        href="/chicken-burger"
        bgImage="/images/burger/chicken-burger.jpg"
      />
      <Card
        title="Cheese burger"
        href="/cheese-burger"
        bgImage="/images/burger/cheese-burger.jpg"
      />
      <Card
        title="Vegetable burger"
        href="/vegetable-burger"
        bgImage="/images/burger/vegan-burger.jpg"
      />
    </div>
  );
};

export default Cards;
