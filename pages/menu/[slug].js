import { items } from "../data/items";
import Image from "next/image";
import styles from "@styles/menu/itemPage.module.css";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import Button from "@/components/layout/Button";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useState } from "react";

const ItemPage = ({ item }) => {
  // Get the first word and rest of the words from the name in seperate arrays
  const [firstWord, ...restWords] = item.name.split(" ");

  // Convert the first letter of the first word to lowercase and join the whole string back
  const name = `${firstWord.replace(
    firstWord[0],
    firstWord[0].toLowerCase()
  )}${restWords.join("")}`;

  // States
  const { price } = useSelector((state) => state.burger);
  const { token } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(item.quantity);

  const foodItem = {
    name: item.name,
    quantity,
    price: price[name] * quantity,
  };

  const handleSubmitOrder = () => {
    console.log(foodItem);
  };

  return (
    <div className={styles.ItemPage}>
      <h3>{item.name}</h3>

      <div className={styles.Image}>
        <Image src={item.img} alt="" width="768" height="432" />
      </div>

      <div className={styles.Content}>
        <div>
          <h4>Ingredients</h4>
          <ul>
            {item.ingredients.map((ingredient) => (
              <li key={ingredient}>
                <TiTick /> {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={styles.Item}>
            <h4> Calorie (Approx)</h4>
            <p>{item.calorie}</p>
          </div>

          <div className={styles.Item}>
            <h4>Quantity</h4>
            <p>{quantity}</p>
            <AiOutlinePlusCircle onClick={() => setQuantity(quantity + 1)} />
            <AiOutlineMinusCircle
              onClick={() =>
                setQuantity(quantity > 1 ? quantity - 1 : quantity)
              }
            />
          </div>

          <div className={styles.Item}>
            <h4>Pickup time</h4>
            <p>{item.pickupTime}</p>
          </div>

          <div className={styles.Item}>
            <h4>Price</h4>
            <p>${price[name] * quantity}</p>
          </div>
        </div>
      </div>

      <Button text="Confirm Order" clicked={handleSubmitOrder} />
    </div>
  );
};

// Get all the paths and return 404 if a path doesn't match
export async function getStaticPaths() {
  // Get the array of objects of params with the slug
  const paths = items.map((item) => {
    return {
      params: {
        slug: item.slug,
      },
    };
  });

  // Return the array and fallback
  return {
    paths,
    fallback: false,
  };
}

// Return the item that matches the params slug
export async function getStaticProps({ params: { slug } }) {
  // Filter the item that matches with the slug
  const item = items.filter((item) => item.slug === slug)[0];

  return {
    props: { item },
  };
}

export default ItemPage;
