import { ErrorMessage, Field } from 'formik';
import styles from './DateField.module.sass';

function DateField ({ name, ...props }) {
  return (
    <Field name={name}>
      {({ field }) => (
        <div className={styles.wrapper}>
          <input {...field} {...props} type='date' className={styles.input} />
          <ErrorMessage name={name}>
            {msg => <span className={styles.error}>{msg}</span>}
          </ErrorMessage>
        </div>
      )}
    </Field>
  );
}

export default DateField;
