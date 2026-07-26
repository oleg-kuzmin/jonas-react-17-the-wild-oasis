import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { apiDeleteCabin } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: ({ id, image }) => apiDeleteCabin(id, image),
    onSuccess: () => {
      toast.success('Cabin successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: err => toast.error(err),
  });

  return { deleteCabin, isDeleting };
}
