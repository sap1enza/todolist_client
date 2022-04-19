import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Project from './Project';
import AppContext from './../../AppContext'
import { getProjects } from './../../actions/getProjects'

class ProjectsList extends Component {
  static contextType = AppContext

  async loadProjects() {
    const projects = await getProjects();
    this.context.setProjects(projects);
  }
  componentDidMount() {
    this.loadProjects();
  }
  get projects() {
    return this.context.projects;
  }
  render() {
    return (
      <Row className="pt-5">
        {this.projects.map((project, _index) => {
          return <Col sm={5} className="project-box mb-5" key={project.id}>
            <Project id={project.id} name={project.name} />
          </Col>
        })}
      </Row>
    );
  }
}

export default ProjectsList;
