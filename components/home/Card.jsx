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
      <Link href={href}>Build Now</Link>
    </div>
  );
};

export default Card;
