import { useModalAction } from '@components/ui/modal/modal.context';
import { Address } from '@framework/types';
import AddressCard from '@components/address/address-card';
import { AddressHeader } from '@components/address/address-header';
import { useTranslation } from 'next-i18next';
import { AddressType } from '@framework/utils/constants';

interface AddressesProps {
  addresses: Address[] | undefined;
  label: string;
  className?: string;
  userId: string;
}

export const ProfileAddressGrid: React.FC<AddressesProps> = ({
  addresses,
  label,
  className,
  userId,
}) => {
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');

  //TODO: no address found
  function onAdd() {
    openModal('ADD_OR_UPDATE_ADDRESS', {
      customerId: userId,
      type: AddressType.Billing,
    });
  }
  return (
    <div className={className}>
      <AddressHeader onAdd={onAdd} count={false} label={label} />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {addresses && addresses?.length ? (
          <>
            {addresses?.map((address) => (
              <AddressCard
                checked={false}
                address={address}
                userId={userId}
                key={address._id}
              />
            ))}
          </>
        ) : (
          <span className="relative px-5 py-6 text-base text-left bg-gray-100 rounded border border-border-200">
            {t('text-no-address')}
          </span>
        )}
      </div>
    </div>
  );
};
export default ProfileAddressGrid;
