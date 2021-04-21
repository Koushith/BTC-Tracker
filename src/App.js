import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';

import './styles/App.css';

function App() {
  return (
    <>
      <div class='max-w-7xl mx-auto'>
        <Header />
        <Container />
        <Footer />
      </div>
    </>
  );
}

export default App;
