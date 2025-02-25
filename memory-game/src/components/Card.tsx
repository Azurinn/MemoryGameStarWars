import React from 'react';
import "./Card.css";
import logo from '../assets/star-wars-logo.svg';

type CardProps = {
    card: {
        emoji: string;
        id: string;
        matchFound: boolean;
        flipped: boolean;
        uniqueId: string;
    };
    handleCardClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
};

const Card: React.FC<CardProps> = ({ card, handleCardClick, disabled }) => {
    return (
        <button
            className={`card ${card.matchFound ? "matched" : ""} ${card.flipped ? "flipped" : ""}`}
            disabled={disabled}
            onClick={handleCardClick}
            data-id={card.id}
            data-unique-id={card.uniqueId}
            data-flipped={card.flipped}
        >
            <div className="side front">
                <img src={logo} alt="SW Logo" width="60" />
            </div>
            <div className="side back">
                    <img src={card.emoji} alt="card content" width={60} height={60} />
            </div>
        </button>
    );
};

export default Card;
