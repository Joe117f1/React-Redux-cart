import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  { id: 'p1', price: 16, title: 'Irish Cook book', description: 'secret manual' },
  { id: 'p2', price: 12.99, title: 'Expensive apple', description: 'Super apple' },
  { id: 'p3', price: 68, title: 'Old sailor pipe', description: 'It has half a million miles logged' }
];

const Products = () => {
  return (
    <section className={classes.products}>
      <div className={classes.title}>
        <h2>Buy your favorite products</h2>
        <p >With the help of Redux, your selected items will be wait
          for you in firebase for your next login</p>
      </div>
      <ul>
        {DUMMY_PRODUCTS.map(product => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />);
        })}
      </ul>
    </section>
  );
};

export default Products;
