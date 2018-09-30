import React from "react";
import PropTypes from "prop-types";

const TeamMatchupBar = ({
    homeTeam,
    awayTeam,
    homeFormation,
    awayFormation,
    activateHomeTeam,
    activateAwayTeam,
    information
}) => {
    const showDate = () => {
        if (information) {
            let datetime = information.date;
            let date = datetime.split("T")[0];
            let time = datetime.split("T")[1];
            let shortTime =
                time.split(":")[0] +
                ":" +
                time.split(":")[1]
            return <div>{date} <br /> {shortTime}</div>
        }
    };
    return (
        <div>
            <div className="row">
                <div className="col">Home</div>
                <div className="col">Location</div>
                <div className="col">Away</div>
            </div>
            <div className="row">
                <div className="col">
                    <button
                        onClick={activateHomeTeam}
                        type="button"
                        className="btn btn-outline-primary"
                    >
                        <h2 className="my-0">{homeTeam}</h2>
                    </button>
                </div>
                <div className="col">
                    <h2>{information ? information.location : "loading.."}</h2>
                </div>
                <div className="col">
                    <button
                        onClick={activateAwayTeam}
                        type="button"
                        className="btn btn-outline-success"
                    >
                        <h2 className="my-0">{awayTeam}</h2>
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">{homeFormation}</div>
                <div className="col">{showDate()}</div>
                <div className="col">{awayFormation}</div>
            </div>
        </div>
    );
};

TeamMatchupBar.propTypes = {
    teams: PropTypes.object
};

export default TeamMatchupBar;
