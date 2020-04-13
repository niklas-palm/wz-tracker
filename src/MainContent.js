import React, { useEffect, useState } from "react";

import { getStats } from "./getStats";
import "./styles/MainContent.scss";

const MainContent = () => {
  const [playerStats, setPlayerStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getStats();
      console.log(stats);
      setPlayerStats(stats);
    };
    fetchStats();
    // Update the document title using the browser API
  }, []);

  const RenderCard = ({ metric, transform, title }) => {
    let tempObj = {};

    // Fetch relevant stats from state
    if (metric === "avgKills") {
      playerStats.forEach((player) => {
        tempObj[player["gamer_tag"]] =
          player["stats"]["br"]["kills"] / player["stats"]["br"]["gamesPlayed"];
      });
    } else {
      playerStats.forEach((player) => {
        tempObj[player["gamer_tag"]] = player["stats"]["br"][metric];
      });
    }

    // Sort
    let keysSorted = Object.keys(tempObj).sort(function (a, b) {
      return tempObj[b] - tempObj[a];
    });

    // Function to return a row per player
    const renderRow = (name, value) => {
      let val = value;

      if (transform) {
        val = transform(value);
      }

      return (
        <div key={name} className="Row">
          <div className="Left">{name}</div>
          <div className="Right">{val}</div>
        </div>
      );
    };

    return (
      <div className="Card">
        <h3>{title ? title : metric}</h3>
        <div className="Table">
          {keysSorted.map((player) => {
            return renderRow(player, tempObj[player]);
          })}
        </div>
      </div>
    );
  };

  const renderCards = () => {
    return (
      <div className="Wrapper">
        <RenderCard metric="wins" title="Wins" />
        <RenderCard metric="topFive" title="# Top Five" />
        <RenderCard
          metric="avgKills"
          title="Avg Kills/Game"
          transform={(val) => {
            if (val % 1 !== 0) {
              return val.toFixed(2);
            }
          }}
        />
        <RenderCard
          metric="timePlayed"
          title="Time Played"
          transform={(val) => {
            return (val / 3600).toFixed(2) + "h";
          }}
        />
        <RenderCard
          metric="kdRatio"
          title="K/D"
          transform={(val) => {
            if (val % 1 !== 0) {
              return val.toFixed(2);
            }
          }}
        />
        <RenderCard metric="kills" title="Kills" />
        <RenderCard
          metric="scorePerMinute"
          title="Score/min"
          transform={(val) => {
            if (val % 1 !== 0) {
              return val.toFixed(2);
            }
          }}
        />
        <RenderCard metric="contracts" title="Contracts" />
      </div>
    );
  };

  const renderContent = () => {
    if (playerStats) {
      return renderCards();
    } else {
      return <p>Loading...</p>;
    }
  };

  return renderContent();
};

export default MainContent;
