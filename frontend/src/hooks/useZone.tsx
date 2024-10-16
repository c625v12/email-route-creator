import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { environment } from '../enviroments/environment';

const fetchZone = async (): Promise<string> => {
  const apiUrl = environment.apiUrl;
  const { data } = await axios.get<string>(`${apiUrl}/zone`);
  return data;
};

export const useZone = () => {
  return useQuery<string>({
    queryKey: ['fetchZone'],
    queryFn: fetchZone,
  });
};
