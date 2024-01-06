import { createGlobalStyle, keyframes } from 'styled-components';

const progress = keyframes`
  to {
      background-position: 25px 0
  }
`;

export default createGlobalStyle`
.plyr input[type=range]:focus,.plyr:focus {
  outline: 0
}

.plyr .plyr__video-embed iframe,.plyr__tooltip {
  pointer-events: none
}

.plyr {
  position: relative;
  max-width: 100%;
  min-width: 200px;
  font-family: Avenir,'Avenir Next','Helvetica Neue','Segoe UI',Helvetica,Arial,sans-serif;
  direction: ltr
}

.plyr a,.plyr button,.plyr input,.plyr label {
  -ms-touch-action: manipulation;
  touch-action: manipulation
}

.plyr audio,.plyr video {
  width: 100%;
  height: auto;
  vertical-align: middle;
  border-radius: inherit
}

.plyr input[type=range] {
  display: block;
  height: 20px;
  width: 100%;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  border: none;
  background: 0 0
}

.plyr input[type=range]::-webkit-slider-runnable-track {
  height: 8px;
  background: 0 0;
  border: 0;
  border-radius: 4px;
  -webkit-user-select: none;
  user-select: none
}

.plyr input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  margin-top: -4px;
  position: relative;
  height: 16px;
  width: 16px;
  background: #fff;
  border: 2px solid transparent;
  border-radius: 100%;
  transition: background .2s ease,border .2s ease,transform .2s ease;
  box-shadow: 0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.15);
  box-sizing: border-box
}

.plyr input[type=range]::-moz-range-track {
  height: 8px;
  background: 0 0;
  border: 0;
  border-radius: 4px;
  -moz-user-select: none;
  user-select: none
}

.plyr input[type=range]::-moz-range-thumb {
  position: relative;
  height: 16px;
  width: 16px;
  background: #fff;
  border: 2px solid transparent;
  border-radius: 100%;
  transition: background .2s ease,border .2s ease,transform .2s ease;
  box-shadow: 0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.15);
  box-sizing: border-box
}

.plyr input[type=range]::-ms-track {
  height: 8px;
  background: 0 0;
  border: 0;
  color: transparent
}

.plyr input[type=range]::-ms-fill-upper {
  height: 8px;
  background: 0 0;
  border: 0;
  border-radius: 4px;
  -ms-user-select: none;
  user-select: none
}

.plyr input[type=range]::-ms-fill-lower {
  height: 8px;
  border: 0;
  border-radius: 4px;
  -ms-user-select: none;
  user-select: none;
  background: #3498db
}

.plyr input[type=range]::-ms-thumb {
  position: relative;
  height: 16px;
  width: 16px;
  background: #fff;
  border: 2px solid transparent;
  border-radius: 100%;
  transition: background .2s ease,border .2s ease,transform .2s ease;
  box-shadow: 0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.15);
  box-sizing: border-box;
  margin-top: 0
}

.plyr input[type=range]::-ms-tooltip {
  display: none
}

.plyr input[type=range]::-moz-focus-outer {
  border: 0
}

.plyr input[type=range].tab-focus:focus {
  outline-offset: 3px
}

.plyr input[type=range]:active::-webkit-slider-thumb {
  background: #3498db;
  border-color: #fff;
  transform: scale(1.25)
}

.plyr input[type=range]:active::-moz-range-thumb {
  background: #3498db;
  border-color: #fff;
  transform: scale(1.25)
}

.plyr input[type=range]:active::-ms-thumb {
  background: #3498db;
  border-color: #fff;
  transform: scale(1.25)
}

.plyr--video input[type=range].tab-focus:focus {
  outline: rgba(255,255,255,.5) dotted 1px
}

.plyr--audio input[type=range].tab-focus:focus {
  outline: rgba(86,93,100,.5) dotted 1px
}

.plyr__sr-only {
  clip: rect(1px,1px,1px,1px);
  overflow: hidden;
  position: absolute!important;
  padding: 0!important;
  border: 0!important;
  height: 1px!important;
  width: 1px!important
}

.plyr__video-wrapper {
  position: relative;
  background: #000;
  border-radius: inherit
}

.plyr__video-embed {
  padding-bottom: 56.25%;
  height: 0;
  border-radius: inherit;
  overflow: hidden;
  z-index: 0
}

.plyr__video-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.plyr__video-embed>div {
  position: relative;
  padding-bottom: 200%;
  transform: translateY(-35.95%)
}

.plyr video::-webkit-media-text-track-container {
  display: none
}

.plyr__captions {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  transform: translateY(-40px);
  transition: transform .3s ease;
  color: #fff;
  font-size: 16px;
  text-align: center;
  font-weight: 400
}

.plyr__captions span {
  border-radius: 2px;
  padding: 3px 10px;
  background: rgba(0,0,0,.7);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  line-height: 150%
}

.plyr__captions span:empty {
  display: none
}

@media (min-width: 768px) {
  .plyr__captions {
      font-size:24px
  }
}

.plyr--captions-active .plyr__captions {
  display: block
}

.plyr--hide-controls .plyr__captions {
  transform: translateY(-15px)
}

@media (min-width: 1024px) {
  .plyr--fullscreen-active .plyr__captions {
      font-size:32px
  }
}

.plyr ::-webkit-media-controls {
  display: none
}

.plyr__controls {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  line-height: 1;
  text-align: center
}

.plyr__controls .plyr__progress,.plyr__controls .plyr__time,.plyr__controls>button {
  margin-left: 5px
}

.plyr__controls .plyr__progress:first-child,.plyr__controls .plyr__time:first-child,.plyr__controls>button:first-child {
  margin-left: 0
}

.plyr__controls .plyr__volume {
  margin-left: 5px
}

.plyr__controls [data-plyr=pause] {
  margin-left: 0
}

.plyr__controls button {
  position: relative;
  display: inline-block;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  overflow: visible;
  vertical-align: middle;
  padding: 7px;
  border: 0;
  background: 0 0;
  border-radius: 3px;
  cursor: pointer;
  transition: background .3s ease,color .3s ease,opacity .3s ease;
  color: inherit
}

.plyr__controls button svg {
  width: 18px;
  height: 18px;
  display: block;
  fill: currentColor
}

.plyr__controls button:focus {
  outline: 0
}

.plyr__controls .icon--captions-on,.plyr__controls .icon--exit-fullscreen,.plyr__controls .icon--muted {
  display: none
}

@media (min-width: 480px) {
  .plyr__controls .plyr__progress,.plyr__controls .plyr__time,.plyr__controls>button {
      margin-left:10px
  }
}

.plyr--hide-controls .plyr__controls {
  opacity: 0;
  pointer-events: none
}

.plyr--video .plyr__controls {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 50px 10px 10px;
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.5));
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  color: #fff;
  transition: opacity .3s ease
}

.plyr--video .plyr__controls button.tab-focus:focus,.plyr--video .plyr__controls button:hover {
  background: #3498db;
  color: #fff
}

.plyr--audio .plyr__controls {
  padding: 10px;
  border-radius: inherit;
  background: #fff;
  border: 1px solid #dbe3e8;
  color: #565D64
}

.plyr--audio .plyr__controls button.tab-focus:focus,.plyr--audio .plyr__controls button:hover,.plyr__play-large {
  background: #3498db;
  color: #fff
}

.plyr__play-large {
  display: none;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 10px;
  border: 4px solid currentColor;
  border-radius: 100%;
  box-shadow: 0 1px 1px rgba(0,0,0,.15);
  transition: all .3s ease
}

.plyr__play-large svg {
  position: relative;
  left: 2px;
  width: 20px;
  height: 20px;
  display: block;
  fill: currentColor
}

.plyr__play-large:focus {
  outline: rgba(255,255,255,.5) dotted 1px
}

.plyr .plyr__play-large {
  display: inline-block
}

.plyr--audio .plyr__play-large,.plyr--playing .plyr__controls [data-plyr=play],.plyr__controls [data-plyr=pause] {
  display: none
}

.plyr--playing .plyr__play-large {
  opacity: 0;
  visibility: hidden
}

.plyr--playing .plyr__controls [data-plyr=pause] {
  display: inline-block
}

.plyr--captions-active .plyr__controls .icon--captions-on,.plyr--fullscreen-active .icon--exit-fullscreen,.plyr--muted .plyr__controls .icon--muted {
  display: block
}

.plyr [data-plyr=captions],.plyr [data-plyr=fullscreen],.plyr--captions-active .plyr__controls .icon--captions-on+svg,.plyr--fullscreen-active .icon--exit-fullscreen+svg,.plyr--muted .plyr__controls .icon--muted+svg {
  display: none
}

.plyr--captions-enabled [data-plyr=captions],.plyr--fullscreen-enabled [data-plyr=fullscreen] {
  display: inline-block
}

.plyr__tooltip {
  position: absolute;
  z-index: 2;
  bottom: 100%;
  margin-bottom: 10px;
  padding: 5px 7.5px;
  opacity: 0;
  background: rgba(0,0,0,.7);
  border-radius: 3px;
  color: #fff;
  font-size: 14px;
  line-height: 1.3;
  transform: translate(-50%,10px) scale(.8);
  transform-origin: 50% 100%;
  transition: transform .2s .1s ease,opacity .2s .1s ease
}

.plyr__tooltip::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: 50%;
  transform: translateX(-50%);
  bottom: -4px;
  border-right: 4px solid transparent;
  border-top: 4px solid rgba(0,0,0,.7);
  border-left: 4px solid transparent;
  z-index: 2
}

.plyr button.tab-focus:focus .plyr__tooltip,.plyr button:hover .plyr__tooltip,.plyr__tooltip--visible {
  opacity: 1;
  transform: translate(-50%,0) scale(1)
}

.plyr button:hover .plyr__tooltip {
  z-index: 3
}

.plyr__controls button:first-child .plyr__tooltip {
  left: 0;
  transform: translate(0,10px) scale(.8);
  transform-origin: 0 100%
}

.plyr__controls button:first-child .plyr__tooltip::before {
  left: 16px
}

.plyr__controls button:last-child .plyr__tooltip {
  right: 0;
  transform: translate(0,10px) scale(.8);
  transform-origin: 100% 100%
}

.plyr__controls button:last-child .plyr__tooltip::before {
  left: auto;
  right: 16px;
  transform: translateX(50%)
}

.plyr__controls button:first-child .plyr__tooltip--visible,.plyr__controls button:first-child.tab-focus:focus .plyr__tooltip,.plyr__controls button:first-child:hover .plyr__tooltip,.plyr__controls button:last-child .plyr__tooltip--visible,.plyr__controls button:last-child.tab-focus:focus .plyr__tooltip,.plyr__controls button:last-child:hover .plyr__tooltip {
  transform: translate(0,0) scale(1)
}

.plyr__progress {
  position: relative;
  display: none;
  -ms-flex: 1;
  flex: 1
}

.plyr__progress input[type=range] {
  position: relative;
  z-index: 2
}

.plyr__progress input[type=range]::-webkit-slider-runnable-track {
  background: 0 0
}

.plyr__progress input[type=range]::-moz-range-track {
  background: 0 0
}

.plyr__progress input[type=range]::-ms-fill-upper {
  background: 0 0
}

.plyr__progress .plyr__tooltip {
  left: 0
}

.plyr .plyr__progress {
  display: inline-block
}

.plyr__progress--buffer,.plyr__progress--played,.plyr__volume--display {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 8px;
  margin: -4px 0 0;
  padding: 0;
  vertical-align: top;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 100px
}

.plyr__progress--buffer::-webkit-progress-bar,.plyr__progress--played::-webkit-progress-bar,.plyr__volume--display::-webkit-progress-bar {
  background: 0 0
}

.plyr__progress--buffer::-webkit-progress-value,.plyr__progress--played::-webkit-progress-value,.plyr__volume--display::-webkit-progress-value {
  background: currentColor;
  border-radius: 100px;
  min-width: 8px
}

.plyr__progress--buffer::-moz-progress-bar,.plyr__progress--played::-moz-progress-bar,.plyr__volume--display::-moz-progress-bar {
  background: currentColor;
  border-radius: 100px;
  min-width: 8px
}

.plyr__progress--buffer::-ms-fill,.plyr__progress--played::-ms-fill,.plyr__volume--display::-ms-fill {
  border-radius: 100px
}

.plyr__progress--played,.plyr__volume--display {
  z-index: 1;
  color: #3498db;
  background: 0 0;
  transition: none
}

.plyr__progress--played::-webkit-progress-value,.plyr__volume--display::-webkit-progress-value {
  min-width: 8px;
  max-width: 99%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: none
}

.plyr__progress--played::-moz-progress-bar,.plyr__volume--display::-moz-progress-bar {
  min-width: 8px;
  max-width: 99%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: none
}

.plyr__progress--played::-ms-fill,.plyr__volume--display::-ms-fill {
  display: none
}

.plyr__progress--buffer::-webkit-progress-value {
  transition: width .2s ease
}

.plyr__progress--buffer::-moz-progress-bar {
  transition: width .2s ease
}

.plyr__progress--buffer::-ms-fill {
  transition: width .2s ease
}

.plyr--video .plyr__progress--buffer,.plyr--video .plyr__volume--display {
  background: rgba(255,255,255,.25)
}

.plyr--video .plyr__progress--buffer {
  color: rgba(255,255,255,.25)
}

.plyr--audio .plyr__progress--buffer,.plyr--audio .plyr__volume--display {
  background: rgba(198,214,219,.66)
}

.plyr--audio .plyr__progress--buffer {
  color: rgba(198,214,219,.66)
}

.plyr--loading .plyr__progress--buffer {
  animation: ${progress} 1s linear infinite;
  background-size: 25px 25px;
  background-repeat: repeat-x;
  background-image: linear-gradient(-45deg,rgba(0,0,0,.15) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.15) 50%,rgba(0,0,0,.15) 75%,transparent 75%,transparent);
  color: transparent
}

.plyr--video.plyr--loading .plyr__progress--buffer {
  background-color: rgba(255,255,255,.25)
}

.plyr--audio.plyr--loading .plyr__progress--buffer {
  background-color: rgba(198,214,219,.66)
}

.plyr__time {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px
}

.plyr__time+.plyr__time {
  display: none
}

@media (min-width: 768px) {
  .plyr__time+.plyr__time {
      display:inline-block
  }
}

.plyr__time+.plyr__time::before {
  content: "\\2044";
  margin-right: 10px
}

.plyr__volume {
  display: none
}

.plyr .plyr__volume {
  -ms-flex: 1;
  flex: 1;
  position: relative
}

.plyr .plyr__volume input[type=range] {
  position: relative;
  z-index: 2
}

@media (min-width: 480px) {
  .plyr .plyr__volume {
      display:block;
      max-width: 60px
  }
}

@media (min-width: 768px) {
  .plyr .plyr__volume {
      max-width:100px
  }
}

.plyr--is-ios .plyr__volume,.plyr--is-ios [data-plyr=mute] {
  display: none!important
}

.plyr--fullscreen-active {
  height: 100%;
  width: 100%;
  background: #000;
  border-radius: 0!important
}

.plyr--fullscreen-active video {
  height: 100%
}

.plyr--fullscreen-active .plyr__video-wrapper {
  height: 100%;
  width: 100%
}

.plyr--fullscreen-active .plyr__video-embed {
  overflow: visible
}

.plyr--fullscreen-active.plyr--vimeo .plyr__video-wrapper {
  height: 0;
  top: 50%;
  transform: translateY(-50%)
}

.plyr--fullscreen-fallback.plyr--fullscreen-active {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000000
}

`;
