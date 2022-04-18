import './App.scss';
import Container from 'react-bootstrap/Container'
import React, { useState } from "react";
import Header from './components/header/Header';
import ProjectsList from './components/projects/ProjectsList';

function App() {
  return (
    <div>
      <Container>
        <Header />
        <ProjectsList />
      </Container>
    </div>
  );
}

export default App;
