import React from 'react';
import coverphoto from '../images/store.jpeg';
import Layout from './layout';
import { useNavigate} from 'react-router-dom';

function Store(){
    const navigate = useNavigate()

    const categoryClick = (genre) => {        
        navigate(`/views/${genre}`);
    }

    return (
        <Layout>
          <div className="container">
            <img src={coverphoto} className="cover-image" alt="Cover" />
            <div className="text-overlay-store">
              <h1>Virtual Library Book Catalog</h1>
              <h5>Browse some popular categories</h5>
            </div>

            <div className="text-overlay-categories">
              {[                
                { label: 'Sci-Fi', genre: 'Sci-Fi' },
                { label: 'Mystery', genre: 'Mystery' },
                { label: 'Thriller', genre: 'Thriller' },
                { label: 'Fantasy', genre: 'Fantasy' },
              ].map((category) => (
                <div key={category.label} className="category-card">
                  <label>{category.label}</label>
                  <button onClick={() => categoryClick(category.genre)}>Browse</button>
                </div>
              ))}
            </div>
          </div>
        </Layout>
      );
    }
    
    export default Store;