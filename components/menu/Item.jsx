import Link from "next/link";
import styles from "@styles/menu/item.module.css";
import { convertName } from "helpers";
import { useSelector } from "react-redux";

const Item = ({ bgImage, title, href }) => {
  // State
  const { price } = useSelector((state) => state.burger);

  const convertedText = convertName(title);

  // Background
  const background = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div className={styles.Item} style={background}>
      <h5>{`Starts from $${price[convertedText]}`}</h5>
      <div className={styles.TitleButton}>
        <h2>{title}</h2>
        <Link href={href}>Order Now</Link>
      </div>
    </div>
  );
};

export default Item;
