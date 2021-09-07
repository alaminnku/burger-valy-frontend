import { items } from "../../data/items";
import Image from "next/image";
import styles from "@styles/menu/itemPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import Button from "@/components/layout/Button";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "config";
import Loader from "@/components/layout/Loader";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { setAlert } from "@store/actions/alertActions";
import Alert from "@/components/layout/Alert";

const ItemPage = ({ item }) => {
  // Hooks
  const router = useRouter();
  const dispatch = useDispatch();

  // Get the first word and rest of the words from the name in separate arrays
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
  const [loading, setLoading] = useState(false);
  const alerts = useSelector((state) => state.alerts);

  // Final item
  const finalItem = {
    name: item.name,
    quantity,
    totalPrice: price[name] * quantity,
    img: item.img,
  };

  // Submit the order
  const handleSubmitOrder = async () => {
    // If there is no token
    if (!token) {
      Cookies.set("item", finalItem);
      router.push("/register");
      return;
    }

    // If there is a token
    try {
      // Start the loader
      setLoading(true);

      // Get the price
      const priceRes = await axios.get(`${API_URL}/price`);
      const fetchedPrice = priceRes.data;

      // Final item
      const order = {
        name: item.name,
        quantity,
        totalPrice: fetchedPrice[name] * quantity,
      };

      // Post the order to db
      await axios.post(`${API_URL}/genericorders`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Stop the loader, show the message and navigate to account page
      setLoading(false);
      dispatch(setAlert("Order placed successfully!", "Success"));
      router.push("/account");
    } catch (err) {
      // Stop the loader and show the message
      setLoading(false);
      dispatch(setAlert(err.response.data.message, "Danger"));
    }
  };

  return (
    <div className={styles.ItemPage}>
      <h3>{item.name}</h3>

      <div className={styles.Image}>
        <Image src={item.img} alt='' width='768' height='432' />
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
            <AiOutlinePlusCircle
              className={styles.AddIcon}
              onClick={() => setQuantity(quantity + 1)}
            />
            <AiOutlineMinusCircle
              className={`${styles.RemoveIcon} ${
                quantity === 1 && styles.Disabled
              }`}
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

      <Button
        text={loading ? <Loader /> : "Confirm Order"}
        clicked={handleSubmitOrder}
      />

      <Alert alerts={alerts} />
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
