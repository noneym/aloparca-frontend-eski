import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TransitionablePortal } from 'semantic-ui-react';
import { Link } from '../reactor';
import { media } from '../style/theme';

const SegmentStyles = styled.div`
  position: fixed;
  top: 10px;
  left: 50px;
  right: 50px;
  background: #ff8900;
  border-radius: 3px;
  z-index: 999;
  padding: 15px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);

  ${media.phone`
    left: 20px;
    right: 20px;
  `};
`;

const SegmentText = styled.p`
  color: #fff;
  font-weight: 600;
`;

const GetCartStyles = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  background: #fff;
  border-radius: 3px;
  z-index: 999;
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);

  ${media.phone`
    top: 20px;
    right: 20px;
  `};

  ${media.mini`
    top: 20px;
    right: 20px;
    left: 20px;
  `};
`;

const GcsFlex = styled.div`
  display: flex;
  align-items: center;
`;

const GcsImage = styled.div`
  max-width: 50px;
  height: 85px;
  border: 1px solid #E1E1E1;
  margin-right: 15px;
  display: flex;
  align-items: center;
`;

const GcsImg = styled.img`
  width: 100%;
`;

const GcsProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 230px;
  height: 85px;

  ${media.mini`
    width: 100%;
  `};
`;

const GcsProductAdded = styled.div`
  display: flex;
  align-items: center;
`;

const GcsProductAddedText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #22af22;
  margin-bottom: 0;

  ${media.mini`
    font-size: 15px;
  `};
`;

const GcsProductAddedIcon = styled.span`
  position: relative;
  background: #22af22;
  display: block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-left: 5px;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 6px;
    height: 11px;
    border: solid white;
    border-width: 0 2px 2px 0;
  }
`;

const GcsProductTitle = styled.div`
  font-size: 13px;
  color: #000;
`;

const GcsLink = styled(Link)`
  background: #ff8900;
  color: #fff;
  width: 100%;
  padding: 8px 0;
  text-align: center;
  border-radius: 2px;
  font-weight: 500;
  transition: all 300ms;

  &:hover {
    color: #fff;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  }
`;

const FlashMessage = ({ dispatch, flashMessage, getCartMessage }) => {
  const alertClose = () => dispatch({ type: 'FLASH_MESSAGE', payload: null });

  const alertOpen = () => {
    setTimeout(() => dispatch({ type: 'FLASH_MESSAGE', payload: null }), 3000);
  };

  const alertClose2 = () => dispatch({ type: 'GET_CART_MESSAGE', payload: { name: '', gorsel: '' } });

  const alertOpen2 = () => {
    setTimeout(() => dispatch({ type: 'GET_CART_MESSAGE', payload: { name: '', gorsel: '' } }), 5000);
  };

  const { name, gorsel } = getCartMessage;

  return (
    <>
      <TransitionablePortal onClose={alertClose} open={!!flashMessage} onOpen={alertOpen}>
        <SegmentStyles>
          <SegmentText>{flashMessage}</SegmentText>
        </SegmentStyles>
      </TransitionablePortal>
      <TransitionablePortal onClose={alertClose2} open={name !== ''} onOpen={alertOpen2}>
        <GetCartStyles>
          <GcsFlex>
            <GcsImage>
              <GcsImg src={`https://resize.aloparca.com/upload/w_100,h_80,pns/${gorsel}`} alt={name} />
            </GcsImage>
            <GcsProduct>
              <GcsProductAdded>
                <GcsProductAddedText>Ürün sepetinize eklendi</GcsProductAddedText>
                <GcsProductAddedIcon />
              </GcsProductAdded>
              <GcsProductTitle>{`${name.slice(0, 28)}...`}</GcsProductTitle>
              <GcsLink route="/sepet">Sepete Git</GcsLink>
            </GcsProduct>
          </GcsFlex>
        </GetCartStyles>
      </TransitionablePortal>
    </>
  );
};

const mapStateToProps = ({ flashMessage, getCartMessage }) => ({ flashMessage, getCartMessage });

export default connect(mapStateToProps)(FlashMessage);
