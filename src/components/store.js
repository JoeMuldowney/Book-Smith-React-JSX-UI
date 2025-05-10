import React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from './toolbar'; // Import the Toolbar component

function Store() {
  const navigate = useNavigate();

  const categoryClick = (genre) => {
    navigate(`/category/${genre}`);
  };

  return (
    <div>
      {/* Toolbar */}
      <Toolbar />

      {/* Store Content */}
      <div className="container mt-5 pt-5"> {/* mt-5 pt-5 ensures space below the fixed navbar */}
        {/* Header Section */}
        <div className="text-center my-4">
          <h1>Book Smith</h1>
          <h5>Browse some popular categories</h5>
        </div>

        {/* Category Section */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 text-center">
          {[
            { label: 'Sci-Fi', genre: 'Sci-Fi' },
            { label: 'Mystery', genre: 'Mystery' },
            { label: 'Thriller', genre: 'Thriller' },
            { label: 'Fantasy', genre: 'Fantasy' },
          ].map((category) => (
            <div key={category.label} className="col">
              <div className="card h-100 shadow-sm border-light">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{category.label}</h5>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => categoryClick(category.genre)}
                  >
                    Browse
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;
