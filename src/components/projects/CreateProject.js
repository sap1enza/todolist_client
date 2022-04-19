import React, { useContext, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import AppContext from './../../AppContext'
import { getProjects } from './../../actions/getProjects'

function CreateProject(props) {
  const [name, setName] = useState('');
  const [show, setShow] = useState('');

  const { setProjects } = useContext(AppContext)

  const handleSubmit = (async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:3001/projects`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project: { name: name }
        })
      }
    )

    const projects = await getProjects();
    setProjects(projects);
    setShow(false)
    setName('')
  });

  return (
    <div>
      <Button onClick={e => setShow(true)} variant="light" className="float-left">+ New Project</Button>

      <Modal show={show || false} onHide={e => setShow(false)}>
        <Modal.Header>
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="email" placeholder="Enter with your project..." value={name || ''} onChange={e => setName(e.target.value)} />
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

export default CreateProject;
