import { useSelector, useDispatch } from "react-redux";
import Ingredients from "./Ingredients";
import Controller from "./Controller";
import LinkButton from "../layout/LinkButton";
import styles from "@styles/burger/burger.module.css";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { setBurgerType } from "@store/actions/burgerActions";

const Burger = ({ pattyType }) => {
  // Set burger type on load
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBurgerType(pattyType));
  }, []);

  // States
  const { price } = useSelector((state) => state.burger);
  const { burger } = useSelector((state) => state.burger);

  // Ingredients and total price
  const { ingredients, totalPrice } = burger;

  // Disabled and enable button
  const { Salad, Cheese, Patty, Bacon } = ingredients;

  let disabled = true;

  if (Salad > 0 && Cheese > 0 && Patty > 0 && Bacon > 0) {
    disabled = false;
  }

  return (
    <div className={styles.Burger}>
      <h2>{pattyType} burger</h2>

      <Ingredients ingredients={ingredients} pattyType={pattyType} />

      <p className={styles.Price}>Price: ${totalPrice}</p>

      <Controller
        ingredients={ingredients}
        price={price}
        pattyType={pattyType}
      />

      <LinkButton
        text="Continue"
        href={`${
          burger.type === "Cheddar"
            ? "/cheese-burger/side"
            : `/${burger.type.toLowerCase()}-burger/side`
        }`}
        clicked={() => Cookies.set("burger", burger)}
        disabled={disabled}
      />
    </div>
  );
};

export default Burger;
