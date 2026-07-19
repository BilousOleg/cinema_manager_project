import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { addMovie } from '../../../store/slices/moviesSlice';
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

const { MOVIE_FORM_STEPS } = CONSTANTS;

const initialValues = {
  title: '',
  genreId: '',
  year: '',
  poster: '',
  trailer: '',
  directorId: '',
  actorIds: [],
  studioId: '',
  description: '',
};

function MovieForm () {
  const [step, setStep] = useState(0);

  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addMovie(values));
    resetForm();
    setStep(0);
  };

  return (
    <Formik
      initialValues={initialValues}
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
