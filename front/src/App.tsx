import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  useEffect(() => {
    axios.get('test/admin')
    .then((res) => {
      console.log(res);
      
    })
    .catch((err) => {
      console.log(err);
    })
  })
  return (
    <div>
      asd
    </div>
  );
}

export default App;
