import './App.css';
import { Header } from './components/Header/Index';
import { Main } from './components/Main';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
}

export default App;
