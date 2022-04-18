import './App.scss';
import Container from 'react-bootstrap/Container'
import React, { Component } from "react";
import Header from './components/header/Header';
import ProjectsList from './components/projects/ProjectsList';

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header />
          <ProjectsList />
        </Container>
      </div>
    );
  }
}

export default App;
