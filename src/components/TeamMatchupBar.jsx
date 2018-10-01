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
    // Format date correctly before displaying it.
    const showDate = () => {
        if (information) {
            let datetime = information.date;
            let date = datetime.split("T")[0];
            let time = datetime.split("T")[1];
            let shortTime = time.split(":")[0] + ":" + time.split(":")[1];
            return (
                <div>
                    {date} <br /> {shortTime}
                </div>
            );
        }
    };
    return (
        <div className="row">
            <div className="col-12 col-lg-4 px-0 order-2 order-lg-1">
            <div>
                    <strong>Home Team</strong>
                </div>
                <button
                    onClick={activateHomeTeam}
                    type="button"
                    className="btn btn-outline-primary"
                >
                    <h2 className="my-0">{homeTeam}</h2>
                </button>
                <div>{homeFormation}</div>
            </div>

            <div className="col-12 col-lg-4 px-0 order-1 order-lg-2 ">
                <div>
                    <strong>Location</strong>
                </div>
                <h2>{information ? information.location : "loading.."}</h2>
                <div>{showDate()}</div>
            </div>

            <div className="col-12 col-lg-4 px-0 order-3 order-lg-3">
                <div>
                    <strong>Away Team</strong>
                </div>
                <button
                    onClick={activateAwayTeam}
                    type="button"
                    className="btn btn-outline-success"
                >
                    <h2 className="my-0">{awayTeam}</h2>
                </button>
                <div>{awayFormation}</div>
            </div>
        </div>
    );
};

TeamMatchupBar.propTypes = {
    homeTeam: PropTypes.string,
    awayTeam: PropTypes.string,
    homeFormation: PropTypes.string,
    awayFormation: PropTypes.string,
    activateHomeTeam: PropTypes.func,
    activateAwayTeam: PropTypes.func,
    information: PropTypes.object,
    teams: PropTypes.object
};

export default TeamMatchupBar;
