// bugSolution.js

export async function getServerSideProps(context) {
  const { params } = context;
  const { productId } = params;

  if (!productId) {
    return {
      notFound: true,
    };
  }

  try {
    const res = await fetch(`https://api.example.com/products/${productId}`);
    const data = await res.json();

    if (!data || !data.product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product: data.product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
}

export default function Product({ product }) {
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
