import React, { Component } from "react";
import PropTypes from "prop-types";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

import blueshirt from "../images/shirt_blue.svg";
import whiteshirt from "../images/shirt_white.svg";
import yellowshirt from "../images/shirt_yellow.svg";
import greenshirt from "../images/shirt_green.svg";

// Render all information about the player.
class PlayerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false
        };
    }

    shirt_color = color => {
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

    togglePopover() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    // Remove spacing in player name to create a unique id for the popover function
    createPopoverId(name) {
        if (name) {
            let splitname = name.split(" ");
            return splitname[0] + splitname[1];
        }
    }

    render() {
        if (this.props.playerDetails) {
            return (
                <div
                    id={this.createPopoverId(this.props.playerDetails.name)}
                    onClick={() => this.togglePopover()}
                    className={`col-3 player-col px-0 ${this.props.location}`}
                    key={this.props.playerDetails.id}
                >
                    {/* Popover for player details */}
                    <Popover
                        placement="bottom"
                        isOpen={this.state.popoverOpen}
                        target={this.createPopoverId(this.props.playerDetails.name)}
                        toggle={() => this.togglePopover()}
                    >
                        <PopoverHeader>{this.props.playerDetails.name}</PopoverHeader>
                        <PopoverBody>
                            <div>Games Played: {this.props.playerDetails.played}</div>
                            <div>Goals Scored: {this.props.playerDetails.goals}</div>
                            <div>Yellow Cards: {this.props.playerDetails.yellowCards}</div>
                            <div>Red Cards: {this.props.playerDetails.redCards}</div>
                        </PopoverBody>
                    </Popover>
                    {/* Player Shirt */}
                    <img
                        src={this.shirt_color(this.props.shirtcolor)}
                        alt=""
                        className="player-shirt p-0 mx-auto"
                    />
                    {/* Player Name */}
                    <div className="player-name">
                        <span className="badge badge-pill badge-secondary">
                            {this.props.playerDetails.name}
                        </span>
                    </div>
                </div>
            );
        } else {
            return "loading...";
        }
    }
}

PlayerInfo.propTypes = {
    playername: PropTypes.string,
    shirtcolor: PropTypes.string,
    location: PropTypes.string,
    playerId: PropTypes.string,
    playerDetails: PropTypes.object
};

export default PlayerInfo;
