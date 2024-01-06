import styled, { css } from 'styled-components';

const Outer = styled.figure`
  img {
    ${props =>
    props.fluid &&
      css`
        max-width: 100%;
      `}
  }
`;

const Image = ({ fluid, ...props }) => (
  <Outer fluid={fluid}>
    <img {...props} />
  </Outer>
);

Image.defaultProps = {
  alt: '',
};

export default Image;
