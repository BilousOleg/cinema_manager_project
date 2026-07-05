import TotalCountListItem from './TotalCountListItem';
import totalCountData from './totalCountData';
import styles from './TotalCountList.module.sass';

function TotalCountList () {
  return (
    <ul className={styles.totalCountList}>
      {totalCountData.map(t => (
        <TotalCountListItem key={t.id} text={t.text} count={t.count} />
      ))}
    </ul>
  );
}

export default TotalCountList;
