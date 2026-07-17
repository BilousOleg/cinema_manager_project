import { Field } from 'formik';
import styles from './TextAreaField.module.sass';

function TextAreaField ({ name, placeholder, rows = 5, ...props }) {
  return (
    <Field name={name}>
      {({ field }) => (
        <textarea
          {...field}
          {...props}
          rows={rows}
          onInput={e => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          placeholder={placeholder}
          className={styles.textarea}
        />
      )}
    </Field>
  );
}

export default TextAreaField;
