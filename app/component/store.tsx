import ProductCard from "./ProductCard"

type StoreProps = {
  products: any[]
}

export default function Store({ products }: StoreProps) {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <p className="text-gray-500">No products yet.</p>
      ) : (
        products.map((product: any) => (
          <ProductCard
            key={product.id}
            title={product.title}
            brand={product.brand}
            price={parseFloat(product.price)}
            currency={product.currency}
            image={product.image_url}
            href={`/store/${product.slug}`}
          />
        ))
      )}
    </section>
  )
}