import React from "react";
import PropTypes from "prop-types";

import Player from "./Player";

const PlayerRow = ({ location, playerPositions, playerDetails }) => {
    const getPlayerName = id => {
        if (playerDetails.length > 21) {
            console.log(playerDetails);
        }
    };
    const printPlayer = () => {
        return <Player playername={"Test"} shirtcolor={"blue"} />;
    };

    const checkLocation = () => {
        // console.log(playerPositions);
        if (playerPositions && playerDetails) {
            return playerPositions.map(player => {
                // console.log(player);
                if (location === "front-row" && player.position === "FW") {
                    let playername;
                    playerDetails.map(detail => {
                        if (player.playerId === detail.id) {
                            playername = detail.name;
                        }
                    });
                    return (
                        <div key={player.playerId}>
                            {/* <div className="col-1" /> */}
                            <Player playername={playername} shirtcolor={"blue"} />
                        </div>
                    );
                } else if (location === "center-row" && player.position.split("")[1] === "M") {
                    // console.log(name);
                } else if (location === "back-row" && player.position.split("")[1] === "B") {
                    // return { name };
                } else if (location === "goalkeeper-row" && player.position === "GK") {
                    // return {};
                }
            });
        }
    };

    return (
        <div className={`row player-row mx-0 justify-content-center ${location}`}>
            {/* <Player playername={"Peter Dickinson"} shirtcolor={"green"} /> */}
            {/* <div className="col-1" /> */}
            {/* <Player playername={"Peter Jackson"} shirtcolor={"blue"} /> */}
            {checkLocation()}
            {/* {printPlayer()} */}
        </div>
    );
};

PlayerRow.propTypes = {
    top: PropTypes.string
};

export default PlayerRow;
