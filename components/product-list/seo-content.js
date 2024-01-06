import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  margin: 15px 0;
  padding: 15px 30px;
  border: #dddddd solid 1px;
  border-radius: 3px;
  background-color: white;
  font-size: 14px;
  line-height: 1.3em;
  color: #525355;
  margin-top: ${({ marginTop }) => marginTop}px;
  img {
    display: block;
    margin: 5px 0 10px;
  }
  strong {
    font-weight: 500;
    color: black;
  }
  a {
    font-weight: 500;
    text-decoration: underline;
  }
`;

class SeoContent extends React.Component {
  state = { summary: false };

  componentDidMount() {
    this.changeState({ summary: true });
  }

  changeState = (obj) => this.setState(obj);

  render() {
    const {
      title,
      content,
      image,
      mt,
    } = this.props;
    const { summary } = this.state;
    if (content) {
      if (content.length > 250 && summary) {
        return (
          <Outer marginTop={mt}>
            {image && (
              <img src={`https://resize.aloparca.com/upload/w_65${image}`} width="75" alt={title} />
            )}
            {title && (
            <h2>
              {title}
              :
              {' '}
            </h2>
            )}
            {content
              .replace(/(<([^>]+)>)/gi, '')
              .substr(0, 250)
              .replace(/ $/, '')
              .replace(/.$/, '')}
            {'... '}
            <a href="javascript:;" onClick={() => this.changeState({ summary: false })}>
              devamı
              {' '}
              <i className="icon-chevrons-right" />
            </a>
          </Outer>
        );
      }
      return (
        <Outer marginTop={mt}>
          {image && (
            <img src={`https://resize.aloparca.com/upload/w_65${image}`} width="75" alt={title} />
          )}
          {title && (
          <h2>
            {title}
            :
            {' '}
          </h2>
          )}
          {
            <>
              <div dangerouslySetInnerHTML={{ __html: content }} />
              <a href="javascript:;" onClick={() => this.changeState({ summary: true })}>
                {'<<'}
                {' '}
                daha az
              </a>
            </>
          }
        </Outer>
      );
    }
  }
}

SeoContent.defaultProps = {
  mt: 15,
};

export default SeoContent;
