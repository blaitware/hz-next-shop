import Link from '@components/ui/link';
import { Image } from '@components/ui/image';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ROUTES } from '@lib/routes';
import { Product } from '@framework/types';
import { productPlaceholder } from '@lib/placeholders';

type RadonProps = {
  product: Product;
  className?: string;
};

const Radon: React.FC<RadonProps> = ({ product, className }) => {
  const { t } = useTranslation('common');
  const { name, slug, image } = product ?? {};

  return (
    <Link href={`${ROUTES.PRODUCT}/${slug}`}>
      <article
        className={cn(
          'product-card cart-type-radon rounded h-full border border-border-200 bg-light overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-sm',
          className
        )}
      >
        <div className="relative flex items-center justify-center w-auto h-48 sm:h-64">
          <span className="sr-only">{t('text-product-image')}</span>
          <Image
            src={image ?? productPlaceholder}
            alt={name}
            layout="fill"
            objectFit="contain"
            className="product-image"
          />
        </div>
        {/* End of product image */}

        <header className="p-3 md:p-6 text-center">
          <h3 className="text-sm md:text-base text-heading font-semibold truncate mb-2">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-body">
            {/* {t("text-by")} {author} */}
          </p>
        </header>
        {/* End of product info */}
      </article>
    </Link>
  );
};

export default Radon;
