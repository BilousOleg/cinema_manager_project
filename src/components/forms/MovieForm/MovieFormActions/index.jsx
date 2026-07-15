import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CheckIcon from '@mui/icons-material/Check';
import styles from './MovieFormActions.module.sass';

function MovieFormActions ({ step, stepsCount, setStep, onReset }) {
  const isFirstStep = step === 0;
  const isLastStep = step === stepsCount - 1;

  const handlePrevious = () => {
    if (!isFirstStep) {
      setStep(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setStep(prev => prev + 1);
    }
  };

  return (
    <div className={styles.actionsBlock}>
      <button
        type='button'
        className={styles.returnBtn}
        disabled={isFirstStep}
        onClick={handlePrevious}
      >
        <ArrowBackIcon />
        <span>RETURN</span>
      </button>

      {isLastStep ? (
        <button type='submit' className={styles.submitBtn}>
          <CheckIcon />
          <span>SAVE</span>
        </button>
      ) : (
        <button type='button' className={styles.nextBtn} onClick={handleNext}>
          <ArrowForwardIcon />
          <span>NEXT</span>
        </button>
      )}

      <button type='button' className={styles.resetBtn} onClick={onReset}>
        <ClearAllIcon />
        <span>RESET</span>
      </button>
    </div>
  );
}

export default MovieFormActions;
