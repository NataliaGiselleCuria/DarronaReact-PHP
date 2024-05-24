import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect, useState } from 'react';

function App() {
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
      fetch('http://localhost:8000/index.php')
         .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(resultado => setData(resultado))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

    return (
        <div>
            <p> {resultado}</p>
        </div>
    );
}

export default App
