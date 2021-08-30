import { items } from "../../data/items";
import Image from "next/image";
import styles from "@styles/menu/itemPage.module.css";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import LinkButton from "@/components/layout/LinkButton";
import Cookies from "js-cookie";

const ItemPage = ({ item }) => {
  // States
  const { price } = useSelector((state) => state.burger);
  // const { user } = useSelector((state) => state.auth);

  // Get the first word and rest of the words from the name in seperate arrays
  const [fristWord, ...restWords] = item.name.split(" ");

  // Convert the first letter of the first word to lowercase and join the whole string back
  const name = `${fristWord.replace(
    fristWord[0],
    fristWord[0].toLowerCase()
  )}${restWords.join("")}`;

  const foodItem = {
    name: item.name,
    quantity: item.quantity,
    price: price[name],
  };

  // Save the item to cookie
  const handleSaveItem = () => {
    Cookies.set("item", foodItem);
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
            <p>{item.quantity}</p>
          </div>

          <div className={styles.Item}>
            <h4>Pickup time</h4>
            <p>{item.pickupTime}</p>
          </div>

          <div className={styles.Item}>
            <h4>Price</h4>
            <p>${price[name]}</p>
          </div>
        </div>
      </div>

      <LinkButton
        text="CONTINUE"
        href={`/menu/${item.slug}/confirm-order`}
        clicked={handleSaveItem}
      />
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
