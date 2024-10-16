import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { environment } from '../enviroments/environment';

const postEmailRoutes = async ({
  email,
  destination,
}: {
  email: string;
  destination: string;
}) => {
  const apiUrl = environment.apiUrl;
  const response = await axios.get(
    `${apiUrl}/add-route/${email}/${destination}`
  );
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export const usePostEmailRoutes = () => {
  return useMutation({ mutationFn: postEmailRoutes });
};
