"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ConfirmDeletePage = ({ params }) => {
  const [product, setProduct] = useState({});
  const router = useRouter();
  useEffect(() => {
    async function getData(id) {
      const res = await fetch(`/api/products/${id}`, {
        method: "GET",
      });
      setProduct(await res.json());
    }
    getData(params.id);
  }, []);

  async function deleteProduct(id) {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    router.push("/products");
  }

  return (
    <div className="flex flex-col text-center">
      <h1>Are you sure to delete " {product.title} " ?</h1>
      <div className="flex justify-center gap-3 mt-5">
        <button
          className="bg-red-500 px-5 py-2 rounded-md"
          onClick={() => deleteProduct(product._id)}
        >
          Delete
        </button>
        <Link href={"/products"}>
          <button
            type="button"
            className="bg-blue-500 px-5 py-2 rounded-md"
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmDeletePage;
