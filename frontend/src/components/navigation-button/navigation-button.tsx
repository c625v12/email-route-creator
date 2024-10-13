import { usePostEmailRoutes } from '../../hooks/usePostEmailRoutes';
import styles from './navigation-button.module.scss';
import { Button } from 'primereact/button';
import { useAtom } from 'jotai';
import { isLoadingAtom, newEmailRouteAtom } from '../../jotai/atoms';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../validation/validationSchema';
import { useEmailRoutes } from '../../hooks/useEmailRoutes';

interface NavigationButtonProps {
  label: string;
}

function copyToClipboard(email: string) {
  navigator.clipboard.writeText(email);
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ label }) => {
  const [loading, setLoading] = useAtom(isLoadingAtom);
  const [newEmail, setNewEmail] = useAtom(newEmailRouteAtom);
  const mutation = usePostEmailRoutes();
  const getEmails = useEmailRoutes();
  const { handleSubmit, getValues, reset } = useFormContext<FormValues>();

  const formValues = getValues();

  const handleClick = () => {
    setLoading(true);
    const email = formValues.input;
    const destination = formValues.selection;

    if (email && destination) {
      mutation.mutate(
        { email, destination },
        {
          onSuccess: async () => {
            const emails = await getEmails.refetch();
            if (emails.data) {
              setNewEmail(emails.data[0]);
              reset();
              setLoading(false);
            }
          },
        }
      );
    }
  };
  return (
    <>
      <div className={styles.submit}>
        <Button
          role="button"
          icon="pi pi-check"
          type="submit"
          label={label}
          onClick={handleSubmit(handleClick)}
          loading={loading}
        />
      </div>
      {newEmail && (
        <div className={styles.newEmail}>
          <span className={styles.emailTitle}>{newEmail}</span>
          <Button
            name="copy"
            role="button"
            icon="pi pi-copy"
            rounded
            outlined
            aria-label="Copy"
            onClick={() => copyToClipboard(newEmail)}
          />
        </div>
      )}
    </>
  );
};

export default NavigationButton;
