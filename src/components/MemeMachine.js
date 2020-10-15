import React from "react";
import './meme.scss';
import { post } from 'axios';

export default class MemeMachine extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const vid = document.getElementById("v");
    const canvas = document.querySelector( 'canvas' );
    const context = canvas.getContext('2d');
    const cw = canvas.width = 500;
    const ch = canvas.height = Math.round(cw / 1.7777);

    vid.addEventListener('seeked', function() {
      context.drawImage(vid, 0, 0, cw, ch);
    });
  }

  saveCanvas() {
    const canvas = document.getElementById("c");
    canvas.crossOrigin = "anonymous";

    const image = new Image();
    image.crossOrigin = 'anonymous';  //<-- set here
    image.setAttribute('crossOrigin', 'anonymous');
    console.log(canvas);
    // the call below is the one that always returns: Tainted canvases may not be exported.
    image.src = canvas.toDataURL();

    const url = 'http://localhost:8000/upload';
    const formData = new FormData();
    formData.crossOrigin = "anonymous";
    formData.append('file', image);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return  post(url, formData,config)
  }


  render() {
    return (
        <div>
          <div className="row">
            <div>
              <button id="btn" onClick={this.saveCanvas}>SAVE</button>
            </div>
            <div className="column">
              <div>
                Video element:
              </div>
              <video controls height="120" id="v" tabIndex="-1" autobuffer="auto" preload="auto">
                <source type="video/webm" src="https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.webm"/>
              </video>
            </div>
            <div className="column">
              <div>
                Canvas element:
              </div>
              <div className='container'>
                <canvas id="c"></canvas>
                <div id="overlay">This is HTML overlay on top of the video! </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
