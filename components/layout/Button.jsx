import styles from "@styles/layout/button.module.css";

const Button = ({ text, clicked, style, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.Button} ${disabled && styles.Disabled}`}
      onClick={clicked}
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
