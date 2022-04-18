import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import EditTask from './EditTask';

class Task extends Component {
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

    this.props.loadTasks();
  }
  async deleteTask(task) {
    if (window.confirm(`Are you sure you want to delete: "${task.name}"`)) {
      await fetch(`http://localhost:3001/tasks/${task.id}`, {method: 'DELETE'});
      this.props.loadTasks();
    }
  }
  get task() {
    return this.props.object;
  }
  render() {
    return (
      <tr key={this.task.id}>
        <td className="col-md-10">{this.task.name}</td>
        <td>
            {
              this.task.status === 'todo'
              ? <a className="complete" href="#">
                  <FontAwesomeIcon icon={faCheckSquare} onClick={() => this.completeTask(this.task)}/>
              </a>
              : null
            }
          </td>
          <td>
            <EditTask object={this.task}/>
          </td>
          <td>
            <a className="delete" href="#" onClick={() => this.deleteTask(this.task)}>
              <FontAwesomeIcon icon={faTrashAlt}/>
            </a>
          </td>
      </tr>
    );
  }
}

export default Task;
