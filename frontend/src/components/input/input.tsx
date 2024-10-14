import { FocusEventHandler } from 'react';
import styles from './input.module.scss';
import { InputText } from 'primereact/inputtext';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../validation/validationSchema';

interface InputProps {
  label: string;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
}

const Input: React.FC<InputProps> = ({ label, onBlur, onClick }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className={styles.input}>
      <div className={styles.inputs}>
        <label>{label}</label>
        <InputText
          id="input"
          className={styles.input}
          {...register('input')}
          onBlur={onBlur}
          onClick={onClick}
          invalid={!!errors.input}
          role="button"
        />

        {errors.input && (
          <small className="p-error">{errors.input.message}</small>
        )}
      </div>
    </div>
  );
};

export default Input;
