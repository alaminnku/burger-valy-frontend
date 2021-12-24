import Card from "./Card";
import styles from "@styles/home/cards.module.css";

const Cards = () => {
  return (
    <div className={styles.Cards}>
      <Card
        title='Beef Burger'
        href='/beef-burger'
        bgImage='/images/burger/beef-burger.jpg'
      />
      <Card
        title='Chicken Burger'
        href='/chicken-burger'
        bgImage='/images/burger/chicken-burger.jpg'
      />
      <Card
        title='Cheese Burger'
        href='/cheese-burger'
        bgImage='/images/burger/cheese-burger.jpg'
      />
      <Card
        title='Vegetable Burger'
        href='/vegetable-burger'
        bgImage='/images/burger/vegan-burger.jpg'
      />
    </div>
  );
};

export default Cards;
