import styles from './TotalCountListItem.module.sass';

function TotalCountListItem ({ text, count }) {
  return (
    <li className={styles.totalCountListItem}>
      <h4>{text}</h4>
      <p>{count}</p>
    </li>
  );
}

export default TotalCountListItem;
