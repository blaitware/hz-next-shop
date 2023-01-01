import { Table } from '@components/ui/table';
import usePrice from '@lib/use-price';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@lib/locals';
import { useMemo } from 'react';
import { Image } from '@components/ui/image';
import { productPlaceholder } from '@lib/placeholders';

const OrderItemList = (_: any, record: any) => {
  const { price } = usePrice({
    amount: record.unit_price,
  });
  let name = record.product_id.name;
  if (record?.variation_option_id) {
    const variationTitle = record?.product_id.variation_options?.find(
      (vo: any) => vo?._id === record?.variation_option_id
    )['title'];
    name = `${name} - ${variationTitle}`;
  }
  return (
    <div className="flex items-center">
      <div className="w-16 h-16 flex flex-shrink-0 rounded overflow-hidden relative">
        <Image
          src={record.product_id.image ?? productPlaceholder}
          alt={name}
          className="w-full h-full object-cover"
          layout="fill"
        />
      </div>

      <div className="flex flex-col ms-4 overflow-hidden">
        <div className="flex mb-1">
          <span className="text-sm text-body truncate inline-block overflow-hidden">
            {name} x&nbsp;
          </span>
          <span className="text-sm text-heading font-semibold truncate inline-block overflow-hidden">
            {record.unit}
          </span>
        </div>
        <span className="text-sm text-accent font-semibold mb-1 truncate inline-block overflow-hidden">
          {price}
        </span>
      </div>
    </div>
  );
};

export const OrderItems = ({ products }: { products: any }) => {
  const { t } = useTranslation('common');
  const { alignLeft, alignRight } = useIsRTL();

  const orderTableColumns = useMemo(
    () => [
      {
        title: <span className="ps-20">{t('text-item')}</span>,
        dataIndex: '',
        key: 'items',
        align: alignLeft,
        width: 250,
        ellipsis: true,
        render: OrderItemList,
      },
      {
        title: t('text-quantity'),
        dataIndex: 'order_quantity',
        key: 'order_quantity',
        align: 'center',
        width: 100,
        render: function renderQuantity(order_quantity: any) {
          return <p className="text-base">{order_quantity}</p>;
        },
      },
      {
        title: t('text-price'),
        dataIndex: 'subtotal',
        key: 'subtotal',
        align: alignRight,
        width: 100,
        render: function RenderPrice(subtotal: any) {
          const { price } = usePrice({
            amount: subtotal,
          });
          return <p>{price}</p>;
        },
      },
    ],
    [alignLeft, alignRight, t]
  );

  return (
    <Table
      //@ts-ignore
      columns={orderTableColumns}
      data={products}
      rowKey={(record: any) =>
        record.variation_option_id
          ? record.variation_option_id
          : record.createdAt
      }
      className="orderDetailsTable w-full"
      scroll={{ x: 350, y: 500 }}
    />
  );
};
