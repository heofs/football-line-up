import React from "react";
import PropTypes from "prop-types";

import Player from "./Player";

const PlayerRow = ({ location, playerPositions, playerDetails, teamName, teamColors }) => {
    const renderPlayers = () => {
        if (playerPositions && playerDetails) {
            return playerPositions.map(player => {
                if (location === "front-row" && player.position === "FW") {
                    let playername;
                    playerDetails.map(detail => {
                        if (player.playerId === detail.id) {
                            playername = detail.name;
                        }
                    });
                    return (
                        <Player
                            playername={playername}
                            shirtcolor={
                                teamColors[teamName] ? teamColors[teamName].player : "white"
                            }
                            key={player.playerId}
                        />
                    );
                } else if (location === "center-row" && player.position.split("")[1] === "M") {
                    let playername;
                    playerDetails.map(detail => {
                        if (player.playerId === detail.id) {
                            playername = detail.name;
                        }
                    });
                    if (player.position === "LM") {
                        // console.log(playername);
                        return (
                            <Player
                                playername={playername}
                                shirtcolor={
                                    teamColors[teamName] ? teamColors[teamName].player : "white"
                                }
                                key={player.playerId}
                                location={"order-first"}
                            />
                        );
                    } else if (player.position === "RM") {
                        return (
                            <Player
                                playername={playername}
                                shirtcolor={
                                    teamColors[teamName] ? teamColors[teamName].player : "white"
                                }
                                key={player.playerId}
                                location={"order-last"}
                            />
                        );
                    } else {
                        return (
                            <Player
                                playername={playername}
                                shirtcolor={
                                    teamColors[teamName] ? teamColors[teamName].player : "white"
                                }
                                key={player.playerId}
                                location={""}
                            />
                        );
                    }
                } else if (location === "back-row" && player.position.split("")[1] === "B") {
                    let playername;
                    playerDetails.map(detail => {
                        if (player.playerId === detail.id) {
                            playername = detail.name;
                        }
                    });
                    if (player.position === "LB") {
                        return (
                            <Player
                                playername={playername}
                                shirtcolor={
                                    teamColors[teamName] ? teamColors[teamName].player : "white"
                                }
                                key={player.playerId}
                                location={"order-first"}
                            />
                        );
                    } else if (player.position === "RB") {
                        return (
                            <Player
                                playername={playername}
                                shirtcolor={
                                    teamColors[teamName] ? teamColors[teamName].player : "white"
                                }
                                key={player.playerId}
                                location={"order-last"}
                            />
                        );
                    } else {
                        return (
                            <Player
                                playername={playername}
                                shirtcolor={
                                    teamColors[teamName] ? teamColors[teamName].player : "white"
                                }
                                key={player.playerId}
                                location={""}
                            />
                        );
                    }
                } else if (location === "goalkeeper-row" && player.position === "GK") {
                    let playername;
                    playerDetails.map(detail => {
                        if (player.playerId === detail.id) {
                            playername = detail.name;
                        }
                    });
                    return (
                        <Player
                            playername={playername}
                            shirtcolor={
                                teamColors[teamName] ? teamColors[teamName]["goalkeeper"] : "white"
                            }
                            key={player.playerId}
                            location={""}
                        />
                    );
                }
            });
        }
    };

    return (
        <div className={`row player-row mx-0 justify-content-around ${location}`}>
            {renderPlayers(teamName)}
        </div>
    );
};

PlayerRow.propTypes = {
    top: PropTypes.string
};

export default PlayerRow;
