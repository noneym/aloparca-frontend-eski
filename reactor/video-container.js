import styled from 'styled-components';
import { ratio, replaceWithEmbed } from './func';

const Outer = styled.div`
  width: 100%;
  height: 0;
  overflow: hidden;
  position: relative;
  ${ratio()};
  iframe {
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
    position: absolute;
    border: none;
  }
`;

const VideoContainer = ({ src, autoplay, active = true }) =>
  active && (
    <Outer>
      <iframe src={replaceWithEmbed(src, { autoplay })} frameBorder="0" allowFullScreen />
    </Outer>
  );

export default VideoContainer;
