import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  margin: 2em auto;
  transform: translate(-50%, -50%) scale(0.35) translate(50%, 50%);

  &:after {
    content: '';
    position: absolute;
    animation: ${spin} 1s linear infinite;
    width: 160px;
    height: 160px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    box-shadow: 0 4px 0 0 ${props => props.theme.color.primary};
    -webkit-transform-origin: 80px 82px;
    transform-origin: 80px 82px;
  }
`;

export default Loading;
