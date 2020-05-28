import React, { Fragment, useEffect } from 'react';
import GamesBanner from './GamesBanner';
import GameRow from './GameRow';
import { Container, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getGames } from '../../actions/listActions';
import PropTypes from 'prop-types';

const GameList = ({ getGames, list: { games, loading } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);

  return (
    <Fragment>
      <GamesBanner />
      {games.length > 0 && !loading && (
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
                {games.map((game) => (
                  <GameRow key={game.id} game={game} />
                ))}
              </tbody>
            </Table>
          </Container>
        </section>
      )}
    </Fragment>
  );
};

GameList.propTypes = {
  getGames: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ list: state.list });

export default connect(mapStateToProps, { getGames })(GameList);
