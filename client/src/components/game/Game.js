import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getGame, makeGuess } from '../../actions/gameActions';

import noTurns from '../../images/0.png';
import oneTurn from '../../images/1.png';
import twoTurns from '../../images/2.png';
import threeTurns from '../../images/3.png';
import fourTurns from '../../images/4.png';
import fiveTurns from '../../images/5.png';
import sixTurns from '../../images/6.png';

const Game = ({
  getGame,
  makeGuess,
  game: {
    game: { id, status, view, guesses, turns },
    loading,
  },
  match,
}) => {
  useEffect(() => {
    getGame(match.params.id);
  }, [getGame, match.params.id]);

  const createLetterButton = (letter) => {
    const isInView = view && view.includes(letter);
    const wasGuessed =
      isInView || (guesses && guesses.includes(letter)) ? true : false;

    let color, disabled;
    if (isInView) {
      color = 'success';
      disabled = true;
    } else if (wasGuessed) {
      color = 'danger';
      disabled = true;
    } else {
      color = 'secondary';
      disabled = false;
    }

    if (status !== 'unfinished') disabled = true;

    const style = {
      display: 'flex',
      justifyContent: 'center',
    };

    return (
      <Col style={style}>
        <Button
          className="btn-letter mt-4"
          size="sm"
          color={color}
          onClick={() => makeGuess(id, { guess: letter })}
          disabled={disabled}
        >
          {letter.toUpperCase()}
        </Button>
      </Col>
    );
  };

  const getPicture = () => {
    switch (turns) {
      case 0:
        return noTurns;
      case 1:
        return oneTurn;
      case 2:
        return twoTurns;
      case 3:
        return threeTurns;
      case 4:
        return fourTurns;
      case 5:
        return fiveTurns;
      default:
        return sixTurns;
    }
  };

  return (
    <Fragment>
      <section className="home-slider">
        <div className="slider-item bread-wrap">
          <div className="overlay"></div>
          <div className="container">
            <div className="row slider-text justify-content-center align-items-center">
              <div className="col-md-10 col-sm-12 ftco-animate mb-4 text-center">
                <p className="breadcrumbs">
                  <span className="mr-2">
                    <Link to="/games">List</Link>
                  </span>
                  / <span>Game</span>
                </p>
                <h1 className="mb-3 bread view">{!loading && view}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section contact-section">
        {!loading && (
          <Container className="bg-light">
            <div className="row d-flex mb-5 contact-info">
              <div className="col-md-12 mb-4">
                <h2 className="h4 view">{view}</h2>
              </div>
              <div className="w-100"></div>
            </div>
            <div className="row block-9">
              <div className="col-md-6 pr-md-5">
                <Row>
                  {createLetterButton('a')}
                  {createLetterButton('b')}
                  {createLetterButton('c')}
                  {createLetterButton('d')}
                  {createLetterButton('e')}
                  {createLetterButton('f')}
                </Row>
                <Row>
                  {createLetterButton('g')}
                  {createLetterButton('h')}
                  {createLetterButton('i')}
                  {createLetterButton('j')}
                  {createLetterButton('k')}
                  {createLetterButton('l')}
                </Row>
                <Row>
                  {createLetterButton('m')}
                  {createLetterButton('n')}
                  {createLetterButton('o')}
                  {createLetterButton('p')}
                  {createLetterButton('q')}
                  {createLetterButton('r')}
                </Row>
                <Row>
                  {createLetterButton('s')}
                  {createLetterButton('t')}
                  {createLetterButton('u')}
                  {createLetterButton('v')}
                  {createLetterButton('w')}
                  {createLetterButton('x')}
                </Row>
                <Row>
                  {createLetterButton('y')}
                  {createLetterButton('z')}
                </Row>
              </div>
              <div className="col-md-6">
                <img src={getPicture()} alt="game"></img>
              </div>
            </div>
          </Container>
        )}
      </section>
    </Fragment>
  );
};

Game.propTypes = {
  game: PropTypes.object.isRequired,
  getGame: PropTypes.func.isRequired,
  makeGuess: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ game: state.game });

export default connect(mapStateToProps, { getGame, makeGuess })(Game);
