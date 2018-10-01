import React, { Component } from "react";
import axios from "axios";
import "./styles/App.css";

import PlayersRow from "./components/PlayersRow";
import TeamMatchupBar from "./components/TeamMatchupBar";
// import PlayerInfoPopover from "./components/PlayerInfoPopover";

class App extends Component {
    state = {
        activeFixture: null,
        homeFormation: "loading...",
        awayFormation: "loading...",
        activeTeam: 0,
        playerDetails: [],
        teamColors: {
            "Cardiff City": {
                goalkeeper: "yellow",
                player: "blue"
            },
            "Swansea City": {
                goalkeeper: "green",
                player: "white"
            }
        }
    };

    changeActiveTeam(teamIndex) {
        this.setState({
            activeTeam: teamIndex
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
                this.setState({
                    activeFixture: response.data
                });
                response.data.teams.map(team => {
                    this.mapPlayers(team.players, response.data.teams.indexOf(team));

                    if (team.homeTeam === true) {
                        this.setState({
                            homeTeam: team.name,
                            homeFormation: team.formation
                        });
                    } else {
                        this.setState({
                            awayTeam: team.name,
                            awayFormation: team.formation
                        });
                    }
                    return 0;
                });
            });
    }

    render() {
        return (
            <div className="App col-8 mx-auto">
                <div className="container border border-secondary">
                    <TeamMatchupBar
                        information={this.state.activeFixture}
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
                    <PlayersRow
                        location={"front-row"}
                        playerPositions={
                            this.state.activeFixture
                                ? this.state.activeFixture.teams[this.state.activeTeam].players
                                : null
                        }
                        playerDetails={this.state.playerDetails ? this.state.playerDetails : null}
                        teamName={
                            this.state.activeFixture
                                ? this.state.activeFixture.teams[this.state.activeTeam].name
                                : null
                        }
                        teamColors={this.state.teamColors}
                    />
                    {/* Center */}
                    <PlayersRow
                        location={"center-row"}
                        playerPositions={
                            this.state.activeFixture
                                ? this.state.activeFixture.teams[this.state.activeTeam].players
                                : null
                        }
                        playerDetails={this.state.playerDetails ? this.state.playerDetails : null}
                        teamName={
                            this.state.activeFixture
                                ? this.state.activeFixture.teams[this.state.activeTeam].name
                                : null
                        }
                        teamColors={this.state.teamColors}
                    />
                    {/* Back */}
                    <PlayersRow
                        location={"back-row"}
                        playerPositions={
                            this.state.activeFixture
                                ? this.state.activeFixture.teams[this.state.activeTeam].players
                                : null
                        }
                        playerDetails={this.state.playerDetails ? this.state.playerDetails : null}
                        teamName={
                            this.state.activeFixture
                                ? this.state.activeFixture.teams[this.state.activeTeam].name
                                : null
                        }
                        teamColors={this.state.teamColors}
                    />
                    {/* Keeper */}
                    <PlayersRow
                        location={"goalkeeper-row"}
                        playerPositions={
                            this.state.activeFixture
                                ? this.state.activeFixture.teams[this.state.activeTeam].players
                                : null
                        }
                        playerDetails={this.state.playerDetails ? this.state.playerDetails : null}
                        teamName={
                            this.state.activeFixture
                                ? this.state.activeFixture.teams[this.state.activeTeam].name
                                : null
                        }
                        teamColors={this.state.teamColors}
                    />
                </div>
            </div>
        );
    }
}

export default App;
