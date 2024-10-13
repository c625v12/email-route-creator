import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDestinationEmails = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>(
    `http://localhost:8080/destination-emails`
  );
  return data;
};

// Custom hook to use in components
export const useDestinationEmails = () => {
  return useQuery<string[]>({
    queryKey: ['destinationEmails'],
    queryFn: fetchDestinationEmails,
  });
};
