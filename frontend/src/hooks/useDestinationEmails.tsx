import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { environment } from '../enviroments/environment';

const fetchDestinationEmails = async (): Promise<string[]> => {
  const apiUrl = environment.apiUrl;
  const { data } = await axios.get<string[]>(`${apiUrl}/destination-emails`);
  return data;
};

// Custom hook to use in components
export const useDestinationEmails = () => {
  return useQuery<string[]>({
    queryKey: ['destinationEmails'],
    queryFn: fetchDestinationEmails,
  });
};
