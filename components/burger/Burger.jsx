import { useSelector } from "react-redux";
import Ingredients from "./Ingredients";
import Controller from "./Controller";
import LinkButton from "../layout/LinkButton";
import styles from "@styles/burger/burger.module.css";
import Cookies from "js-cookie";
import { setBurger } from "@store/actions/burgerActions";
import { useDispatch } from "react-redux";

const Burger = ({ meatType }) => {
  // Get the state
  const { price } = useSelector((state) => state.burger);

  // Burger
  const { burger } = useSelector((state) => state.burger);

  // Ingredients and total price
  const { ingredients, totalPrice } = burger;

  return (
    <div className={styles.Burger}>
      <Ingredients ingredients={ingredients} />
      <p className={styles.Price}>Price: ${totalPrice}</p>
      <Controller ingredients={ingredients} price={price} meatType={meatType} />
      <LinkButton
        text='CONTINUE'
        href='/beef-burger/side'
        clicked={() => Cookies.set("burger", burger)}
      />
    </div>
  );
};

export default Burger;
