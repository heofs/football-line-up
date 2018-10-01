import React, { Component } from "react";
import PropTypes from "prop-types";

import PlayerInfo from "./PlayerInfo";

// Render the row for given player position.
class PlayersRow extends Component {
    // Find the matching player details for the given id.
    findPlayerDetail = id => {
        let playerDetails;
        this.props.playerDetails.forEach(detail => {
            if (id === detail.id) {
                playerDetails = detail;
            }
        });
        return playerDetails;
    };

    // Function for returning PlayerInfo with different parameters.
    displayPlayer = (pos, player, playerType = "player") => {
        return (
            <PlayerInfo
                playerDetails={this.findPlayerDetail(player.playerId)}
                shirtcolor={
                    this.props.teamColors[this.props.teamName]
                        ? this.props.teamColors[this.props.teamName][playerType]
                        : "white"
                }
                location={pos}
                key={player.playerId}
            />
        );
    };

    renderPlayers = () => {
        if (this.props.playerPositions && this.props.playerDetails) {
            return this.props.playerPositions.map(player => {
                // Finds forward players.
                if (this.props.location === "front-row" && player.position === "FW") {
                    return this.displayPlayer("", player);
                }
                // Find center players and position to left or right depending on position.
                else if (
                    this.props.location === "center-row" &&
                    player.position.split("")[1] === "M"
                ) {
                    if (player.position === "LM") {
                        return this.displayPlayer("order-first", player);
                    } else if (player.position === "RM") {
                        return this.displayPlayer("order-last", player);
                    } else {
                        return this.displayPlayer("", player);
                    }
                }
                // Find back players and position to left or right depending on position.
                else if (
                    this.props.location === "back-row" &&
                    player.position.split("")[1] === "B"
                ) {
                    if (player.position === "LB") {
                        return this.displayPlayer("order-first", player);
                    } else if (player.position === "RB") {
                        return this.displayPlayer("order-last", player);
                    } else {
                        return this.displayPlayer("", player);
                    }
                }
                // Find goalkeeper player.
                else if (this.props.location === "goalkeeper-row" && player.position === "GK") {
                    return this.displayPlayer("", player, "goalkeeper");
                } else {
                    return null;
                }
            });
        }
    };

    render() {
        return (
            <div className={`row player-row mx-0 justify-content-around ${this.props.location}`}>
                {this.renderPlayers()}
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
