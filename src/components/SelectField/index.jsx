import { Field } from 'formik';
import styles from './SelectField.module.sass';

function SelectField ({
  name,
  items,
  getValue,
  getLabel,
  placeholder = 'Choose genre',
}) {
  return (
    <Field name={name}>
      {({ field }) => (
        <div className={styles.wrapper}>
          <select {...field} className={styles.select}>
            <option value='' disabled>
              {placeholder}
            </option>

            {items.map(item => (
              <option key={getValue(item)} value={getValue(item)}>
                {getLabel(item)}
              </option>
            ))}
          </select>
        </div>
      )}
    </Field>
  );
}

export default SelectField;
