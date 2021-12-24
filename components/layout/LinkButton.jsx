import Link from "next/link";
import styles from "@styles/layout/linkButton.module.css";

const LinkButton = ({ text, href, clicked, style, disabled }) => {
  return (
    <div
      className={`${styles.LinkButton} ${disabled && styles.Disabled}`}
      onClick={clicked}
    >
      <Link href={href}>
        <a style={style}>{text}</a>
      </Link>
    </div>
  );
};

export default LinkButton;
