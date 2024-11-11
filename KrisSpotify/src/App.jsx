import { useState } from 'react'

import Nav from './components/Nav';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav />
      <div className="card">
          <h2>Search by lyrics</h2>
          <textarea name="searchbar" id="searchbar"></textarea>
          <h3>Sort results using your liked songs?</h3>
          <button className='btn'>Yes</button>
          <button className='btn'>No</button>
      </div>
    </>
  )
}

export default App;
