import HeadSection from "@/components/layout/HeadSection";
import LinkButton from "@/components/layout/LinkButton";
import styles from "@styles/layout/errorPage.module.css";

const ErrorPage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valy | Page Not Found'
        content='Requested page is not found!'
      />
      <main className={styles.ErrorPage}>
        <div className={styles.Content}>
          <h4>This page doesn't exist!</h4>
          <p>
            The page you are requesting either doesn't exists or broken. Please
            check the link you are trying to open is correct.
          </p>
          <LinkButton text='Go Home' href='https://www.burgervaly.com/' />
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
