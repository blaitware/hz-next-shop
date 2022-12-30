import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import AddressForm from '@components/address/address-form';
import { AddressType } from '@framework/utils/constants';
import { useAddCustomerAddressMutation, useUpdateCustomerAddressMutation } from './address.query';

type FormValues = {
  __typename?: string;
  title: string;
  type: AddressType;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
};

const CreateOrUpdateAddressForm = () => {
  const {
    data: { customerId, address },
  } = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: addAddress } = useAddCustomerAddressMutation();
  const { mutate: updateAddress } = useUpdateCustomerAddressMutation();

  function onSubmit(values: FormValues) {
    const formattedInput = {
      _id: address?._id,
      customer: customerId,
      title: values.title,
      type: values.type,
      address: {
        ...(address?._id && { _id: address._id }),
        ...values.address,
      },
    };
    
    if (address?._id) {      
      updateAddress({ ...formattedInput });
    } else {
      addAddress(formattedInput);
    }
    closeModal();
  }
  return <AddressForm onSubmit={onSubmit} />;
};

export default CreateOrUpdateAddressForm;
