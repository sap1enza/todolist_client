import React, { useContext, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import AppContext from './../../../AppContext'
import { getProjects } from './../../../actions/getProjects'

function CreateTask(props) {
  const [name, setName] = useState('');
  const [show, setShow] = useState('');

  const appContext = useContext(AppContext)

  const handleSubmit = (async () => {
    await fetch(`http://localhost:3001/tasks`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task: { name: name, status: 'todo', project_id: props.project_id }
        })
      }
    )
    setShow(false)
    setName('')
    const projects = await getProjects();
    appContext.setProjects(projects);
  });

  return (
    <div>
      <Button onClick={e => setShow(true)} variant="light" className="float-left">+ New Task</Button>

      <Modal show={show || false} onHide={e => setShow(false)}>
        <Modal.Header>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="email" placeholder="Enter with your task..." value={name || ''} onChange={e => setName(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => setShow(false)}>
            Close
          </Button>
          <form onSubmit={handleSubmit}>
            <Button variant="dark" type="submit">
              Create
            </Button>
          </form>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateTask;
