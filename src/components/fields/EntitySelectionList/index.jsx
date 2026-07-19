import { ErrorMessage } from 'formik';
import EntitySelectionItem from './EntitySelectionItem';
import styles from './EntitySelectionList.module.sass';

function EntitySelectionList ({
  items,
  type,
  name,
  getValue,
  getTitle,
  getImage,
  defaultImage,
}) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.selectionList}>
        {items.map(item => (
          <EntitySelectionItem
            key={getValue(item)}
            type={type}
            name={name}
            value={getValue(item)}
            title={getTitle(item)}
            imgSrc={getImage(item)}
            defaultImage={defaultImage}
          />
        ))}
      </ul>
      <ErrorMessage name={name}>
        {msg => <span className={styles.error}>{msg}</span>}
      </ErrorMessage>
    </div>
  );
}

export default EntitySelectionList;
