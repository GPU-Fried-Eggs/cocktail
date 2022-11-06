import './App.css';
import { Route, Routes } from 'react-router';
import Home from './routers/home';
import Display from './routers/display';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cocktail/:id" element={<Display />} />
          <Route path="*" element={<h1>Error</h1>} />
        </Routes>
      </div>
  );
}

export default App;
