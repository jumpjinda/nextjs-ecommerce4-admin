import _ from "lodash";
import Link from "next/link";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="flex">
        {pages.map((page) => (
          <Link
            href={"#"}
            key={page}
            onClick={() => onPageChange(page)}
          >
            <li
              className={`border px-3 py-2 ${
                page === currentPage ? "bg-blue-500" : ""
              }`}
            >
              {page}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
