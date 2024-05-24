import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect, useState } from 'react';

function App() {
    const [resultado, setResultado] = useState(null);

    
    useEffect(() => {
        fetch('http://localhost:80/Darrona2/DarronaPhp/index.php')
          .then(response => response.json())
          .then(data => setResultado(data)
           );
           
      }, []);
      console.table(resultado);
    return (
        <div>
            <p>hola</p>
            
            {resultado.map(resul => <div>{resul[' COL 1 ']}</div>)}
            {/* {JSON.stringify(resultado)} */}
        </div>
    );
}

export default App
