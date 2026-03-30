type ProductCardProps = {
  category: string;
  name: string;
  description: string;
  image: string;
  price: string;
  rating: number;
};

export function ProductCard({ category, name, description, image, price, rating }: ProductCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:min-h-115">
      <div
        role="img"
        aria-label={name}
        className="mb-6 h-56 rounded-xl bg-brand-secondary bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <p className="text-lg font-semibold tracking-tight text-zinc-700">{category}</p>
      <p className="mt-3 text-xs text-zinc-500">★ {rating.toFixed(1)}</p>
      <h3 className="mt-1 text-base font-semibold text-zinc-800">{name}</h3>
      <p className="mt-1 text-sm text-zinc-600">{description}</p>
      <p className="mt-4 text-sm font-semibold text-zinc-700">{price}</p>
    </article>
  );
}