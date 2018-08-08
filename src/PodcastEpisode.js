import React from "react";

export const PodcastEpisode = ({ link, logo, artist, title }) => {
  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <a href={link} className="db link dim tc">
        <img
          src={logo}
          alt="Ship It Or Skip It logo"
          className="w-100 db outline black-10"
        />
        <dl className="mt2 f6 lh-copy">
          <dt className="clip">Title</dt>
          <dd className="ml0 black truncate w-100">{title}</dd>
          <dt className="clip">Artist</dt>
          <dd className="ml0 gray truncate w-100">{artist}</dd>
        </dl>
      </a>
    </div>
  );
};
