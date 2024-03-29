import ConfirmationCard from '@components/ui/cards/confirmation';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useDeleteAddressMutation } from '@framework/address/address.query';

const AddressDeleteView = () => {
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: deleteAddressById, isLoading } = useDeleteAddressMutation();

  console.log('state', data);
  
  function handleDelete() {
    deleteAddressById(data?.addressId);
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={isLoading}
    />
  );
};

export default AddressDeleteView;
