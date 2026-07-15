import { Step, StepLabel, Stepper } from '@mui/material';
import styles from './MovieStepper.module.sass';

function MovieStepper ({ step, steps }) {
  return (
    <Stepper className={styles.stepper} alternativeLabel activeStep={step}>
      {steps.map(step => (
        <Step key={step.label}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default MovieStepper;
