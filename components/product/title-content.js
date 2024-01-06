import styled from 'styled-components';

const Outer = styled.div`
  strong {
    font-weight: 100;
  }
`;

const TitleContent = ({ title, content, color }) => (
  <Outer>
    {title && <strong>{title} :</strong> }
    <b style={{color}}>{content}</b>
  </Outer>
);

export default TitleContent;
