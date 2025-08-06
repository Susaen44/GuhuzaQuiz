"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./play_0.css";

const termsText = `
Terms and Conditions for Guhuza Game

Welcome to Guhuza Game! By using this game, you agree to follow all applicable terms and conditions...
`;

const rulesText = `
Game Rules for Guhuza Quiz

1. Respect the timer.
2. Do not refresh during a quiz.
3. Each answer counts, so choose wisely...
`;

const Play0: React.FC = () => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [rulesChecked, setRulesChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const router = useRouter();

  const handleStartGame = () => {
    if (termsChecked && rulesChecked) {
      router.push("/quiz/1");
    }
  };

  return (
    <div className="page-container">
      {!startGame ? (
        <div className="instructions-container">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="header-title">Welcome to Guhuza Quiz</h1>
            <p className="intro-text">
              Guhuza is an interactive quiz game simulating a job-seeking
              experience. Test your knowledge and rise to the top of the
              leaderboard.
            </p>
          </div>

          {/* Instructions */}
          <h2 className="header-subtitle">Game Instructions</h2>
          <div className="instructions-box">
            <ol className="instructions-list">
              <li>
                <strong>Start:</strong> Click <b>“Play”</b> on the home screen.
              </li>
              <li>
                <strong>Answering:</strong> Choose the correct option within{" "}
                <b>15 seconds</b>, then click <b>“Next”</b>.
              </li>
              <li>
                <strong>Scoring:</strong>
                <ul className="sub-list">
                  <li>
                    ✅ Correct: <b>+1 point</b>
                  </li>
                  <li>
                    ❌ Wrong: <b>0 points</b>
                  </li>
                  <li>
                    ⏱ Timeout: <b>0 points</b>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Levels:</strong> Each level has <b>10 questions</b>. The
                game goes up to <b>Level 50</b>.
              </li>
              <li>
                <strong>Leaderboard:</strong> Check your ranking and score
                progress.
              </li>
              <li>
                <strong>Profile:</strong> Your progress is saved and visible in
                your profile.
              </li>
              <li>
                <strong>Troubleshooting:</strong>
                <ul className="sub-list">
                  <li>🔄 Refresh if the game doesn’t load.</li>
                  <li>📶 Check internet connection.</li>
                  <li>🥇 View Leaderboard if the quiz is unavailable.</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Agreement Checkboxes */}
          <div className="checkboxes-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
              I agree to the&nbsp;
              <span
                className="modal-link"
                onClick={() => setShowTermsModal(true)}
              >
                Terms and Conditions
              </span>
              .
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rulesChecked}
                onChange={(e) => setRulesChecked(e.target.checked)}
              />
              I agree to the&nbsp;
              <span
                className="modal-link"
                onClick={() => setShowRulesModal(true)}
              >
                Game Rules
              </span>
              .
            </label>
          </div>

          {/* Start Game Button */}
          <div className="button-container">
            <button
              className="play-button"
              onClick={handleStartGame}
              disabled={!(termsChecked && rulesChecked)}
            >
              Start Playing
            </button>
          </div>

          {/* Modals */}
          {showTermsModal && (
            <div
              className="modal-overlay"
              onClick={() => setShowTermsModal(false)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Terms and Conditions</h2>
                <pre className="modal-text">{termsText}</pre>
                <button
                  className="modal-close"
                  onClick={() => setShowTermsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showRulesModal && (
            <div
              className="modal-overlay"
              onClick={() => setShowRulesModal(false)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Game Rules</h2>
                <pre className="modal-text">{rulesText}</pre>
                <button
                  className="modal-close"
                  onClick={() => setShowRulesModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Replace with Play1 component */}
          <h2>The game will start here!</h2>
        </div>
      )}
    </div>
  );
};

export default Play0;
