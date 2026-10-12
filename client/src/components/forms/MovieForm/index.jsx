import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import {
  createMovieThunk,
  loadMoviesThunk,
  updateMovieThunk,
} from '../../../store/slices/moviesSlice';
import { closeService } from '../../../store/slices/serviceSlice';
import { showNotification } from '../../../store/slices/notificationSlice';
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
  DEFAULT_PAGE,
  DEFAULT_RESULTS,
} = CONSTANTS;

function MovieForm ({ selectedId }) {
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(0);

  const dispatch = useDispatch();

  const page = Math.max(1, Number(searchParams.get('page')) || DEFAULT_PAGE);

  const results = Math.max(
    1,
    Number(searchParams.get('results')) || DEFAULT_RESULTS
  );

  const { movies } = useSelector(state => state.movies);
  const currentMovie = selectedId
    ? movies.find(m => m.id === selectedId)
    : null;

  const formInitialValues = currentMovie || EMPTY_MOVIE;

  const handleSubmit = async (values, { resetForm }) => {
    const action = selectedId ? updateMovieThunk : createMovieThunk;

    try {
      await dispatch(
        action(selectedId ? { id: selectedId, ...values } : values)
      ).unwrap();

      await dispatch(loadMoviesThunk({ page, results })).unwrap();

      resetForm();
      dispatch(closeService());

      dispatch(
        showNotification({
          message: selectedId
            ? 'Movie updated successfully'
            : 'Movie created successfully',
          type: 'success',
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          message: err || 'Failed to save movie',
          type: 'error',
        })
      );
    }
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
