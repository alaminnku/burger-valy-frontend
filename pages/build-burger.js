import BurgerType from "@/components/build/BurgerType";
import Burger from "@/components/burger/Burger";
import { useState } from "react";
import styles from "@styles/build/build.module.css";

const BuildBurger = () => {
  const [pattyType, setPattyType] = useState(null);

  // Handle change
  const handleChange = (e) => {
    setPattyType(e.target.id);
  };

  return (
    <div className={styles.Build}>
      <BurgerType changed={handleChange} />
      {pattyType && <Burger pattyType={pattyType} />}
    </div>
  );
};

export default BuildBurger;
