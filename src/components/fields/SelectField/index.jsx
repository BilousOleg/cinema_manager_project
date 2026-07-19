import { ErrorMessage, Field } from 'formik';
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

          <ErrorMessage name={name}>
            {msg => <span className={styles.error}>{msg}</span>}
          </ErrorMessage>
        </div>
      )}
    </Field>
  );
}

export default SelectField;
