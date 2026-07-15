import { useState } from 'react';
import { Form, Formik } from 'formik';
import MovieStepper from './MovieStepper';
import GeneralStep from './steps/GeneralStep';
import DirectorStep from './steps/DirectorStep';
import ActorsStep from './steps/ActorsStep';
import StudioStep from './steps/StudioStep';
import StorylineStep from './steps/StorylineStep';
import MovieFormActions from './MovieFormActions';
import styles from './MovieForm.module.sass';

const initialValues = {
  title: '',
  genre: '',
  year: '',
  poster: '',
  trailer: '',
  directorId: null,
  actorIds: [],
  studioId: null,
  description: '',
};

function MovieForm () {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'General' },
    { label: 'Director' },
    { label: 'Actors' },
    { label: 'Studio' },
    { label: 'Storyline' },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        //
        console.log(values);
      }}
      enableReinitialize
    >
      {({ resetForm }) => (
        <Form className={styles.form}>
          <MovieStepper step={step} steps={steps} />

          {step === 0 && <GeneralStep />}
          {step === 1 && <DirectorStep />}
          {step === 2 && <ActorsStep />}
          {step === 3 && <StudioStep />}
          {step === 4 && <StorylineStep />}

          <MovieFormActions
            step={step}
            stepsCount={steps.length}
            setStep={setStep}
            onReset={() => {
              resetForm();
              setStep(0);
            }}
          />
        </Form>
      )}
    </Formik>
  );
}

export default MovieForm;
