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

  const { burger } = useSelector((state) => state.burger);

  const { ingredients, totalPrice } = burger;

  const handleSetBurger = () => {
    Cookies.set("burger", burger);
  };

  return (
    <div className={styles.Burger}>
      <Ingredients ingredients={ingredients} />
      <p className={styles.Price}>Price: ${totalPrice}</p>
      <Controller ingredients={ingredients} price={price} meatType={meatType} />
      <LinkButton
        text='CONTINUE'
        href='/beef-burger/side'
        clicked={handleSetBurger}
      />
    </div>
  );
};

export default Burger;
