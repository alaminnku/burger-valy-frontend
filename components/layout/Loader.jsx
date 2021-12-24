import styles from "@styles/layout/loader.module.css";

const Loader = () => {
  return (
    <span className={styles.Loader}>
      <div className={styles.Dot1}></div>
      <div className={styles.Dot2}></div>
      <div className={styles.Dot3}></div>
    </span>
  );
};

export default Loader;
