import React, { Component } from "react";
import { FaTwitter, FaRss, FaSoundcloud, FaItunes } from "react-icons/fa";
import "./App.css";
import { PodcastList } from "./PodcastList";

const views = {
  none: "views/none",
  loading: "views/loading",
  podcasts: "views/podcasts"
};

const Header = () => {
  return (
    <header className="flex items-center flex-wrap">
      <h1 className="ph2 f2 fw2 dib">Ship It or Skip It</h1>
      <h2 className="dib f3 ph3 fw4 mv0 black-70">Episodes</h2>
      <nav className="flex end pr4">
        <a className="mh2 light-blue" href="https://twitter.com/shipitskipit">
          <FaTwitter />
        </a>
        <a
          className="pink mh2"
          href="http://feeds.soundcloud.com/users/soundcloud:users:459265953/sounds.rss"
        >
          <FaRss />
        </a>
        <a
          className="orange mh2"
          href="https://soundcloud.com/user-976169639-857990188"
        >
          <FaSoundcloud />
        </a>
        <a
          className="light-purple mh2"
          href="https://itunes.apple.com/us/podcast/id1396922930"
        >
          <FaItunes />
        </a>
        <a
          className="link blue mh2"
          href="https://www.stitcher.com/podcast/alex-lee/ship-it-or-skip-it"
        >
          Stitcher
        </a>
      </nav>
    </header>
  );
};
const ErrorView = ({ message }) => {
  return (
    <section className="vh-100 bg-washed-blue baskerville">
      <header className="tc ph5 lh-copy">
        <h1 className="f1 f-headline-l code mb3 fw9 dib tracked-tight light-purple">
          <span role="img" aria-label="sad">
            😢
          </span>
        </h1>
        <h2 className="tc f1-l fw1">{message}</h2>
      </header>
      <p className="fw1 i tc mt4 mt5-l f4 f3-l">
        DM us on{" "}
        <a
          className="hover-pink link light-purple"
          href="https://twitter.com/shipitskipit"
        >
          twitter
        </a>, and maybe one of these links below can help?
      </p>
      <ul className="list tc pl0 w-100 mt5">
        <li className="dib">
          <a
            className="f5 f4-ns link black db pv2 ph3 hover-light-purple"
            href="http://feeds.soundcloud.com/users/soundcloud:users:459265953/sounds.rss"
          >
            RSS
          </a>
        </li>
        <li className="dib">
          <a
            className="f5 f4-ns link black db pv2 ph3 hover-light-purple"
            href="https://soundcloud.com/user-976169639-857990188"
          >
            Soundcloud
          </a>
        </li>
        <li className="dib">
          <a
            className="f5 f4-ns link black db pv2 ph3 hover-light-purple"
            href="https://www.stitcher.com/podcast/alex-lee/ship-it-or-skip-it"
          >
            Stitcher
          </a>
        </li>
        <li className="dib">
          <a
            className="f5 f4-ns link black db pv2 ph3 hover-light-purple"
            href="https://itunes.apple.com/us/podcast/id1396922930"
          >
            iTunes
          </a>
        </li>
      </ul>
    </section>
  );
};
class App extends Component {
  state = {
    view: views.none,
    error: null,
    message: null,
    episodes: []
  };
  componentDidMount() {
    this.getEpisodes();
  }

  getEpisodes() {
    const rssUrl =
      "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.soundcloud.com%2Fusers%2Fsoundcloud%3Ausers%3A459265953%2Fsounds.rss";
    fetch(rssUrl)
      .then(response => response.json())
      .then(json => {
        if (json.status !== "ok")
          this.setState({
            error: true,
            view: "views/error",
            message: "We couldn't load the podcast episodes."
          });
        const { items } = json;
        console.log(items);
        this.setState({
          view: views.podcasts,
          episodes: items
        });
      });
  }
  render() {
    const { view, message, episodes } = this.state;
    const maybeShowView = currentView => (view, component) =>
      currentView === view && component;
    const showView = maybeShowView(view);
    return (
      <React.Fragment>
        {showView(views.error, <ErrorView message={message} />)}
        {showView(
          views.podcasts,
          <React.Fragment>
            <Header />
            <PodcastList data={episodes} />
          </React.Fragment>
        )}
        {showView(
          views.loading,
          <React.Fragment>
            <Header />
            <article>
              <div className="cf pa2">loading podcasts ...</div>
            </article>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default App;
