import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import CreateTask from './CreateTask';
import Task from './Task';
import AppContext from './../../../AppContext'
import { getProjects } from './../../../actions/getProjects'
import { Droppable, Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "lightgreen" : null,
  borderRadius: "5px",
  padding: "7px",
  ...draggableStyle
});

class TasksList extends Component {
  static contextType = AppContext

  async deleteProject(projectId) {
    if (window.confirm("Are you sure you want to delete the project?")) {
      await fetch(`http://localhost:3001/projects/${projectId}`, {method: 'DELETE'});
      const projects = await getProjects();
      this.context.setProjects(projects);
    }
  }
  get projectTasks() {
    return this.context.projects.find(x => x.id === this.props.project_id).tasks
  }
  get todoTasks(){
    return this.projectTasks.filter(x => x.status === "todo");
  }
  get completedTasks() {
    return this.projectTasks.filter(x => x.status === "done");
  }
  render() {
    return (
      <div>
        <div className="project-actions pt-3">
          <CreateTask project_id={this.props.project_id}/>
          <Button variant="" className="float-right" onClick={() => this.deleteProject(this.props.project_id)}>Delete Project</Button>
        </div>

        <div className="task-status">To-Do</div>
        <ul className="task-list">
          <Droppable key={this.props.project_id} droppableId={`todo-${this.props.project_id}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.todoTasks.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Task key={index} object={item} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>

        <div className="task-status">Done</div>
        <ul className="task-list">
          <Droppable key={this.props.project_id} droppableId={`done-${this.props.project_id}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.completedTasks.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Task key={index} object={item} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
      </div>
    );
  }
}

export default TasksList;
