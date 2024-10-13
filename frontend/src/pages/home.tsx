import DestinationEmailsComponent from '../components/DestinationEmailsComponent/DestinationEmailsComponent';
import Header from '../components/header/header';
import NavigationButton from '../components/navigation-button/navigation-button';
import { HomeContent } from '../content/home.content';
import styles from './home.module.scss';
import { Divider } from 'primereact/divider';
import DomainSection from '../components/domainSection/domainSection';
import EmailInput from '../components/EmailInput/EmailInput';
import {
  FormValues,
  inputValidationSchema,
} from '../validation/validationSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Home = () => {
  const content = HomeContent;
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(inputValidationSchema),
  });

  return (
    <div className={styles.container}>
      <FormProvider {...formMethods}>
        <form>
          <Header content={content} />
          <Divider />
          <DomainSection />
          <Divider />
          <div className={styles.margin}>
            <EmailInput />
          </div>
          <div className={styles.margin}>
            <DestinationEmailsComponent />
          </div>
          <NavigationButton label="Submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default Home;
