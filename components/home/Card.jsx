import styles from "@styles/home/card.module.css";
import LinkButton from "../layout/LinkButton";

const Card = ({ title, href, bgImage }) => {
  const background = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div className={styles.Card} style={background}>
      <h5>Starts from $9.99</h5>
      <div className={styles.TitleButton}>
        <h2>{title}</h2>
        <LinkButton
          href={href}
          text='Make Now'
          style={{ borderRadius: "1.5rem" }}
        />
      </div>
    </div>
  );
};

export default Card;
