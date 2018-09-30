import React from "react";
import PropTypes from "prop-types";

import blueshirt from "../images/shirt_blue.svg";
import whiteshirt from "../images/shirt_white.svg";
import yellowshirt from "../images/shirt_yellow.svg";
import greenshirt from "../images/shirt_green.svg";

const Player = ({ playername, shirtcolor, location }) => {
    const shirt_color = color => {
        switch (color) {
            case "blue":
                return blueshirt;
            case "white":
                return whiteshirt;
            case "green":
                return greenshirt;
            case "yellow":
                return yellowshirt;
            default:
                break;
        }
    };
    return (
        <div style={{background: "none"}} className={`col-3 px-0 ${location}`}>
            <img src={shirt_color(shirtcolor)} alt="" className="player-shirt p-0 mx-auto" />
            <div className="player-name">
                <span className="badge badge-pill badge-secondary">{playername}</span>
            </div>
        </div>
    );
};

Player.propTypes = {
    playername: PropTypes.string,
    shirtcolor: PropTypes.string
};

export default Player;
