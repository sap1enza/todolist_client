import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import EditTask from './EditTask';
import AppContext from './../../../AppContext'
import { Row, Col } from 'react-bootstrap';
import { getProjects } from './../../../actions/getProjects'

class Task extends Component {
  static contextType = AppContext

  async loadProjects() {
    const projects = await getProjects();
    this.context.setProjects(projects);
  }

  async completeTask(task) {
    await fetch(`http://localhost:3001/tasks/${task.id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task: { status: 'done' }
        })
      }
    )

    this.loadProjects();
  }
  async deleteTask(task) {
    if (window.confirm(`Are you sure you want to delete: "${task.name}"`)) {
      await fetch(`http://localhost:3001/tasks/${task.id}`, {method: 'DELETE'});
      this.loadProjects();
    }
  }
  get task() {
    return this.props.object;
  }
  render() {
    return (
      <Row key={this.task.id}>
        <Col sm={8}>{this.task.name}</Col>
        <Col>
            {
              this.task.status === 'todo'
              ? <a className="complete" href="#">
                  <FontAwesomeIcon icon={faCheckSquare} onClick={() => this.completeTask(this.task)}/>
              </a>
              : null
            }
          </Col>
          <Col>
            <EditTask object={this.task} />
          </Col>
          <Col>
            <a className="delete" href="#" onClick={() => this.deleteTask(this.task)}>
              <FontAwesomeIcon icon={faTrashAlt}/>
            </a>
          </Col>
      </Row>
    );
  }
}

export default Task;
