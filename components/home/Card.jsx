import styles from "@styles/home/card.module.css";
import Image from "next/image";
import LinkButton from "../layout/LinkButton";

const Card = ({ title, href, bgImage }) => {
  return (
    <div className={styles.Card}>
      <div className={styles.Image}>
        <Image src={bgImage} width={16} height={9} layout="responsive" />
      </div>

      <div className={styles.Content}>
        <div>
          <p>{title}</p>
          <p>Starts from $9.99</p>
        </div>
        <LinkButton href={href} text="Create" />
      </div>
    </div>
  );
};

export default Card;
