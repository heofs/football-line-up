import React, { Component } from "react";
import PropTypes from "prop-types";

import PlayerInfo from "./PlayerInfo";

class PlayersRow extends Component {
    findPlayerDetail = id => {
        let playerDetails;
        this.props.playerDetails.forEach(detail => {
            if (id === detail.id) {
                playerDetails = detail;
                // console.log(playerDetails)
            }
        });
        return playerDetails;
    };

    Player = (pos, player, playerType = "player") => {
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
                    return this.Player("", player);
                }
                // Find center players.
                else if (
                    this.props.location === "center-row" &&
                    player.position.split("")[1] === "M"
                ) {
                    if (player.position === "LM") {
                        return this.Player("order-first", player);
                    } else if (player.position === "RM") {
                        return this.Player("order-last", player);
                    } else {
                        return this.Player("", player);
                    }
                }
                // Find back players.
                else if (
                    this.props.location === "back-row" &&
                    player.position.split("")[1] === "B"
                ) {
                    if (player.position === "LB") {
                        return this.Player("order-first", player);
                    } else if (player.position === "RB") {
                        return this.Player("order-last", player);
                    } else {
                        return this.Player("", player);
                    }
                }
                // Find goalkeeper player.
                else if (this.props.location === "goalkeeper-row" && player.position === "GK") {
                    return this.Player("", player, "goalkeeper");
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
