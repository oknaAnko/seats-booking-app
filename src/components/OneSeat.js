import React, { useState } from 'react';

const OneSeat = ({ id, cords, reserved }) => {
    const [isChosen, setIsChosen] = useState(false);

    const handleChooseSeatClick = () => setIsChosen(prev => !prev);
    // console.log(isChosen);

    let color = "transparent";
    if (reserved) color = "grey";
    if (isChosen) color = "orange";

    return (
        <div
            id={id}
            className="square"
            style={{ top: cords.x * 60, left: cords.y * 60 }}>
            <button
                className="seat"
                style={{ backgroundColor: color }}
                onClick={handleChooseSeatClick}
            >
                {id}
            </button>
        </div>
    );
}

export default OneSeat;