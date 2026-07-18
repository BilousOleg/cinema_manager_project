import { ErrorMessage, Field } from 'formik';
import styles from './TextAreaField.module.sass';

function TextAreaField ({ name, placeholder, ...props }) {
  return (
    <Field name={name}>
      {({ field }) => (
        <div className={styles.wrapper}>
          <textarea
            {...field}
            {...props}
            placeholder={placeholder}
            className={styles.textarea}
          />

          <ErrorMessage name={name}>
            {msg => <span className={styles.error}>{msg}</span>}
          </ErrorMessage>
        </div>
      )}
    </Field>
  );
}

export default TextAreaField;
