import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "@styles/side/summary.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBurger } from "@store/actions/burgerActions";

const Summary = () => {
  // Dispatch set burger action
  const dispatch = useDispatch();

  // Get the burger from cookies on reload
  useEffect(() => {
    dispatch(setBurger());
  }, []);

  // Get the state
  const { burger } = useSelector((state) => state.burger);

  let friesAndDrink = "No fries and drink";

  if (burger.side === "small") {
    friesAndDrink = "1 small fries and drink";
  } else if (burger.side === "medium") {
    friesAndDrink = "1 medium fries and drink";
  } else if (burger.side === "large") {
    friesAndDrink = "1 large fries and drink";
  }

  // Destructure ingredients
  const { Bacon, Cheese, Meat, Salad } = burger.ingredients;

  return (
    <div className={styles.Summary}>
      <div className={styles.Burger}>
        <Image src='/images/layout/logo.svg' width={64} height={64} />
      </div>
      <div className={styles.Description}>
        <p>Your burger with</p>
        <ul>
          <li>{Salad}x salad</li>
          <li>{Cheese}x cheese</li>
          <li>{Meat}x meat</li>
          <li>{Bacon}x bacon</li>
          <li>{friesAndDrink}</li>
        </ul>
        <p className={styles.Price}>Total price: ${burger.totalPrice}</p>
      </div>
    </div>
  );
};

export default Summary;
