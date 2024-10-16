import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { environment } from '../enviroments/environment';

const fetchEmails = async (): Promise<string[]> => {
  const apiUrl = environment.apiUrl;
  const { data } = await axios.get<string[]>(`${apiUrl}/emails`);
  return data;
};

export const useEmailRoutes = () => {
  return useQuery<string[]>({
    queryKey: ['fetchEmails'],
    queryFn: fetchEmails,
  });
};
