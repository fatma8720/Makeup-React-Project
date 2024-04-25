import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../Store/action';
import { Link } from "react-router-dom";

function Favorites() {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  return (
    <div className="container-fluid mt-10 products-container">
      <h1 className="title text-center mb-2 py-5">Favorites</h1>
      {favorites.length === 0 ? ( 
        <div className="text-center py-5">
          <h5>No favorites yet!</h5>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {favorites.map((product) => (
            <div className="col-md-3 mb-4 py-4" key={product.id}>
              <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 p-4 d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    {product.image_link && (
                      <img
                        src={product.image_link}
                        className="card-img-top"
                        alt={product.name}
                        height="275px"
                      />
                    )}
                  </div>
                  <div className="card-body text-center">
                    <div style={{ height: "40px" }}>
                      <h5 className="card-title mb-0">{product.name ? product.name.substring(0, 10) + "..." : "No Name"}</h5>
                    </div>
                    <p className="card-text lead">${product.price}</p>
                    <button
                      className="btn btn-danger mb-2"
                      onClick={() => handleRemoveFromFavorites(product.id)}
                    >
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
