import BurgerType from "@/components/build/BurgerType";
import Burger from "@/components/burger/Burger";
import { useState } from "react";

const BuildBurger = () => {
  const [pattyType, setPattyType] = useState(null);

  // Handle change
  const handleChange = (e) => {
    setPattyType(e.target.id);
  };

  return (
    <div>
      <BurgerType changed={handleChange} />
      {pattyType && <Burger pattyType={pattyType} />}
    </div>
  );
};

export default BuildBurger;
