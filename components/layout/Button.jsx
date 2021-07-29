import styles from "@styles/layout/button.module.css";
const Button = ({ text, clicked, style }) => {
  return (
    <button className={styles.Button} onClick={clicked} style={style}>
      {text}
    </button>
  );
};

export default Button;
