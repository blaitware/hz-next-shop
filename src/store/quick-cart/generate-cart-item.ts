import isEmpty from "lodash/isEmpty";
interface Item {
  _id: string | number;
  name: string;
  slug: string;
  image: string;
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}
interface Variation {
  _id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item, variation: Variation) {
  const { _id, name, slug, image, price, sale_price, quantity, unit } = item;
  if (!isEmpty(variation)) {
    return {
      _id: `${_id}.${variation._id}`,
      productId: _id,
      name: `${name} - ${variation.title}`,
      slug,
      unit,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: image,
      variationId: variation._id,
    };
  }
  return {
    _id,
    name,
    slug,
    unit,
    image: image,
    stock: quantity,
    price: sale_price ? sale_price : price,
  };
}
