import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons'

function EditTask(props) {
  const [name, setName] = useState(props.object.name);
  const [show, setShow] = useState('');

  const handleSubmit = (async () => {
    await fetch(`http://localhost:3001/tasks/${props.object.id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task: { name: name }
        })
      }
    )
    setShow(false)
    setName('')
    // props.loadTasks();
  });

  return (
    <div>
      <a className="edit" href="#" onClick={e => setShow(true)}><FontAwesomeIcon icon={faEdit}/></a>

      <Modal show={show || false} onHide={e => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Edit Task</Modal.Title>
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
              Update
            </Button>
          </form>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditTask;
