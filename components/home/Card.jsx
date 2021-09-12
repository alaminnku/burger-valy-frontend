import Link from "next/link";
import styles from "@styles/home/card.module.css";

const Card = ({ title, href, bgImage }) => {
  const background = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "left bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div className={styles.Card} style={background}>
      <h5>Starts from $9.99</h5>
      <div className={styles.TitleButton}>
        <h2>{title}</h2>
        <Link href={href}>Make Now</Link>
      </div>
    </div>
  );
};

export default Card;
