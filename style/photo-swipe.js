import { createGlobalStyle } from 'styled-components';

const folder = '/static/img/photo-swipe/';

export default createGlobalStyle`
.pswp {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  -ms-touch-action: none;
  touch-action: none;
  z-index: 1500;
  -webkit-text-size-adjust: 100%;
  -webkit-backface-visibility: hidden;
  outline: none; }
  .pswp * {
    -webkit-box-sizing: border-box;
            box-sizing: border-box; }
  .pswp img {
    max-width: none; }
.pswp--animate_opacity {
  opacity: 0.001;
  will-change: opacity;
  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp--open {
  display: block; }

.pswp--zoom-allowed .pswp__img {
  /* autoprefixer: off */
  cursor: -webkit-zoom-in;
  cursor: -moz-zoom-in;
  cursor: zoom-in; }

.pswp--zoomed-in .pswp__img {
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab; }

.pswp--dragging .pswp__img {
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing; }

.pswp__bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0;
  -webkit-transform: translateZ(0);
          transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  will-change: opacity; }

.pswp__scroll-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; }

.pswp__container,
.pswp__zoom-wrap {
  -ms-touch-action: none;
  touch-action: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; }

.pswp__container,
.pswp__img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
      user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none; }

.pswp__zoom-wrap {
  position: absolute;
  width: 100%;
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transition: -webkit-transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp__bg {
  will-change: opacity;
  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp--animated-in .pswp__bg,
.pswp--animated-in .pswp__zoom-wrap {
  -webkit-transition: none;
  transition: none; }

.pswp__container,
.pswp__zoom-wrap {
  -webkit-backface-visibility: hidden; }

.pswp__item {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden; }

.pswp__img {
  position: absolute;
  width: auto;
  height: auto;
  max-width: 80% !important;
  max-height: 80% !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pswp__img--placeholder {
  -webkit-backface-visibility: hidden; }

.pswp__img--placeholder--blank {
  background: #222; }

.pswp--ie .pswp__img {
  width: 100% !important;
  height: auto !important;
  left: 0;
  top: 0; }

.pswp__error-msg {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  margin-top: -8px;
  color: #CCC; }

.pswp__error-msg a {
  color: #CCC;
  text-decoration: underline; }

.pswp__button {
  width: 44px;
  height: 44px;
  position: relative;
  background: none;
  cursor: pointer;
  overflow: visible;
  -webkit-appearance: none;
  display: block;
  border: 0;
  padding: 0;
  margin: 0;
  float: right;
  opacity: 0.75;
  -webkit-transition: opacity 0.2s;
          transition: opacity 0.2s;
  -webkit-box-shadow: none;
          box-shadow: none; }
  .pswp__button:focus, .pswp__button:hover {
    opacity: 1; }
  .pswp__button:active {
    outline: none;
    opacity: 0.9; }
  .pswp__button::-moz-focus-inner {
    padding: 0;
    border: 0; }

.pswp__ui--over-close .pswp__button--close {
  opacity: 1; }

.pswp__button,
.pswp__button--arrow--left:before,
.pswp__button--arrow--right:before {
  background: url("${folder}default-skin.png") 0 0 no-repeat;
  background-size: 264px 88px;
  width: 44px;
  height: 44px; }

@media (-webkit-min-device-pixel-ratio: 1.1), (-webkit-min-device-pixel-ratio: 1.09375), (min-resolution: 105dpi), (min-resolution: 1.1dppx) {
  .pswp--svg .pswp__button,
  .pswp--svg .pswp__button--arrow--left:before,
  .pswp--svg .pswp__button--arrow--right:before {
    background-image: url("${folder}default-skin.svg"); }
  .pswp--svg .pswp__button--arrow--left,
  .pswp--svg .pswp__button--arrow--right {
    background: none; } }

.pswp__button--close {
  background-position: 0 -44px; }

.pswp__button--share {
  background-position: -44px -44px; }

.pswp__button--fs {
  display: none; }

.pswp--supports-fs .pswp__button--fs {
  display: block; }

.pswp--fs .pswp__button--fs {
  background-position: -44px 0; }

.pswp__button--zoom {
  display: none;
  background-position: -88px 0; }

.pswp--zoom-allowed .pswp__button--zoom {
  display: block; }

.pswp--zoomed-in .pswp__button--zoom {
  background-position: -132px 0; }

.pswp--touch .pswp__button--arrow--left,
.pswp--touch .pswp__button--arrow--right {
  visibility: hidden; }

.pswp__button--arrow--left,
.pswp__button--arrow--right {
  background: none;
  top: 50%;
  margin-top: -50px;
  width: 70px;
  height: 100px;
  position: absolute; }

.pswp__button--arrow--left {
  left: 0; }

.pswp__button--arrow--right {
  right: 0; }

.pswp__button--arrow--left:before,
.pswp__button--arrow--right:before {
  content: '';
  top: 35px;
  background-color: rgba(0, 0, 0, 0.3);
  height: 30px;
  width: 32px;
  position: absolute; }

.pswp__button--arrow--left:before {
  left: 6px;
  background-position: -138px -44px; }

.pswp__button--arrow--right:before {
  right: 6px;
  background-position: -94px -44px; }

.pswp__counter,
.pswp__share-modal {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
      user-select: none; }

.pswp__share-modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 10px;
  position: absolute;
  z-index: 1600;
  opacity: 0;
  -webkit-transition: opacity 0.25s ease-out;
          transition: opacity 0.25s ease-out;
  -webkit-backface-visibility: hidden;
  will-change: opacity; }

.pswp__share-modal--hidden {
  display: none; }

.pswp__share-tooltip {
  z-index: 1620;
  position: absolute;
  background: #FFF;
  top: 56px;
  border-radius: 2px;
  display: block;
  width: auto;
  right: 44px;
  -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  -webkit-transform: translateY(6px);
      -ms-transform: translateY(6px);
          transform: translateY(6px);
  -webkit-transition: -webkit-transform 0.25s;
          transition: transform 0.25s;
  -webkit-backface-visibility: hidden;
  will-change: transform; }
  .pswp__share-tooltip a {
    display: block;
    padding: 8px 12px;
    color: #000;
    text-decoration: none;
    font-size: 14px;
    line-height: 18px; }
    .pswp__share-tooltip a:hover {
      text-decoration: none;
      color: #000; }
    .pswp__share-tooltip a:first-child {
      border-radius: 2px 2px 0 0; }
    .pswp__share-tooltip a:last-child {
      border-radius: 0 0 2px 2px; }

.pswp__share-modal--fade-in {
  opacity: 1; }
  .pswp__share-modal--fade-in .pswp__share-tooltip {
    -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
            transform: translateY(0); }

.pswp--touch .pswp__share-tooltip a {
  padding: 16px 12px; }

a.pswp__share--facebook:before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  top: -12px;
  right: 15px;
  border: 6px solid transparent;
  border-bottom-color: #FFF;
  -webkit-pointer-events: none;
  -moz-pointer-events: none;
  pointer-events: none; }

a.pswp__share--facebook:hover {
  background: #3E5C9A;
  color: #FFF; }
  a.pswp__share--facebook:hover:before {
    border-bottom-color: #3E5C9A; }

a.pswp__share--twitter:hover {
  background: #55ACEE;
  color: #FFF; }

a.pswp__share--pinterest:hover {
  background: #CCC;
  color: #CE272D; }

a.pswp__share--download:hover {
  background: #DDD; }

.pswp__counter {
  position: absolute;
  left: 0;
  top: 0;
  height: 44px;
  font-size: 13px;
  line-height: 44px;
  color: #FFF;
  opacity: 0.75;
  padding: 0 10px; }

.pswp__caption {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 44px; }
  .pswp__caption small {
    font-size: 11px;
    color: #BBB; }

.pswp__caption__center {
  text-align: center;
  max-width: 420px;
  margin: 0 auto;
  font-size: 13px;
  padding: 10px;
  line-height: 20px;
  color: #CCC; }

.pswp__caption--empty {
  display: none; }

.pswp__caption--fake {
  visibility: hidden; }

.pswp__preloader {
  width: 44px;
  height: 44px;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -22px;
  opacity: 0;
  -webkit-transition: opacity 0.25s ease-out;
          transition: opacity 0.25s ease-out;
  will-change: opacity;
  direction: ltr; }

.pswp__preloader__icn {
  width: 20px;
  height: 20px;
  margin: 12px; }

.pswp__preloader--active {
  opacity: 1; }
  .pswp__preloader--active .pswp__preloader__icn {
    background: url("${folder}preloader.gif") 0 0 no-repeat; }

.pswp--css_animation .pswp__preloader--active {
  opacity: 1; }
  .pswp--css_animation .pswp__preloader--active .pswp__preloader__icn {
    -webkit-animation: clockwise 500ms linear infinite;
            animation: clockwise 500ms linear infinite; }
  .pswp--css_animation .pswp__preloader--active .pswp__preloader__donut {
    -webkit-animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1) infinite;
            animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1) infinite; }

.pswp--css_animation .pswp__preloader__icn {
  background: none;
  opacity: 0.75;
  width: 14px;
  height: 14px;
  position: absolute;
  left: 15px;
  top: 15px;
  margin: 0; }

.pswp--css_animation .pswp__preloader__cut {
  position: relative;
  width: 7px;
  height: 14px;
  overflow: hidden; }

.pswp--css_animation .pswp__preloader__donut {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  width: 14px;
  height: 14px;
  border: 2px solid #FFF;
  border-radius: 50%;
  border-left-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  background: none;
  margin: 0; }

@media screen and (max-width: 1024px) {
  .pswp__preloader {
    position: relative;
    left: auto;
    top: auto;
    margin: 0;
    float: right; } }

@-webkit-keyframes clockwise {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

@keyframes clockwise {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

@-webkit-keyframes donut-rotate {
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0); }
  50% {
    -webkit-transform: rotate(-140deg);
            transform: rotate(-140deg); }
  100% {
    -webkit-transform: rotate(0);
            transform: rotate(0); } }

@keyframes donut-rotate {
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0); }
  50% {
    -webkit-transform: rotate(-140deg);
            transform: rotate(-140deg); }
  100% {
    -webkit-transform: rotate(0);
            transform: rotate(0); } }


.pswp__ui {
  -webkit-font-smoothing: auto;
  visibility: visible;
  opacity: 1;
  z-index: 1550; }

.pswp__top-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 44px;
  width: 100%; }

.pswp__caption,
.pswp__top-bar,
.pswp--has_mouse .pswp__button--arrow--left,
.pswp--has_mouse .pswp__button--arrow--right {
  -webkit-backface-visibility: hidden;
  will-change: opacity;
  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp--has_mouse .pswp__button--arrow--left,
.pswp--has_mouse .pswp__button--arrow--right {
  visibility: visible; }

.pswp__top-bar,
.pswp__caption {
  background-color: rgba(0, 0, 0, 0.5); }

.pswp__ui--fit .pswp__top-bar,
.pswp__ui--fit .pswp__caption {
  background-color: rgba(0, 0, 0, 0.3); }

.pswp__ui--idle .pswp__top-bar {
  opacity: 0; }

.pswp__ui--idle .pswp__button--arrow--left,
.pswp__ui--idle .pswp__button--arrow--right {
  opacity: 0; }

.pswp__ui--hidden .pswp__top-bar,
.pswp__ui--hidden .pswp__caption,
.pswp__ui--hidden .pswp__button--arrow--left,
.pswp__ui--hidden .pswp__button--arrow--right {
  /* Force paint & create composition layer for controls. */
  opacity: 0.001; }

/* pswp__ui--one-slide class is added when there is just one item in gallery */
.pswp__ui--one-slide .pswp__button--arrow--left,
.pswp__ui--one-slide .pswp__button--arrow--right,
.pswp__ui--one-slide .pswp__counter {
  display: none; }

.pswp__element--disabled {
  display: none !important; }

.pswp--minimal--dark .pswp__top-bar {
  background: none; }
`;
