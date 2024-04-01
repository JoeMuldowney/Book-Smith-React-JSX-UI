import coverphoto from './images/cover.jpg';
import './index.css';



function App() {
  return (
    <div className="container">
      
        <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay">
        <p>
         Welcome to Virtual Library!
         <h3>A place to buy, rent, and leave reviews on books!</h3>
        </p>       
      </div>
      <div className="tool-bar">
        <p>Login</p>
      </div>
    </div>
  );
}

export default App;
