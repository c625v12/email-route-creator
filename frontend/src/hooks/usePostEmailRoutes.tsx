import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const postEmailRoutes = async ({
  email,
  destination,
}: {
  email: string;
  destination: string;
}) => {
  const response = await axios.get(
    `http://localhost:8080/add-route/${email}/${destination}`
  );
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export const usePostEmailRoutes = () => {
  return useMutation({ mutationFn: postEmailRoutes });
};
