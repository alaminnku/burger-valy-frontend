import Link from "next/link";
import styles from "@styles/layout/linkButton.module.css";

const LinkButton = ({ text, href }) => {
  return (
    <div className={styles.LinkButton}>
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </div>
  );
};

export default LinkButton;
