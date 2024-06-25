import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AlbumDetails from './AlbumDetails';
import Listennow from './Listennow';
import Header from './Header';
import BrowseNow from './BrowseNow';
import Sidebar from './Sidebar';
import Music from './Music';
import './Home.css';

const Home = () => {
  const [currentSong, setCurrentSong] = useState({
    link: null,
    image: null,
    title: null,
    songData: null,
    songArray:null,
  });

  // Define and populate the songSources array
  const [songSources, setSongSources] = useState([]);

  // Fetch song sources from your API here and populate songSources

  return (
    <Router>
      <div className='home'>
        <Grid container>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
            <Header currentSong={currentSong} />
            <Switch>
              <Route path="/Listen" component={Listennow} />
              <Route path="/browse" component={BrowseNow} />
              <Route
                path="/album/:id"
                render={(props) => (
                  <AlbumDetails
                    {...props}
                    setCurrentSong={setCurrentSong}
                  />
                )}
              />
              {/* Pass songSources to the Music component */}
              <Route
                exact
                path="/music"
                render={(props) => (
                  <Music songSources={songSources} />
                )}
              />
              <Redirect exact from="/" to="/Listen" />
            </Switch>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default Home;
