import React, { Component } from 'react';
import { Container, FormGroup, Input, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getGame, makeGuess } from '../actions/gameActions';

class GameView extends Component {
  state = {
    guess: '',
  };

  componentDidMount() {
    this.props.getGame(this.props.match.params.id);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onGuessClick = (id) => {
    this.props.makeGuess(id, this.state);
  };

  render() {
    const { _id, view, guesses } = this.props.game.game;

    return (
      <Container>
        <h1>{view}</h1>
        <form>
          <FormGroup>
            <Label for="guess">Guess</Label>
            <Input
              type="text"
              name="guess"
              id="guess"
              onChange={this.onChange}
            ></Input>
          </FormGroup>
          <Button onClick={this.onGuessClick.bind(this, _id)}>
            Make Guess
          </Button>
        </form>
        <div>{guesses}</div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ game: state.game });

export default connect(mapStateToProps, { getGame, makeGuess })(GameView);
