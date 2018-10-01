import React, { Component } from "react";
import axios from "axios";
import "./styles/App.css";

import PlayersRow from "./components/PlayersRow";
import TeamMatchupBar from "./components/TeamMatchupBar";

class App extends Component {
    state = {
        activeFixture: null,
        homeFormation: "loading...",
        awayFormation: "loading...",
        homeTeamIndex: 0,
        awayTeamIndex: 1,
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
        playersList.forEach(player => {
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
                response.data.teams.forEach(team => {
                    this.mapPlayers(team.players, response.data.teams.indexOf(team));

                    if (team.homeTeam === true) {
                        this.setState({
                            homeTeam: team.name,
                            homeFormation: team.formation,
                            homeTeamIndex: response.data.teams.indexOf(team)
                        });
                    } else {
                        this.setState({
                            awayTeam: team.name,
                            awayFormation: team.formation,
                            awayTeamIndex: response.data.teams.indexOf(team)
                        });
                    }
                });
            });
    }

    playerRow(loc) {
        return (
            <PlayersRow
                location={loc}
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
        );
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
                        activateHomeTeam={() => this.changeActiveTeam(this.state.homeTeamIndex)}
                        activateAwayTeam={() => this.changeActiveTeam(this.state.awayTeamIndex)}
                    />
                </div>
                <div className="container game-container p-0">
                    {/* Front row */}
                    {this.playerRow("front-row")}
                    {/* Center row */}
                    {this.playerRow("center-row")}
                    {/* Back row */}
                    {this.playerRow("back-row")}
                    {/* Keeper row */}
                    {this.playerRow("goalkeeper-row")}
                </div>
            </div>
        );
    }
}

export default App;
