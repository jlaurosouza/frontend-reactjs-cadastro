import React from 'react';
import Header from './components/Header/index';
import Home from './pages/home'

import Routes from './routes'

function App() {
  return (
    <>
      <Header title="Projeto Frontend - ReactJS - Cadastro"/>
      <Routes />
    </>
  );
}

export default App;
