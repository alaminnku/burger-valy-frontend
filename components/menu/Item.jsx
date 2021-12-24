import { convertName } from "helpers";
import LinkButton from "../layout/LinkButton";
import { useSelector } from "react-redux";
import styles from "@styles/menu/item.module.css";

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
        <LinkButton
          href={href}
          text='Order Now'
          style={{ borderRadius: "1.5rem" }}
        />
      </div>
    </div>
  );
};

export default Item;
