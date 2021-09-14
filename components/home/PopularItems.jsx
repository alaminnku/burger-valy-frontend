import Image from "next/image";
import styles from "@styles/home/popularItems.module.css";
import LinkButton from "../layout/LinkButton";

const items = [
  {
    name: "Fish fingers",
    src: "/images/home/popular-items/fish-fingers.jpg",
    desc: "6 pieces of delicious Fish fingers",
    url: "/menu/fish-fingers",
    price: 9.99,
  },
  {
    name: "Pepperoni Pizza",
    src: "/images/home/popular-items/pepperoni-pizza.jpg",
    desc: "1 large pepperoni pizza",
    url: "/menu/pepperoni-pizza",
    price: 8.99,
  },
  {
    name: "Club Sandwich",
    src: "/images/home/popular-items/club-sandwich.jpg",
    desc: "2 pieces of club sandwiches",
    url: "/menu/club-sandwich",
    price: 5.99,
  },
  {
    name: "Beef Burger",
    src: "/images/home/popular-items/beef-burger.jpg",
    desc: "Full blast beef burger with cheese",
    url: "/beef-burger",
    price: 9.99,
  },
  {
    name: "Cheese Burger",
    src: "/images/home/popular-items/cheese-burger.jpg",
    desc: "Full blast cheese burger",
    url: "/cheese-burger",
    price: 9.99,
  },

  {
    name: "Crispy Fried Chicken",
    src: "/images/home/popular-items/crispy-fried-chicken.jpg",
    desc: "4 pieces of crispy fried chicken",
    url: "/crispy-fried-chicken",
    price: 8.99,
  },
];

const PopularItems = () => {
  return (
    <div className={styles.PopularItems}>
      <div className={styles.Title}>
        <h2>Most Popular Items</h2>
        <small>
          Few of our great dishes absolutely loved by people like you!
        </small>
      </div>

      <div className={styles.Cards}>
        {items.map((item) => (
          <div key={item.name} className={styles.Card}>
            <div className={styles.Image}>
              <Image src={item.src} width='200' height='200' />
              <h5>${item.price}</h5>
            </div>

            <div className={styles.Content}>
              <h4>{item.name}</h4>
              <small>{item.desc}</small>
            </div>

            <LinkButton text='Order Now' href={item.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularItems;
