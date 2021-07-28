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

  // Get the price and burger
  const { price } = useSelector((state) => state.burger);
  const { burger } = useSelector((state) => state.burger);

  // Ingredients and total price
  const { ingredients, totalPrice } = burger;

  return (
    <div className={styles.Burger}>
      <h4>{pattyType} Burger</h4>
      <Ingredients ingredients={ingredients} pattyType={pattyType} />
      <p className={styles.Price}>Price: ${totalPrice}</p>
      <Controller
        ingredients={ingredients}
        price={price}
        pattyType={pattyType}
      />
      <LinkButton
        text='CONTINUE'
        href={`${
          burger.type === "Cheddar"
            ? "/cheese-burger/side"
            : `/${burger.type.toLowerCase()}-burger/side`
        }`}
        clicked={() => Cookies.set("burger", burger)}
      />
    </div>
  );
};

export default Burger;
