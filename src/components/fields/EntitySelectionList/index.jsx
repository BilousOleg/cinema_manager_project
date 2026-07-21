import { ErrorMessage, useField } from 'formik';
import classNames from 'classnames';
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
  onAdd,
  addButtonText,
}) {
  const [, meta] = useField(name);

  return (
    <div className={styles.wrapper}>
      {onAdd && (
        <button type='button' className={styles.addBtn} onClick={onAdd}>
          + {addButtonText}
        </button>
      )}

      <ul
        className={classNames(styles.selectionList, {
          [styles.invalid]: meta.touched && meta.error,
        })}
      >
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
