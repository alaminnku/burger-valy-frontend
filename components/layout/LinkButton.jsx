import Link from "next/link";
import styles from "@styles/layout/linkButton.module.css";

const LinkButton = ({ text, href, clicked, style }) => {
  return (
    <div className={styles.LinkButton} onClick={clicked} style={style}>
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </div>
  );
};

export default LinkButton;
