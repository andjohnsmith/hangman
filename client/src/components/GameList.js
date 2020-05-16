import React, { Component } from 'react';
import GameModal from './GameModal';
import { Container, Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getGames, deleteGame } from '../actions/listActions';
import PropTypes from 'prop-types';

class GameList extends Component {
  componentDidMount() {
    this.props.getGames();
  }

  onPlayClick = (id) => {
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
      <React.Fragment>
        <section className="home-slider ftco-degree-bg">
          <div className="slider-item">
            <div className="overlay"></div>
            <div className="container">
              <div className="row slider-text align-items-center justify-content-center">
                <div className="col-md-10 text-center">
                  <h1 className="mb-4">
                    My
                    <strong> Games.</strong>
                  </h1>
                  <p>
                    Find your collection of games here. Admire your victories,
                    cut your losses, or plan your next move.
                  </p>
                  <GameModal />
                </div>
              </div>
            </div>
          </div>
        </section>
        {games.length > 0 && (
          <section className="ftco-section-featured">
            <Container>
              <Table
                hover
                responsive
                style={{ backgroundColor: 'white' }}
                className="border-bottom border-left border-right"
              >
                <thead className="thead-light">
                  <tr>
                    <th>View</th>
                    <th>Difficulty</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map(({ _id, view, difficulty, status, turns }) => (
                    <tr key={_id} className={this.getRowColor(status)}>
                      <td className="view">{view}</td>
                      <td>{difficulty}</td>
                      <td>
                        {status === 'unfinished'
                          ? turns + ' turns left'
                          : status}
                      </td>
                      <td>
                        <Button
                          className="mr-1"
                          color="primary"
                          size="sm"
                          onClick={this.onPlayClick.bind(this, _id)}
                        >
                          <i className="fas fa-play"></i>
                        </Button>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </section>
        )}
      </React.Fragment>
    );
  }
}

GameList.propTypes = {
  getGames: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ list: state.list });

export default connect(mapStateToProps, { getGames, deleteGame })(GameList);
