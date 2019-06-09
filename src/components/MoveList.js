import React from 'react'

const directions = ['U', 'D', 'L', 'R', 'F', 'B'];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getMove() {
    return directions[getRandomInt(6)];
}

function MoveList(props) {
    let moveList = '';
    for(let i=0; i < 15; i++) {
        moveList += getMove() + ' ';
    }
    return (
        <div>{moveList}</div>
    );
}

export default MoveList;