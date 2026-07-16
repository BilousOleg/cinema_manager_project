import EntitySelectionItem from './EntitySelectionItem';
import styles from './EntitySelectionList.module.sass';

function EntitySelectionList ({
  items,
  type,
  name,
  getValue,
  getTitle,
  getImage,
}) {
  return (
    <ul className={styles.selectionList}>
      {items.map(item => (
        <EntitySelectionItem
          key={getValue(item)}
          type={type}
          name={name}
          value={getValue(item)}
          title={getTitle(item)}
          imgSrc={getImage(item)}
        />
      ))}
    </ul>
  );
}

export default EntitySelectionList;
