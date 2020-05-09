import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getGames, deleteGame } from '../actions/gameActions';
import PropTypes from 'prop-types';

class GameList extends Component {
  componentDidMount() {
    this.props.getGames();
  }

  onDeleteClick = (id) => {
    this.props.deleteGame(id);
  };

  render() {
    const { games } = this.props.game;

    return (
      <Container>
        <ListGroup>
          {games.map(({ _id, view, turns }) => (
            <ListGroupItem key={_id}>
              {view}, {turns}
              <Button
                className="ml-2"
                color="danger"
                size="sm"
                onClick={this.onDeleteClick.bind(this, _id)}
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

export default connect(mapStateToProps, { getGames, deleteGame })(GameList);
