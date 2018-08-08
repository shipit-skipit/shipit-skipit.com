import React from "react";
import { PodcastEpisode } from "./PodcastEpisode";
import logo from "./ship_skip_podcast_logo.jpg";

export const PodcastList = ({ data }) => {
  return (
    <div className="cf pa2">
      {data.map((ep, key) => (
        <PodcastEpisode
          key={key}
          link={ep.link}
          artist={ep.author}
          title={ep.title}
          logo={logo}
        />
      ))}
      <div className="o-50">
        <PodcastEpisode
          link="https://soundcloud.com/user-976169639-857990188"
          artist="Alex and Nagee, ft. ?"
          title="Coming Soon!"
          logo={logo}
        />
      </div>
    </div>
  );
};
