import { Field } from 'formik';
import Image from '../../Image';
import styles from './EntitySelectionItem.module.sass';

function EntitySelectionItem ({
  type,
  name,
  value,
  title,
  imgSrc,
  defaultImage,
}) {
  return (
    <li className={styles.item}>
      <label className={styles.label}>
        <Field type={type} name={name} value={value} />
        <Image
          src={imgSrc}
          alt={title}
          fallback={defaultImage}
          className={styles.image}
        />
        <span className={styles.title}>{title}</span>
      </label>
    </li>
  );
}

export default EntitySelectionItem;
