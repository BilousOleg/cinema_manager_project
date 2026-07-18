import { ErrorMessage, Field } from 'formik';
import BackspaceIcon from '@mui/icons-material/Backspace';
import styles from './TextField.module.sass';

function TextField ({ name, placeholder, normalize, ...inputProps }) {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <div className={styles.wrapper}>
          <input
            {...field}
            {...inputProps}
            placeholder={placeholder}
            className={styles.input}
            onChange={e => {
              const value = normalize
                ? normalize(e.target.value)
                : e.target.value;

              form.setFieldValue(name, value);
            }}
          />

          {field.value && (
            <button
              type='button'
              className={styles.clearBtn}
              onClick={() => form.setFieldValue(name, '')}
            >
              <BackspaceIcon />
            </button>
          )}
          <ErrorMessage name={name}>
            {msg => <span className={styles.error}>{msg}</span>}
          </ErrorMessage>
        </div>
      )}
    </Field>
  );
}

export default TextField;
