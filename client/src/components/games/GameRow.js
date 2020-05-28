import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteGame } from '../../actions/listActions';
import { Button } from 'reactstrap';

const GameRow = ({
  deleteGame,
  game: { id, view, status, turns, difficulty },
}) => {
  const getRowColor = () => {
    if (status === 'victory') return 'table-success';
    else if (status === 'loss') return 'table-danger';
    else return '';
  };

  return (
    <tr className={getRowColor()}>
      <td className="view">{view}</td>
      <td>{difficulty}</td>
      <td>{status === 'unfinished' ? turns + ' turns left' : status}</td>
      <td>
        <Link to={`/games/${id}`} className="mr-1 btn btn-primary btn-sm">
          <i className="fas fa-play"></i>
        </Link>
        <Button color="primary" size="sm" onClick={() => deleteGame(id)}>
          <i className="fas fa-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

GameRow.propTypes = {
  deleteGame: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

export default connect(null, { deleteGame })(GameRow);
