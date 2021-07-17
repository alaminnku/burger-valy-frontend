import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { addSide } from "@store/actions/burgerActions";
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from "@styles/side/card.module.css";

const Card = ({ title, items, side }) => {
  // Dispatch
  const dispatch = useDispatch();

  //Price
  const { price, burger } = useSelector((state) => state.burger);

  let sideAdded = false;

  if (burger.side !== "") {
    sideAdded = true;
  }

  const handleAddSide = () => {
    dispatch(addSide(price[side], side));
  };

  return (
    <div className={styles.Card}>
      <div className={styles.ImageTitle}>
        <div className={styles.Image}>
          <Image
            src='/images/side-n-drink/drink-and-fries.svg'
            width={64}
            height={64}
          />
        </div>
        <div className={styles.Title}>
          <p>{title}</p>
          <p>{items}</p>
          <IoIosAddCircleOutline
            className={`${styles.Icon} ${sideAdded && styles.Disabled}`}
            onClick={handleAddSide}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
