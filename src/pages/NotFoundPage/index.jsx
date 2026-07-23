import styles from './NotFoundPage.module.sass';

function NotFoundPage () {
  return (
    <article className={styles.page}>
      <h2>404</h2>
      <p>Page not found</p>
    </article>
  );
}

export default NotFoundPage;
