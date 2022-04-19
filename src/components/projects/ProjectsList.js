import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Project from './Project';
import AppContext from './../../AppContext'
import { getProjects } from './../../actions/getProjects'
import { DragDropContext } from "react-beautiful-dnd";

class ProjectsList extends Component {
  static contextType = AppContext

  onDragEnd(result) {
    const { _source, destination } = result;

      if (!destination) {
        return;
      }

      const taskId = result.draggableId;
      const splitDestination = destination.droppableId.split('-');
      const DestinationStatus = splitDestination[0];
      const DestinationProjectId = splitDestination[1];

      fetch(`http://localhost:3001/tasks/${taskId}`,
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            task: { status: DestinationStatus, project_id: DestinationProjectId }
          })
        }
      )

      console.log(this.context);
  }

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
        <DragDropContext onDragEnd={(r) => {
          this.onDragEnd(r);
          this.loadProjects();
        }}>
          {this.projects.map((project, _index) => {
            return <Col sm={5} className="project-box mb-5" key={project.id}>
              <Project id={project.id} name={project.name} />
            </Col>
          })}
        </DragDropContext>
      </Row>
    );
  }
}

export default ProjectsList;
