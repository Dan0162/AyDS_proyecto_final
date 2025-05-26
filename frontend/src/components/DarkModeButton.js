import React, { useEffect, useState } from 'react';

function DarkModeButton() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [dark]);

  return (
    <button
      className={`btn btn-sm ${dark ? 'btn-light' : 'btn-dark'} ms-2`}
      onClick={() => setDark((d) => !d)}
      aria-label="Cambiar modo oscuro"
      style={{ minWidth: 40 }}
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}

export default DarkModeButton;