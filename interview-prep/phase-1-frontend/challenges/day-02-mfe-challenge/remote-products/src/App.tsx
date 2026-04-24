import './App.css'
import ProductsSearch from './components/ProductsSearch'

function App() {
  return (
    <div className="remote-root">
      <header>
        <h1>Remote: Products Domain</h1>
        <p>This app exposes ProductsSearch through Module Federation.</p>
      </header>
      <ProductsSearch />
    </div>
  )
}

export default App
