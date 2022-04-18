import React, { Component } from 'react';
import TasksList from './tasks/TasksList';

class Project extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.name}</h4>

        <TasksList project_id={this.props.id} loadProjects={this.props.loadProjects} />
      </div>
    );
  }
}

export default Project;
