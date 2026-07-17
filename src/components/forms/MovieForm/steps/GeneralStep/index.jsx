import TextField from '../../../../TextField';
import SelectField from '../../../../SelectField';
import styles from './GeneralStep.module.sass';
import CONSTANTS from '../../../../../constants';

const { GENRES } = CONSTANTS;

function GeneralStep () {
  return (
    <>
      <TextField name='title' type='text' placeholder='Movie title' />
      <div className={styles.formBlock}>
        <SelectField
          name='genreId'
          label='Genre'
          items={GENRES}
          getValue={genre => genre.id}
          getLabel={genre => genre.name}
        />
        <TextField
          name='year'
          placeholder='Year'
          inputMode='numeric'
          maxLength={4}
          normalize={value => value.replace(/\D/g, '').slice(0, 4)}
        />
      </div>

      <TextField name='poster' type='text' placeholder='Poster URL' />
      <TextField
        name='trailer'
        type='text'
        placeholder='Trailer URL (Youtube only)'
      />
    </>
  );
}

export default GeneralStep;
