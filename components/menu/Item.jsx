import LinkButton from "../layout/LinkButton";
import styles from "@styles/menu/item.module.css";
import Image from "next/image";

const Item = ({ bgImage, title, href, price }) => {
  return (
    <div className={styles.Item}>
      <div className={styles.Image}>
        <Image src={bgImage} width={16} height={9} layout="responsive" />
      </div>

      <div className={styles.Content}>
        <div>
          <p>{title}</p>
          <p>Starts from ${price}</p>
        </div>
        <LinkButton href={href} text="Order now" />
      </div>
    </div>
  );
};

export default Item;
