import styles from './NoItems.module.sass';

function NoItems ({ message }) {
  return <div className={styles.noItems}>{message}</div>;
}

export default NoItems;
