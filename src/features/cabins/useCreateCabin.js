import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiCreateEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabin, id }) => apiCreateEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating };
}
