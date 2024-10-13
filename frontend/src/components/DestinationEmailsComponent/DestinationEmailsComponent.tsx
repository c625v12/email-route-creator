// src/components/DestinationEmailsComponent.tsx
import React from 'react';
import { useDestinationEmails } from '../../hooks/useDestinationEmails';
import Select from '../select/select';
import { DestinationEmailContent } from './DestinationEmailsComponent.content';

const DestinationEmailsComponent: React.FC = () => {
  const content = DestinationEmailContent;
  const { data, error, isLoading } = useDestinationEmails();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message}</div>;

  return <Select label={content.destinationEmail} options={data} />;
};

export default DestinationEmailsComponent;
