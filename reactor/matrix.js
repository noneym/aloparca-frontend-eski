import styled from 'styled-components';
import { sp, media } from '../style/theme';

let ip = 0;

const BlockWrap = styled.div`
  ${props => props.handle === 'subtitle' && 'margin-bottom:0 !important;'};
  margin-bottom: ${sp(3)};
`;

const MatrixView = ({ schema, content }) => {
  ip++;

  const renderedContent = content.map((block, i) => {
    const { data, handle } = block;
    const key = `block-${ip}-${i}`;
    const Block = schema[handle];
    if (!Block) return null;

    return (
      <BlockWrap handle={handle} key={key}>
        <Block {...data} />
      </BlockWrap>
    );
  });

  return <div>{renderedContent}</div>;
};

export default MatrixView;
