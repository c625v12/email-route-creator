import Input from '../input/input';
import { useZone } from '../../hooks/useZone';
import { useEmailRoutes } from '../../hooks/useEmailRoutes';
import { emailFormatter, handleControlClick } from '../../util/utility';
import { useAtom } from 'jotai';
import { emailRoutesAtom } from '../../jotai/atoms';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../validation/validationSchema';

function setCompleteEmail(control: string, domain: string): string | undefined {
  if (control !== null && control !== undefined && control !== '') {
    return emailFormatter(control, domain);
  }
}

const EmailInput: React.FC = () => {
  const { getValues, setValue, trigger } = useFormContext<FormValues>();
  const { data } = useZone();
  const { data: emails } = useEmailRoutes();
  const [, setEmailRoutes] = useAtom<string[] | undefined>(emailRoutesAtom);
  setEmailRoutes(emails);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    let formValues = getValues();
    trigger('input');
    if (formValues.input && data && emails) {
      setValue('input', setCompleteEmail(formValues.input, data) || '');
      formValues = getValues();
      trigger('input');
    }
  };

  const handleClick:
    | React.MouseEventHandler<HTMLInputElement>
    | undefined = () => {
    const formValues = getValues();
    if (formValues.input && data) {
      setValue('input', handleControlClick(formValues.input, data) || '');
    }
  };

  return (
    <Input label="New Email Prefix" onBlur={handleBlur} onClick={handleClick} />
  );
};

export default EmailInput;
