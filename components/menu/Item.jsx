import Link from "next/link";
import styles from "@styles/menu/item.module.css";

const Item = ({ bgImage, title, href }) => {
  const background = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "left bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div className={styles.Item} style={background}>
      <h2>{title}</h2>
      <Link href={href}>Order Now</Link>
    </div>
  );
};

export default Item;
