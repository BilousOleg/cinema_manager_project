import { ErrorMessage, Field } from 'formik';
import classNames from 'classnames';
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
      {({ field, meta }) => (
        <div className={styles.wrapper}>
          <select
            {...field}
            className={classNames(styles.select, {
              [styles.invalid]: meta.touched && meta.error,
            })}
          >
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
