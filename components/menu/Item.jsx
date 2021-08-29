import Link from "next/link";
import styles from "@styles/menu/item.module.css";
import { useSelector } from "react-redux";

const Item = ({ bgImage, title, href }) => {
  // State
  const { price } = useSelector((state) => state.burger);

  // Get the first word and rest of the words from the name in seperate arrays
  const [fristWord, ...restWords] = title.split(" ");

  // Convert the first letter of the first word to lowercase and join the whole string back
  const name = `${fristWord.replace(
    fristWord[0],
    fristWord[0].toLowerCase()
  )}${restWords.join("")}`;

  const background = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div className={styles.Item} style={background}>
      <h5>{`Starts from $${price[name]}`} </h5>
      <div className={styles.TitleButton}>
        <h2>{title}</h2>
        <Link href={href}>Order Now</Link>
      </div>
    </div>
  );
};

export default Item;
