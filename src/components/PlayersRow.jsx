import React, { Component } from "react";
import PropTypes from "prop-types";

import Player from "./Player";

class PlayersRow extends Component {
    // constructor(props) {
    //     super(props);
    // }

    findPlayerName = id => {
        let playerName;
        this.props.playerDetails.forEach(detail => {
            if (id === detail.id) {
                playerName = detail.name;
            }
        });
        return playerName;
    };

    renderPlayers = () => {
        if (this.props.playerPositions && this.props.playerDetails) {
            return this.props.playerPositions.map(player => {
                // Finds forward players
                if (this.props.location === "front-row" && player.position === "FW") {
                    return (
                        <Player
                            playername={this.findPlayerName(player.playerId)}
                            shirtcolor={
                                this.props.teamColors[this.props.teamName]
                                    ? this.props.teamColors[this.props.teamName].player
                                    : "white"
                            }
                            key={player.playerId}
                        />
                    );
                }
                // Find center players.
                else if (
                    this.props.location === "center-row" &&
                    player.position.split("")[1] === "M"
                ) {
                    if (player.position === "LM") {
                        return (
                            <Player
                                playername={this.findPlayerName(player.playerId)}
                                shirtcolor={
                                    this.props.teamColors[this.props.teamName]
                                        ? this.props.teamColors[this.props.teamName].player
                                        : "white"
                                }
                                key={player.playerId}
                                location={"order-first"}
                            />
                        );
                    } else if (player.position === "RM") {
                        return (
                            <Player
                                playername={this.findPlayerName(player.playerId)}
                                shirtcolor={
                                    this.props.teamColors[this.props.teamName]
                                        ? this.props.teamColors[this.props.teamName].player
                                        : "white"
                                }
                                key={player.playerId}
                                location={"order-last"}
                            />
                        );
                    } else {
                        return (
                            <Player
                                playername={this.findPlayerName(player.playerId)}
                                shirtcolor={
                                    this.props.teamColors[this.props.teamName]
                                        ? this.props.teamColors[this.props.teamName].player
                                        : "white"
                                }
                                key={player.playerId}
                                location={""}
                            />
                        );
                    }
                }
                // Find back players
                else if (
                    this.props.location === "back-row" &&
                    player.position.split("")[1] === "B"
                ) {
                    if (player.position === "LB") {
                        return (
                            <Player
                                playername={this.findPlayerName(player.playerId)}
                                shirtcolor={
                                    this.props.teamColors[this.props.teamName]
                                        ? this.props.teamColors[this.props.teamName].player
                                        : "white"
                                }
                                key={player.playerId}
                                location={"order-first"}
                            />
                        );
                    } else if (player.position === "RB") {
                        return (
                            <Player
                                playername={this.findPlayerName(player.playerId)}
                                shirtcolor={
                                    this.props.teamColors[this.props.teamName]
                                        ? this.props.teamColors[this.props.teamName].player
                                        : "white"
                                }
                                key={player.playerId}
                                location={"order-last"}
                            />
                        );
                    } else {
                        return (
                            <Player
                                playername={this.findPlayerName(player.playerId)}
                                shirtcolor={
                                    this.props.teamColors[this.props.teamName]
                                        ? this.props.teamColors[this.props.teamName].player
                                        : "white"
                                }
                                key={player.playerId}
                                location={""}
                            />
                        );
                    }
                }
                // Find goalkeeper player.
                else if (this.props.location === "goalkeeper-row" && player.position === "GK") {
                    return (
                        <Player
                            playername={this.findPlayerName(player.playerId)}
                            shirtcolor={
                                this.props.teamColors[this.props.teamName]
                                    ? this.props.teamColors[this.props.teamName]["goalkeeper"]
                                    : "white"
                            }
                            key={player.playerId}
                            location={""}
                        />
                    );
                } else {
                    return null;
                }
            });
        }
    };

    render() {
        return (
            <div className={`row player-row mx-0 justify-content-around ${this.props.location}`}>
                {this.renderPlayers(this.props.teamName)}
            </div>
        );
    }
}

PlayersRow.propTypes = {
    location: PropTypes.string,
    playerPositions: PropTypes.array,
    playerDetails: PropTypes.array,
    teamName: PropTypes.string,
    teamColors: PropTypes.object
};

export default PlayersRow;
