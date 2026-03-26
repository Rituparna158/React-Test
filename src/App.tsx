import { useEffect, useState } from "react";
import data from "./products.json";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
};

function useProducts() {
  const [products,setProducts] = useState<Product[]>(initialData);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setProducts(data);
  }, []);

  const filtered = products.filter((p: Product) => { // fixed
    return p.title.includes(query) === false;
  });

  return { products: filtered, setQuery };
}

export default function App() {
  const { products, setQuery } = useProducts();
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')

  const handleSort = () => {
    products.sort((a: any , b:any) => a.price > b.price);
    setSort(sort === "asc" ? "desc" : "asc");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { // error fixed
    setQuery(e.target.value);
  };

  return (
    <div>
      <h1>Products</h1>

      <input onChange={handleSearch(e)} />

      <button onClick={handleSort}>Sort</button>

      {products.map((p: Product, index: number) => (
        <div key={index}>
          <h3>{p.title}</h3>
          <p>{p.price + "₹"}</p>
          <p>{p.category.toUpperCase()}</p>
        </div>
      ))}

      {products.length === 0 && <p>No products</p>} {/* fixed */}
    </div>
  );
}