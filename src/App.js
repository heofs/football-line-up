import React, { Component } from "react";
import axios from "axios";
import "./styles/App.css";

import PlayerRow from "./components/PlayerRow";
import TeamMatchupBar from "./components/TeamMatchupBar";

class App extends Component {
    state = {
        activeFixture: null,
        homeTeam: null,
        awayTeam: null,
        homeFormation: null,
        awayFormation: null,
        homePlayers: [],
        awayPlayers: [],
        activeTeam: 0,
        homeJSONIndex: null,
        awayJSONIndex: null,
        activeForwardPlayers: [],
        activeCenterPlayers: [],
        activeBackPlayers: [],
        activeGoalkeeper: [],
        playerDetails: []
    };

    changeActiveTeam(teamIndex) {
        this.setState({
            activeTeam: teamIndex,
            activeForwardPlayers: [],
            activeCenterPlayers: [],
            activeBackPlayers: [],
            activeGoalkeeper: []
        });
    }

    mapPlayers(playersList, arr) {
        playersList.map(player => {
            axios
                .get("http://dev.webuildbots.ai:9123/players", {
                    params: {
                        token: "eFExWCgsmCX066dKSsJVmGu2HUYATekkGFcxbgnIfjPTtQ67JZrWjDnmwS3dn93p",
                        playerId: player.playerId
                    }
                })
                .then(response => {
                    this.setState({
                        playerDetails: [...this.state.playerDetails, response.data]
                    });
                });
            return 0;
        });
    }

    componentDidMount() {
        axios
            .get("http://dev.webuildbots.ai:9123/fixtures", {
                params: {
                    token: "eFExWCgsmCX066dKSsJVmGu2HUYATekkGFcxbgnIfjPTtQ67JZrWjDnmwS3dn93p",
                    fixtureId: 1234567
                }
            })
            .then(response => {
                // console.log(response.data.teams[0].name);
                this.setState({
                    activeFixture: response.data
                });
                response.data.teams.map(team => {
                    // this.setState;
                    this.mapPlayers(team.players, response.data.teams.indexOf(team));

                    if (team.homeTeam === true) {
                        this.setState({
                            homeTeam: team.name,
                            homeFormation: team.formation,
                            homeJSONIndex: response.data.teams.indexOf(team)
                        });
                    } else {
                        this.setState({
                            awayTeam: team.name,
                            awayFormation: team.formation,
                            awayJSONIndex: response.data.teams.indexOf(team)
                        });
                    }
                    return 0;
                });
            });
    }

    // playerSort(pos) {
    //     if (this.state.activeFixture) {
    //         return this.state.activeFixture.teams[this.state.activeTeam].players.map(player => {
    //             console.log(player)
    // return player.position;
    // this.state.playerDetails.map(element => {
    // console.log(element);
    // if (element.id === player.playerId) {
    //     if (player.position === "FW") {
    //         return element;
    //         // return ({
    //         //     id: element.id,
    //         //     name: element.name,
    //         //     position: player.position
    //         // });
    //     }
    // } else if (pos === "middle" && player.position.split("")[1] === "M") {
    //     // console.log(name);
    // } else if (pos === "back" && player.position.split("")[1] === "B") {
    //     // return { name };
    // } else if (pos === "goal" && player.position === "GK") {
    //     // return {};
    // }
    // }
    //             });
    //         });
    //     }
    // }

    render() {
        return (
            <div className="App col-8 mx-auto">
                {/* {console.log(
                    this.state.teamDetails
                        ? this.state.teamDetails[this.state.activeTeam]
                        : "Loading..."
                )} */}

                <div className="container border border-secondary">
                    <TeamMatchupBar
                        homeTeam={this.state.homeTeam}
                        awayTeam={this.state.awayTeam}
                        homeFormation={this.state.homeFormation}
                        awayFormation={this.state.awayFormation}
                        activateHomeTeam={() => this.changeActiveTeam(0)}
                        activateAwayTeam={() => this.changeActiveTeam(1)}
                    />
                </div>

                <div className="container game-container p-0">
                    {/* Front */}
                    <PlayerRow
                        location={"front-row"}
                        playerPositions={
                            this.state.activeFixture
                                ? this.state.activeFixture.teams[this.state.activeTeam].players
                                : null
                        }
                        playerDetails={this.state.playerDetails ? this.state.playerDetails : null}
                    />
                    {/* Center */}
                    {/* <PlayerRow location={"center-row"} players={this.state.activeFixture.teams[this.state.activeTeam].players} /> */}
                    {/* Back */}
                    {/* <PlayerRow location={"back-row"} players={this.state.activeFixture.teams[this.state.activeTeam].players} /> */}
                    {/* Keeper */}
                    {/* <PlayerRow location={"goalkeeper-row"} players={this.state.activeFixture.teams[this.state.activeTeam].players} /> */}
                </div>
                <div className="container table-container">
                    <h1>Table goes here</h1>
                </div>
            </div>
        );
    }
}

export default App;
