import {  useState } from "react";
import data from "./products.json";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
};

function useProducts() {
  //const [products,setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');

  

  const filtered = data.filter((p: Product) => { // fixed
    return p.title.toLowerCase().includes(query.toLowerCase());//fixed
  });

  return { products: filtered, setQuery };
}

export default function App() {
  const { products, setQuery } = useProducts();
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')

  const handleSort = () => {
    setSort(sort === "asc" ? "desc" : "asc"); //fixed
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { // error fixed
    setQuery(e.target.value);
  };

  const sortedProdcts = [...products].sort((a,b)=>
  sort === "asc"? a.price - b.price : b.price - a.price); //fixed

  return (
    <div>
      <h1>Products</h1>

      <input onChange={handleSearch} /> {/* fixed */}

      <button onClick={handleSort}>Sort ({sort})</button> {/* fixed */}
      {sortedProdcts.map((p) => ( //fixed
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.price + "₹"}</p>
          <p>{p.category.toUpperCase()}</p>
        </div>
      ))}

      {products.length === 0 && <p>No products</p>} {/* fixed */}
    </div>
  );
}

