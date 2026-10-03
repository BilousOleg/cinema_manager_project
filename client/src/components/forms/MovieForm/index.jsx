import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import {
  addMovieThunk,
  updateMovieThunk,
} from '../../../store/slices/moviesSlice';
import { closeService } from '../../../store/slices/serviceSlice';
import { MOVIE_VALIDATION_SCHEMA } from '../../../utils/validation/validationSchemas';
import MovieStepper from './MovieStepper';
import GeneralStep from './steps/GeneralStep';
import DirectorStep from './steps/DirectorStep';
import ActorsStep from './steps/ActorsStep';
import StudioStep from './steps/StudioStep';
import StorylineStep from './steps/StorylineStep';
import MovieFormActions from './MovieFormActions';
import styles from './MovieForm.module.sass';
import CONSTANTS from '../../../constants';

const {
  MOVIE_FORM_STEPS,
  EMPTY_FORM_VALUES: { EMPTY_MOVIE },
} = CONSTANTS;

function MovieForm ({ selectedId }) {
  const [step, setStep] = useState(0);

  const dispatch = useDispatch();

  const { movies } = useSelector(state => state.movies);
  const currentMovie = selectedId
    ? movies.find(m => m.id === selectedId)
    : null;

  const formInitialValues = currentMovie
    ? {
        ...currentMovie,
        genreId: String(currentMovie.genreId),
      }
    : EMPTY_MOVIE;

  const handleSubmit = (values, { resetForm }) => {
    const action = selectedId ? updateMovieThunk : addMovieThunk;
    dispatch(action(values));
    resetForm();
    setStep(0);
    dispatch(closeService());
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={handleSubmit}
      validationSchema={MOVIE_VALIDATION_SCHEMA}
      enableReinitialize
    >
      {() => (
        <Form className={styles.form}>
          <MovieStepper step={step} steps={MOVIE_FORM_STEPS} />

          {step === 0 && <GeneralStep />}
          {step === 1 && <DirectorStep />}
          {step === 2 && <ActorsStep />}
          {step === 3 && <StudioStep />}
          {step === 4 && <StorylineStep />}

          <MovieFormActions
            step={step}
            steps={MOVIE_FORM_STEPS}
            setStep={setStep}
          />
        </Form>
      )}
    </Formik>
  );
}

export default MovieForm;
