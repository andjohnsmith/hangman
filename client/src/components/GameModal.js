import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { addGame } from '../actions/listActions';

class GameModal extends Component {
  state = {
    modal: false,
    difficulty: 'easy',
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newGame = {
      user: this.props.auth.user.id,
      difficulty: this.state.difficulty,
    };

    this.props.addGame(newGame);

    this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <Button
          className="btn btn-primary btn-outline-white px-4 py-3"
          onClick={this.toggle}
        >
          <i className="fas fa-plus mr-2"></i>
          Add Game
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create a New Game</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="difficulty">Difficulty</Label>
                <Input
                  type="select"
                  name="difficulty"
                  id="difficulty"
                  onChange={this.onChange}
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
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  game: state.game,
});

export default connect(mapStateToProps, { addGame })(GameModal);
