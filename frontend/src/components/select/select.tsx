import styles from './select.module.scss';
import { Dropdown } from 'primereact/dropdown';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../validation/validationSchema';

interface SelectProps {
  label: string;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ label, options }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  const handleSelect = (value: string) => {
    setValue('selection', value);
  };
  return (
    <div className={styles.select}>
      <div className={styles.inputs}>
        <label>{label}</label>
        <Dropdown
          id="destination-email-dropdown"
          placeholder="Select a Destination Email"
          options={options}
          {...register('selection')}
          invalid={!!errors.selection}
          onChange={(e) => handleSelect(e.value)}
          value={watch('selection')}
        />
        {errors.selection && (
          <small className="p-error">{errors.selection.message}</small>
        )}
      </div>
    </div>
  );
};

export default Select;
