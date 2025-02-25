import './App.css'
import Card from "./components/Card.tsx";
import React, {useEffect, useState} from "react";

import chewbaccaIcon from './assets/chewbacca.svg';
import darthVaderIcon from './assets/darth-vader.svg';
import bb8Icon from './assets/bb-8.svg';
import deathStarIcon from './assets/death-star.svg';
import jediIcon from './assets/jedi.svg';
import lightSaberIcon from './assets/lightsaber.svg';
import starWarsRebelIcon from './assets/star-wars-rebel.svg';
import stormTrooperIcon from './assets/stormtrooper.svg';



type CardType = {
    emoji: string;
    id: string;
    matchFound: boolean;
    flipped: boolean;
    uniqueId: string;
    key: string;
};

function App() {
    const [cards, setCards] = useState<CardType[] | null>(null);
    const [score, setScore] = useState<number>(0);
    const [moves, setMoves] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [firstSelection, setFirstSelection] = useState<string | null>(null);
    const [secondSelection, setSecondSelection] = useState<string | null>(null);

    const items: Omit<CardType, "uniqueId" | "key">[] = [
        { emoji: bb8Icon, id: "1", matchFound: false, flipped: false },
        { emoji: deathStarIcon, id: "2", matchFound: false, flipped: false },
        { emoji: jediIcon, id: "3", matchFound: false, flipped: false },
        { emoji: lightSaberIcon, id: "4", matchFound: false, flipped: false },
        { emoji: stormTrooperIcon, id: "5", matchFound: false, flipped: false },
        { emoji: starWarsRebelIcon, id: "6", matchFound: false, flipped: false },
        { emoji: darthVaderIcon, id: "7", matchFound: false, flipped: false },
        { emoji: chewbaccaIcon, id: "8", matchFound: false, flipped: false },

    ];
    function handleCardClick(e: React.MouseEvent<HTMLButtonElement>) {
        const clickedUniqueId = e.currentTarget.dataset.uniqueId;
        if (!clickedUniqueId || disabled) return;
        setCards(prevCards =>
            prevCards?.map(card =>
                card.uniqueId === clickedUniqueId ? { ...card, flipped: true } : card
            ) || null
        );
        firstSelection ? setSecondSelection(clickedUniqueId) : setFirstSelection(clickedUniqueId);
    }


    function resetCards() {
        const shuffled: CardType[] = [...items, ...items]
            .map(card => ({
                ...card,
                uniqueId: crypto.randomUUID(),
                key: crypto.randomUUID(),
            }))
            .sort(() => Math.random() - 0.5);
        setCards(shuffled);
    }
    function resetGame(){
        resetTurn();
        setMoves(0);
        setScore(0);
        resetCards();
    }
    function resetTurn() {
        setFirstSelection(null);
        setSecondSelection(null);
        setMoves(m => m + 1);
        setDisabled(false);
    }
    function handleNewGameClick() {
        resetGame();
    }

    useEffect(() => {
        if (!cards || !firstSelection || !secondSelection) return;

        setDisabled(true);

        const firstCard = cards.find(c => c.uniqueId === firstSelection);
        const secondCard = cards.find(c => c.uniqueId === secondSelection);

        if (firstCard && secondCard && firstCard.id === secondCard.id) {
            setCards(prevCards =>
                prevCards?.map(card =>
                    card.id === firstCard.id ? { ...card, matchFound: true } : card
                ) || null
            );
            setScore(prevScore => prevScore + 1);
            resetTurn();
        } else {
            setTimeout(() => {
                setCards(prevCards =>
                    prevCards?.map(card =>
                        card.uniqueId === firstSelection || card.uniqueId === secondSelection
                            ? { ...card, flipped: false }
                            : card
                    ) || null
                );
                resetTurn();
            }, 1000);
        }
    }, [firstSelection, secondSelection, cards]);



    useEffect(() => {
        if(score === 8){
            alert("Congrats you WIN!")
            resetGame();
        }
    }, [score]);
    useEffect(() => {
        resetCards()
    }, [])
    return (
        <>
            <div className="App">
                <button onClick={() => handleNewGameClick()}> New Game</button>

                <div className="gameboard">
                    {
                        cards && (
                            Object.values(cards).map((card) => <Card
                                key={card.key}
                                card={card}
                                disabled={disabled}
                                handleCardClick={handleCardClick}/>)
                        )
                    }
                </div>
                <p>Total Moves: {moves}</p>
                <p>Total Score: {score}</p>
            </div>
        </>
    )
}

export default App
