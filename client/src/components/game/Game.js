import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getGame, makeGuess } from '../../actions/gameActions';

class GameView extends Component {
  componentDidMount() {
    this.props.getGame(this.props.match.params.id);
  }

  onGuessClick = (id) => {
    this.props.makeGuess(id, this.state);
  };

  createLetterButton = (letter) => {
    const { game } = this.props.game;

    const isInView = game.view && game.view.includes(letter);
    const wasGuessed =
      isInView || (game.guesses && game.guesses.includes(letter))
        ? true
        : false;

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

    if (game.status !== 'unfinished') disabled = true;

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
          onClick={() => this.props.makeGuess(game._id, { guess: letter })}
          disabled={disabled}
        >
          {letter.toUpperCase()}
        </Button>
      </Col>
    );
  };

  render() {
    const { game, loading } = this.props.game;

    return (
      <React.Fragment>
        <section className="home-slider ftco-degree-bg">
          <div
            className="slider-item bread-wrap"
            data-stellar-background-ratio="0.5"
          >
            <div className="overlay"></div>
            <div className="container">
              <div className="row slider-text justify-content-center align-items-center">
                <div className="col-md-10 col-sm-12 ftco-animate mb-4 text-center">
                  <p className="breadcrumbs">
                    <span className="mr-2">
                      <Link to="/list">List</Link>
                    </span>
                    / <span>Game</span>
                  </p>
                  <h1 className="mb-3 bread view">{!loading && game.view}</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ftco-section ftco-degree-bg contact-section">
          {!loading && (
            <Container className="bg-light">
              <div className="row d-flex mb-5 contact-info">
                <div className="col-md-12 mb-4">
                  <h2 className="h4 view">{game.view}</h2>
                </div>
                <div className="w-100"></div>
              </div>
              <div className="row block-9">
                <div className="col-md-6 pr-md-5">
                  <Row>
                    {this.createLetterButton('a')}
                    {this.createLetterButton('b')}
                    {this.createLetterButton('c')}
                    {this.createLetterButton('d')}
                    {this.createLetterButton('e')}
                    {this.createLetterButton('f')}
                  </Row>
                  <Row>
                    {this.createLetterButton('g')}
                    {this.createLetterButton('h')}
                    {this.createLetterButton('i')}
                    {this.createLetterButton('j')}
                    {this.createLetterButton('k')}
                    {this.createLetterButton('l')}
                  </Row>
                  <Row>
                    {this.createLetterButton('m')}
                    {this.createLetterButton('n')}
                    {this.createLetterButton('o')}
                    {this.createLetterButton('p')}
                    {this.createLetterButton('q')}
                    {this.createLetterButton('r')}
                  </Row>
                  <Row>
                    {this.createLetterButton('s')}
                    {this.createLetterButton('t')}
                    {this.createLetterButton('u')}
                    {this.createLetterButton('v')}
                    {this.createLetterButton('w')}
                    {this.createLetterButton('x')}
                  </Row>
                  <Row>
                    {this.createLetterButton('y')}
                    {this.createLetterButton('z')}
                  </Row>
                </div>
                <div className="col-md-6" id="image">
                  <img src={`/images/${game.turns}.png`} alt="game"></img>
                </div>
              </div>
            </Container>
          )}
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ game: state.game });

export default connect(mapStateToProps, { getGame, makeGuess })(GameView);
