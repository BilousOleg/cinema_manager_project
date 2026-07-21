import { ErrorMessage, Field } from 'formik';
import classNames from 'classnames';
import styles from './TextAreaField.module.sass';

function TextAreaField ({ name, placeholder, ...props }) {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className={styles.wrapper}>
          <textarea
            {...field}
            {...props}
            placeholder={placeholder}
            className={classNames(styles.textarea, {
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

export default TextAreaField;
