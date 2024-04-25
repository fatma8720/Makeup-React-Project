import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../Store/action";
import { FaHeart } from "react-icons/fa";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(18);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(""); 
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);
  useEffect(() => {
    fetchData();
  }, [searchQuery, currentPage, priceFilter, categoryFilter]);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`https://makeup-api.herokuapp.com/api/v1/products.json`, {
        params: {
          brand: "nyx",
          product_category: categoryFilter, 
        },
      })
      .then((res) => {
        
        const filteredData = res.data.filter((product) => {
          return (
            product.price !== "0.0" &&
            product.api_featured_image &&
            !product.api_featured_image.includes("OpaqueResponseBlocking")
          );
        });
        console.log(filteredData); 
        setProducts(filteredData);
        let filtered = filterProducts(filteredData, searchQuery);
        filtered = filterByPrice(filtered, priceFilter);
        setFilteredProducts(filtered); 
        setTotalPages(Math.ceil(filtered.length / pageSize)); 
        setLoading(false);
      })
      .catch((err) => {
        setError(
          "An error occurred while fetching products. Please try again later."
        );
        setLoading(false);
      });
  };

  const filterProducts = (products, query) => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filterByPrice = (products, price) => {
    if (price === "") return products;
    const [minPrice, maxPrice] = price.split("-");
    return products.filter(
      (product) =>
        parseFloat(product.price) >= parseFloat(minPrice) &&
        parseFloat(product.price) <= parseFloat(maxPrice)
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handlePriceFilter = (e) => {
    setPriceFilter(e.target.value);
    setCurrentPage(1); 
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); 
  };

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product));
  };

  const handleRemoveFromFavorites = (product) => {
    dispatch(removeFromFavorites(product));
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <div className="container-fluid mt-10 products-container">
        <h1 className="title text-center mb-2 py-5">Our Products</h1>
        <div className="row">
          <div className="col-md-2">
            <div className="filters">
              <div className="mb-2">
                <span className="mr-2">
                  {" "}
                  <h5 style={{ padding: "10px 0 10px 0" , fontWeight:"bold"}}>Price</h5>
                </span>
                <div>
                  <input
                    type="radio"
                    value=""
                    checked={priceFilter === ""}
                    onChange={handlePriceFilter}
                  />
                  <label style={{ padding: "5px" }}>All Prices</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="0-10"
                    checked={priceFilter === "0-10"}
                    onChange={handlePriceFilter}
                  />
                  <label style={{ padding: "5px" }}>$0 - $10</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="10-20"
                    checked={priceFilter === "10-20"}
                    onChange={handlePriceFilter}
                  />
                  <label style={{ padding: "5px" }}>$10 - $20</label>
                </div>
              </div>
              <div>
                <span className="mr-2">
                  <h5 style={{ padding: "10px 0 10px 0", fontWeight:"bold"}}>Category</h5>
                </span>
                <div>
                  <input
                    type="radio"
                    value=""
                    checked={categoryFilter === ""}
                    onChange={handleCategoryFilter}
                  />
                  <label style={{ padding: "5px" }}>All Categories</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="pencil"
                    checked={categoryFilter === "pencil"}
                    onChange={handleCategoryFilter}
                  />
                  <label style={{ padding: "5px" }}>Pencil</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="lipstick"
                    checked={categoryFilter === "lipstick"}
                    onChange={handleCategoryFilter}
                  />
                  <label style={{ padding: "5px" }}>Lipstick</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="liquid"
                    checked={categoryFilter === "liquid"}
                    onChange={handleCategoryFilter}
                  />
                  <label style={{ padding: "5px" }}>Liquid</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="powder"
                    checked={categoryFilter === "powder"}
                    onChange={handleCategoryFilter}
                  />
                  <label style={{ padding: "5px" }}>Powder</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="gel"
                    checked={categoryFilter === "gel"}
                    onChange={handleCategoryFilter}
                  />
                  <label style={{ padding: "5px" }}>Gel</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="cream"
                    checked={categoryFilter === "cream"}
                    onChange={handleCategoryFilter}
                  />
                  <label style={{ padding: "5px" }}>Cream</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="concealer"
                    checked={categoryFilter === "concealer"}
                    onChange={handleCategoryFilter}
                  />
                  <label style={{ padding: "5px" }}>Concealer</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <form onSubmit={(e) => e.preventDefault()} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search products..."
                className="form-control"
                id="search_bar"
              />
            </form>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row row-cols-1 row-cols-md-4 g-md-4 g-sm-3">
              {currentProducts.map((product) => (
                <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
                  <div className="card position-relative h-100 p-4 d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      {product.api_featured_image && (
                        <img
                          src={product.api_featured_image}
                          className="card-img-top"
                          alt={product.name}
                          height="275px"
                        />
                      )}
                    </div>
                    <div className="card-body text-center">
                      <div style={{ height: "40px" }}>
                        <h5 className="card-title mb-0">
                          {product.name.substring(0, 7)}...
                        </h5>
                      </div>
                      <p className="card-text lead">${product.price}</p>
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-dark mb-2"
                      >
                        View Details
                      </Link>
                      {favorites.some((item) => item.id === product.id) ? (
                        <button
                          className="btn btn-outlined-dark position-absolute top-0 end-0 p-2 py-2"
                          onClick={() => handleRemoveFromFavorites(product.id)}
                        >
                          <FaHeart
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "1.5rem" }}
                          />
                        </button>
                      ) : (
                        <button
                          className="btn btn-outlined-dark position-absolute top-0 end-0 p-2"
                          onClick={() => handleAddToFavorites(product)}
                        >
                          <FaHeart style={{ fontSize: "1.5rem" }} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    className={`page-item ${
                      index + 1 === currentPage ? "active" : ""
                    }`}
                    key={index}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
