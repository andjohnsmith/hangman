import React, { Component } from 'react';
import { Container, Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getGames, deleteGame } from '../actions/listActions';
import { setGame } from '../actions/gameActions';
import PropTypes from 'prop-types';

class GameList extends Component {
  componentDidMount() {
    this.props.getGames();
  }

  onPlayClick = (id) => {
    // this.props.setGame(id);
    window.location.href = `/game/${id}`;
  };

  onDeleteClick = (id) => {
    this.props.deleteGame(id);
  };

  getRowColor = (status) => {
    if (status === 'victory') return 'table-success';
    else if (status === 'loss') return 'table-danger';
    else return '';
  };

  render() {
    const { games } = this.props.list;

    return (
      <Container>
        <Table hover>
          <caption>List of games</caption>
          <thead>
            <tr>
              <th style={{ width: '70%' }}>View</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map(({ _id, view, status, turns }) => (
              <tr key={_id} className={this.getRowColor(status)}>
                <td>{view}</td>
                <td>
                  {status === 'unfinished' ? turns + ' turns left' : status}
                </td>
                <td>
                  <Button
                    className="ml-2"
                    color="success"
                    size="sm"
                    onClick={this.onPlayClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  <Button
                    className="ml-2"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

GameList.propTypes = {
  getGames: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ list: state.list });

export default connect(mapStateToProps, { getGames, deleteGame, setGame })(
  GameList,
);
