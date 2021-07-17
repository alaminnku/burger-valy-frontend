import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "@styles/side/summary.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBurger, setTotalPrice } from "@store/actions/burgerActions";

const Summary = () => {
  // Dispatch set burger action
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBurger());
  }, []);

  // Get the state
  const { burger, side } = useSelector((state) => state.burger);
  console.log(burger);

  let friesAndDrink = "No fries and drink";

  if (burger.side === "small") {
    friesAndDrink = "1 small fries and drink";
  } else if (burger.side === "medium") {
    friesAndDrink = "1 medium fries and drink";
  } else if (burger.side === "large") {
    friesAndDrink = "1 large fries and drink";
  }

  // Destructure ingredients
  const { Bacon, Cheese, Meat, Salad, totalPrice } = burger;

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
        <p className={styles.Price}>Total price: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default Summary;
