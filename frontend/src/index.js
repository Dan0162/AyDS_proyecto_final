import React from 'react'; // Importa React para poder usar JSX y componentes
import ReactDOM from 'react-dom/client'; // Importa el módulo ReactDOM para renderizar la app en el DOM (versión moderna con createRoot)
import App from './App'; // Importa el componente principal App
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap desde su paquete npm

// Crea el punto de entrada (root) vinculado al <div id="root"> en index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza el componente App dentro del div con id="root"
root.render(<App />);
