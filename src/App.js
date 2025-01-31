import React, {  useEffect, useState } from "react";
import injectSheet  from "react-jss";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {toggleTitleColor} from './store';
import MemeMachine from './components/MemeMachine';


const styles = theme => ({
  '@global body': {
    background: theme.palette.background,
    color: theme.palette.text
  },
  App: {
    padding: '20px',
    background: 'black',
    maxWidth: '800px',
    minHeight: '600px',
    margin: 'auto',
    '&  h1': {
      fontSize: '5rem',
      textAlign: 'center',
      fontFamily: 'serif',
      cursor: 'pointer'
    },
    '& input': {
      margin: '10px'
    },
    '& a': {
      color: theme.palette.text,
    },
    '& figcaption': {
      fontFamily: 'serif',
      textAlign: 'center',
      fontSize: '2rem',
      '&:before, &:after':{
        display: 'inline',
        content: "\""
      }
    }
  },
  'title-primary': {
    color: theme.palette.primary
  },
  'title-secondary': {
    color: theme.palette.secondary
  },


});

const stp = (state) => ({
  titleColor: state.memeState.titleColor
})

const dtp = (dispatch) => bindActionCreators( {
  toggleTitleColor: () => toggleTitleColor()
}, dispatch)

export const App = (props) => {

    const { classes, titleColor, toggleTitleColor } = props;

    const [memes, setMemes] = useState([]);

    useEffect( () => {
      fetch('http://localhost:8000/api/memes/').then( res => res.json()).then( setMemes);
    }, [])

    console.info("memes", memes)

    return (
      <div className={classes.App}>
        <header className="App-header">
          <h1 onClick={toggleTitleColor} className={ classes[`title-${titleColor}`] }>Vintage Meme Machine</h1>
        </header>
        <main>
          <Switch>
            <Route path="/" exact>
              <>
                <video
                  width="800"
                  height="450"
                  playsInline
                  autoPlay
                  muted
                  loop
                >
                  <source
                    src="https://upload.wikimedia.org/wikipedia/en/transcoded/6/61/Old_Man_Drinking_a_Glass_of_Beer_%281897%29.webm/Old_Man_Drinking_a_Glass_of_Beer_%281897%29.webm.360p.webm"
                    type="video/webm"
                  />
                </video>
                <label>
                  Meme text:
                  <input type="text" placeholder="Something edgy..." />
                </label>
              </>
            </Route>
            <Route path="/memes">
              <>
                <ul>
                  {memes.map( (meme) => {
                    return (
                    <li>
                      <figure>
                      <img src={meme.image} alt="meme image" />
                      <figcaption>{meme.text}</figcaption>
                      </figure>
                    </li>
                    )
                  })}
                </ul>
              </>
            </Route>
            <Route path="/readme">
              <section>
                <h2>Devtest Readme</h2>
                <p>
                  Hello candidate, Welcome to our little dev test. The goal of
                  this exercise, is to asses your general skill level, and give
                  us something to talk about at our next appointment.
                </p>
                <section>
                  <h3>What this app should do</h3>
                  <p>
                    We'd like for you to build a tiny app called the "Vintage Meme
                    Machine". It will be a tool that allows users to overlay text
                    on a video, and capture or share it.
                  </p>
                  <p>These are the basic requirements:</p>
                  <ul>
                    <li>User can pick a point in the video</li>
                    <li>
                      User can enter text that is placed over the video <em>still</em>
                    </li>
                    <li>
                      User can save this personalized content to the server, for later use
                    </li>
                    <li>
                      User can retrieve her meme via an url
                    </li>
                  </ul>
                </section>
                <section>
                  <h3>What we want you to do</h3>
                  <p>
                    Off course we don't expect you to build a full fledged app
                    in such a short time frame.
                  </p>
                  <p>
                    But we would like for you to get in the basic requirements,
                    in one form or another. Beyond that feel free to show off
                    your strenghts as a developer.
                  </p>
                  <p>Some ideas:</p>
                  <ul>
                    <li>Make it look really nice</li>
                    <li>Allow users to provide a custom video</li>
                    <li>Make the server secure enough to deploy</li>
                    <li>Download the meme as an image file</li>
                    <li>Add super cool text effects to the text overlay</li>
                    <li>Push the resulting meme to a social media API</li>
                  </ul>
                </section>
                <section>
                  <p>
                    P.s. We've already added some libraries to make your life
                    easier (Create React App, Redux, Jss, React Router, Express), but feel free to add
                    more.
                  </p>
                </section>
              </section>
            </Route>
            <Route path="/machine">
              <MemeMachine/>
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
        <footer>
          <nav>
            <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/memes">Memes</Link></li>
            <li><Link to="/readme">Readme</Link></li>
            <li><Link to="/machine">Machine</Link></li>
            </ul>
          </nav>
        </footer>
      </div>
    );
};


export default connect(stp,dtp)(injectSheet(styles)(App));
