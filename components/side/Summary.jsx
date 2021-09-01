import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "@styles/side/summary.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setBurger } from "@store/actions/burgerActions";
import { BiEdit } from "react-icons/bi";

const Summary = () => {
  // Hooks
  const router = useRouter();
  const dispatch = useDispatch();

  // Get the burger from cookies on reload and set on state
  useEffect(() => {
    dispatch(setBurger());
  }, []);

  // Get the state
  const { burger } = useSelector((state) => state.burger);

  // Check if there is fires and drink
  let friesAndDrink = "No fries and drink";

  if (burger.side === "small") {
    friesAndDrink = "1 small fries and drink";
  } else if (burger.side === "medium") {
    friesAndDrink = "1 medium fries and drink";
  } else if (burger.side === "large") {
    friesAndDrink = "1 large fries and drink";
  }

  // Destructure ingredients
  const { Bacon, Cheese, Patty, Salad } = burger.ingredients;

  return (
    <div className={styles.Summary}>
      <div className={styles.Burger}>
        <Image src='/images/layout/burger.svg' width={64} height={64} />
      </div>
      <div className={styles.Description}>
        <p>Your burger with</p>
        <ul>
          <li>{Salad}x salad</li>
          <li>{Cheese}x cheese</li>
          <li>{Bacon}x bacon</li>
          <li>
            {Patty}x {burger.type.toLowerCase()} patty
          </li>
          <li>{friesAndDrink}</li>
        </ul>
        <p className={styles.Price}>Total price: ${burger.totalPrice}</p>
      </div>
      <BiEdit
        className={styles.Icon}
        onClick={() =>
          router.push(
            `${
              burger.type === "Cheddar"
                ? "/cheese-burger"
                : `/${burger.type.toLowerCase()}-burger`
            }`
          )
        }
      />
    </div>
  );
};

export default Summary;
