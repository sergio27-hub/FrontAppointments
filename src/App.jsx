import './App.css';
import logo from './assets/images/2.jpg';

function App() {
  return (
    <body>
      <div className='Image-page'>
        <img src={logo} alt="" className='App-logo' />
      </div>
      <header>
        <h1>React App</h1>
      </header>
    </body>
  );
}

export default App;
