import Card from "./Card";
import LinkButton from "../layout/LinkButton";
import { useSelector } from "react-redux";
import styles from "@styles/side/cards.module.css";
import Cookies from "js-cookie";

const Cards = () => {
  const { burger } = useSelector((state) => state.burger);

  const handleCreateFinalBurger = () => {
    Cookies.set("burger", burger);
  };

  return (
    <div className={styles.Cards}>
      <div>
        <Card
          title={
            <>
              Add <span>small</span> drink and fries +$6
            </>
          }
          items='1x small fries and 250ml drink'
          side='small'
        />
        <Card
          title={
            <>
              Add <span>medium</span> drink and fries +$8
            </>
          }
          items='1x medium fries and 350ml drink'
          side='medium'
        />
        <Card
          title={
            <>
              Add <span>large</span> drink and fries +$10
            </>
          }
          items='1x large fries and 450ml drink'
          side='large'
        />
      </div>
      <LinkButton
        text='ORDER NOW'
        href='/register'
        clicked={handleCreateFinalBurger}
      />
    </div>
  );
};

export default Cards;
