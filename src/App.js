import './App.scss';
import Container from 'react-bootstrap/Container'
import React from "react";
import Header from './components/header/Header';
import ProjectsList from './components/projects/ProjectsList';
import { AppProvider } from './AppContext'

function App() {
  return (
    <AppProvider>
      <Container>
        <Header />
        <ProjectsList />
      </Container>
    </AppProvider>
  );
}

export default App;
