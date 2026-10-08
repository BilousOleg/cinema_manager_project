import TotalCountListItem from './TotalCountListItem';
import NoItems from '../../NoItems';
import styles from './TotalCountList.module.sass';

function TotalCountList ({ totalCountData, isFetching, error }) {
  if (isFetching) {
    return <NoItems message={'Loading...'} />;
  }

  if (error) {
    return <NoItems message={`${error.message}`} />;
  }

  return (
    <ul className={styles.totalCountList}>
      {totalCountData.map(t => (
        <TotalCountListItem key={t.id} text={t.text} count={t.count} />
      ))}
    </ul>
  );
}

export default TotalCountList;
