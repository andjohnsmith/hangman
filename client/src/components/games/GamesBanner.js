import React from 'react';
import GameModal from './GameModal';

const GamesBanner = () => {
  return (
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
                Find your collection of games here. Admire your victories, cut
                your losses, or plan your next move.
              </p>
              <GameModal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesBanner;
