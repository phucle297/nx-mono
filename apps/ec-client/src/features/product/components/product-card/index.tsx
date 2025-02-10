import { IProduct } from '../../types';
import classes from './styles.module.css';

type TProductCardProps = {
  product: IProduct;
};

export const ProductCard = ({ product }: TProductCardProps) => {
  const onClickProduct = (id: number) => {
    console.log('Product id:', id);
    // navigate to product detail page
  };

  return (
    <div
      className={classes['product-card']}
      onClick={() => onClickProduct(product.id)}
    >
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
};
