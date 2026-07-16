import { Field } from 'formik';
import styles from './EntitySelectionItem.module.sass';

function EntitySelectionItem ({ type, name, value, title, imgSrc }) {
  return (
    <li className={styles.item}>
      <label className={styles.label}>
        <Field type={type} name={name} value={value} />
        <img src={imgSrc} alt={title} className={styles.image} />
        <span className={styles.title}>{title}</span>
      </label>
    </li>
  );
}

export default EntitySelectionItem;
