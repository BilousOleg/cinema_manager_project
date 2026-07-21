import { ErrorMessage, Field } from 'formik';
import classNames from 'classnames';
import styles from './DateField.module.sass';

function DateField ({ name, ...props }) {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className={styles.wrapper}>
          <input
            {...field}
            {...props}
            type='date'
            className={classNames(styles.input, {
              [styles.invalid]: meta.touched && meta.error,
            })}
          />
          <ErrorMessage name={name}>
            {msg => <span className={styles.error}>{msg}</span>}
          </ErrorMessage>
        </div>
      )}
    </Field>
  );
}

export default DateField;
