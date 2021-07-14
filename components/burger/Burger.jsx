import { useSelector } from "react-redux";
import Ingredients from "./Ingredients";
import Controller from "./Controller";
import LinkButton from "../layout/LinkButton";
import styles from "@styles/burger/burger.module.css";

const Burger = ({ meatType }) => {
  // Get the state
  const { ingredients, price, totalPrice } = useSelector(
    (state) => state.burger
  );

  return (
    <div className={styles.Burger}>
      <Ingredients ingredients={ingredients} />
      <p className={styles.Price}>Price: ${totalPrice}</p>
      <Controller ingredients={ingredients} price={price} meatType={meatType} />
      <LinkButton text='CONTINUE' href='/beef-burger/side' />
    </div>
  );
};

export default Burger;
