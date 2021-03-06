import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { addSide, removeSide } from "@store/actions/burgerActions";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import styles from "@styles/side/card.module.css";

const Card = ({ title, items, side, added }) => {
  // Dispatch
  const dispatch = useDispatch();

  //Price
  const { price, burger } = useSelector((state) => state.burger);

  // Check if side added
  let sideAdded = false;
  if (burger.side !== "") {
    sideAdded = true;
  }

  return (
    <div className={styles.Card}>
      <div className={styles.ImageTitle}>
        <div className={styles.Image}>
          <Image
            src="/images/side-n-drink/drink-and-fries.svg"
            width={64}
            height={64}
          />
        </div>

        <div className={styles.Title}>
          <p>{title}</p>
          <small>{items}</small>
          {!added ? (
            <IoIosAddCircleOutline
              className={`${styles.Icon} ${sideAdded && styles.Disabled}`}
              onClick={() => dispatch(addSide(price[side], side))}
            />
          ) : (
            <IoIosRemoveCircleOutline
              className={`${styles.Icon}`}
              onClick={() => dispatch(removeSide(price[side], (side = "")))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
