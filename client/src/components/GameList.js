import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getGames } from '../actions/gameActions';
import PropTypes from 'prop-types';

class GameList extends Component {
  componentDidMount() {
    this.props.getGames();
  }

  render() {
    const { games } = this.props.game;

    return (
      <Container>
        <Button
          color="dark"
          className="mb-5"
          onClick={() => {
            const difficulty = prompt('Enter difficulty');
            if (difficulty) {
              this.setState((state) => ({
                games: [
                  ...state.games,
                  { id: 4, view: '__', turns: difficulty },
                ],
              }));
            }
          }}
        >
          Create Game
        </Button>
        <ListGroup>
          {games.map(({ id, view, turns }) => (
            <ListGroupItem key={id}>
              {view}, {turns}
              <Button
                className="ml-2"
                color="danger"
                size="sm"
                onClick={() => {
                  this.setState((state) => ({
                    games: state.games.filter((game) => game.id !== id),
                  }));
                }}
              >
                &times;
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

GameList.propTypes = {
  getGames: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ game: state.game });

export default connect(mapStateToProps, { getGames })(GameList);
