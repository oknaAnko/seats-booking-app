import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleChosenSeats } from "../app/actions";

const OneSeat = ({ id }) => {
  const seat = useSelector((state) => state.seats.seats.find((seat) => seat.id === id));

  const dispatch = useDispatch();

  const handleChooseSeatClick = () => {
    if (!seat.reserved) dispatch(toggleChosenSeats([id]));
  };

  let color = "rgb(239, 239, 239)";
  if (seat.reserved) color = "grey";
  if (seat.chosen) color = "#b7eb2b";

  return (
    <div id={id} className="square" style={{ top: seat.cords.x * 40, left: seat.cords.y * 40 }}>
      <button className="seat" style={{ backgroundColor: color }} onClick={handleChooseSeatClick}>
        {/* {id} */}
      </button>
    </div>
  );
};

export default OneSeat;
