import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const data = window.initialData;
    return (
        <div>
            <p> {data}</p>
        </div>
    );
}

export default App
