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
import { addGame } from '../actions/gameActions';

class GameModal extends Component {
  state = {
    modal: false,
    difficulty: 0,
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
      id: 1,
      difficulty: this.state.difficulty,
    };

    this.props.addGame(newGame);

    this.toggle();
  };

  render() {
    return (
      <div>
        <Button color="dark" className="mb-2" onClick={this.toggle}>
          Add Game
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Game List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="game">Game</Label>
                <Input
                  type="text"
                  name="difficulty"
                  id="game"
                  placeholder="How hard?"
                  onChange={this.onChange}
                />
                <Button color="dark">CreateGame</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { addGame })(GameModal);
