import styled from 'styled-components';
import { color } from '../style/theme';
import Layout from '../layouts/container';
import { Container } from '../reactor';

const Outer = styled.div`
  padding: 10vw 0;
  text-align: center;
  .title {
    color: ${color.primary};
    font-weight: 600;
    font-size: 28px;
    margin-top: 40px;
    margin-bottom: 16px;
  }
  .text {
    font-size: 18px;
  }
  .buttons {
    margin-top: 40px;
    display: inline-flex;
    a {
      display: block;
      width: 60px;
      height: 60px;
      display: flex;
      background-color: ${color.primary};
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      -webkit-mask-image: -webkit-radial-gradient(circle, white, black);
      .effect {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-radius: 50%;
        background-color: #ff961c;
        transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
        transform: translate(-50%, -50%);

        pointer-events: none;
      }
      &:hover .effect {
        width: 225%;
        height: 562.5px;
      }
      [class^='icon'] {
        margin: auto;
        color: white;
        font-size: 26px;
        position: relative;
        z-index: 5;
      }
      & + a {
        margin-left: 50px;
      }
    }
  }
  .image {
    width: 300px;
    max-width: 100%;
    display: inline-block;
  }
`;

const NotProductBackToSearch = ({code}) => ( 
  <Layout meta={{ title: code + ' Bulunamadı' }}>
    <Outer>
      <Container>
        <div>Arama rediect</div>
      </Container>
    </Outer>
  </Layout>
);

NotProductBackToSearch.defaultProps={
  code: 404
}

export default NotProductBackToSearch;
