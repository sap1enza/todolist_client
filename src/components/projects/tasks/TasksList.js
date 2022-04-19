import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import CreateTask from './CreateTask';
import Task from './Task';
import AppContext from './../../../AppContext'
import { getProjects } from './../../../actions/getProjects'

class TasksList extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.loadTasks = this.loadTasks.bind(this);
  }
  async loadTasks() {
    let response = await fetch(`http://localhost:3001/projects/${this.props.project_id}/tasks`);
    const tasks = await response.json();
    this.setState({ tasks: tasks });
  }
  async deleteProject(projectId) {
    if (window.confirm("Are you sure you want to delete the project?")) {
      await fetch(`http://localhost:3001/projects/${projectId}`, {method: 'DELETE'});
      const projects = await getProjects();
      this.context.setProjects(projects);
    }
  }
  componentDidMount() {
    this.loadTasks();
  }
  get todoTasks(){
    return this.state.tasks.filter(x => x.status === "todo");
  }
  get completedTasks() {
    return this.state.tasks.filter(x => x.status === "done");
  }
  render() {
    return (
      <div>
        <div className="project-actions pt-3">
          <CreateTask loadTasks={this.loadTasks} project_id={this.props.project_id}/>
          <Button variant="" className="float-right" onClick={() => this.deleteProject(this.props.project_id)}>Delete Project</Button>
        </div>

        <div className="task-status">To-Do</div>
        <Table responsive>
          <tbody>
            {this.todoTasks.map((task, index) => { return <Task key={index} object={task} loadTasks={this.loadTasks} /> })}
          </tbody>
        </Table>

        <div className="task-status">Done</div>
        <Table responsive>
          <tbody>
            {this.completedTasks.map((task, index) => { return <Task key={index} object={task} loadTasks={this.loadTasks} /> })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TasksList;
