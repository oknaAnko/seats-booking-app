import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleChosenSeats } from "../app/actions";
import { useMediaQuery } from "./hooks";

const OneSeat = ({ id }) => {
  const seat = useSelector((state) => state.seats.seats.find((seat) => seat.id === id));

  const dispatch = useDispatch();

  const handleChooseSeatClick = () => {
    if (!seat.reserved) dispatch(toggleChosenSeats([id]));
  };

  let color = "rgb(239, 239, 239)";
  if (seat.reserved) color = "grey";
  if (seat.chosen) color = "#b7eb2b";

  const isWidth768 = useMediaQuery("(max-width: 768px)");
  const isWidth490 = useMediaQuery("(max-width: 490px)");
  const styles = {
    container: (isWidth768, isWidth490) => ({
      top: isWidth768 ? (isWidth490 ? seat.cords.x * 18 : seat.cords.x * 30) : seat.cords.x * 40,
      left: isWidth768 ? (isWidth490 ? seat.cords.y * 18 : seat.cords.y * 30) : seat.cords.y * 40,
    }),
  };

  return (
    <div id={id} className="square" style={styles.container(isWidth768, isWidth490)}>
      <button className="seat" style={{ backgroundColor: color }} onClick={handleChooseSeatClick}></button>
    </div>
  );
};

export default OneSeat;
