import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGame } from '../../actions/listActions';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const GameModal = ({ addGame }) => {
  const [modalData, setModalData] = useState({
    modal: false,
    difficulty: 'easy',
  });

  const toggle = () => {
    setModalData({
      ...modalData,
      modal: !modalData.modal,
    });
  };

  const onChange = (e) => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addGame({ difficulty: modalData.difficulty });

    toggle();
  };

  return (
    <React.Fragment>
      <Button
        className="btn btn-primary btn-outline-white px-4 py-3"
        onClick={toggle}
      >
        <i className="fas fa-plus mr-2"></i>
        Add Game
      </Button>
      <Modal isOpen={modalData.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create a New Game</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="difficulty">Difficulty</Label>
              <Input
                type="select"
                name="difficulty"
                id="difficulty"
                onChange={onChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Input>
              <Button color="dark" className="d-block mt-4 ml-auto">
                Create Game
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

GameModal.propTypes = {
  addGame: PropTypes.func.isRequired,
};

export default connect(null, { addGame })(GameModal);
