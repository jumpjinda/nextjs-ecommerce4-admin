"use client";

import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import AddOrDeleteProducts from "@/utils/AddOrDeleteProducts";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const getData = async () => {
    const data = await fetch("/api/products", {
      method: "GET",
    });
    setProducts(await data.json());
  };

  useEffect(() => {
    getData();
  }, []);

  function deleteProduct(product) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${product.title}" product?`,
      icon: "error",
      confirmButtonText: "Yes, Delete!",
      confirmButtonColor: "#d55",
      showCancelButton: true,
      cancelButtonText: "No",
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const id = product._id;
        await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        getData();
      }
    });
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginateProducts = paginate(products, currentPage, pageSize);

  return (
    <div className="">
      <h1 className="mt-2">Products</h1>
      <table className="w-full mt-2">
        <thead className="text-center">
          <tr>
            <th>TITLE</th>
            <th>BRAND</th>
            <th>CATEGORY</th>
            <th>PRICE (USD)</th>
          </tr>
        </thead>
        <tbody>
          {paginateProducts.map((product, index) => (
            <tr key={product._id}>
              <td className="relative">
                <Link
                  href={`/products/${product._id}`}
                  className="pr-20"
                >
                  {product.title}
                </Link>
                <button
                  className="absolute right-0 bg-red-500 px-3 rounded-md"
                  onClick={() => deleteProduct(product)}
                >
                  Delete
                </button>
              </td>
              <td className="text-center">{product.brand}</td>
              <td className="text-center">{product.category}</td>
              <td className="text-end">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 flex justify-between">
        <Pagination
          items={products.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
        <AddOrDeleteProducts />
      </div>
    </div>
  );
};

export default ProductsPage;
