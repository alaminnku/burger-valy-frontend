import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { addSide } from "@store/actions/burgerActions";
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from "@styles/side/card.module.css";

const Card = ({ title, items, side }) => {
  // Dispatch
  const dispatch = useDispatch();

  //Price
  const { price } = useSelector((state) => state.burger);
  const { ingredients } = useSelector((state) => state.burger);
  const { side: sideItem } = useSelector((state) => state.burger);

  const totalIngAmount = Object.values(ingredients).reduce(
    (acc, cur) => acc + cur
  );

  let sideAdded = false;

  if (sideItem !== "" || totalIngAmount === 0) {
    sideAdded = true;
  }
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
            onClick={() => dispatch(addSide(price[side], side))}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
