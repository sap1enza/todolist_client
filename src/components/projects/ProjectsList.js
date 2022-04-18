import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Project from './Project';

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
    this.loadProjects = this.loadProjects.bind(this);
  }
  async loadProjects() {
    let response = await fetch(`http://localhost:3001/projects`);
    const projects = await response.json();
    this.setState({ projects: projects });
  }
  componentDidMount() {
    this.loadProjects();
  }
  render() {
    return (
      <Row className="pt-5">
        {this.state.projects.map((project, _index) => {
          return <Col sm={5} className="project-box mb-5" key={project.id}>
            <Project id={project.id} name={project.name} loadProjects={this.loadProjects} />
          </Col>
        })}
      </Row>
    );
  }
}

export default ProjectsList;
