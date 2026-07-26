import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id, editImage }) => apiEditCabin(newCabinData, id, editImage),
    onSuccess: () => {
      toast.success('Cabin successfully edited');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
}
