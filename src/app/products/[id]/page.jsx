import ProductForm from "@/components/ProductForm";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

const Product = async ({ params }) => {
  const data = await getData(params.id);

  return (
    <>
      <ProductForm {...data} />
    </>
  );
};

export default Product;
