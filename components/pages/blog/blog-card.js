import React from 'react';
import styled from 'styled-components';
import { Box } from '@rebass/grid';
import { Link } from '../../../reactor';
import { media } from '../../../style/theme';

const BlogCard = styled(Box)`
  background: white;
  height: 220px;
  display: flex;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;

  &:not(:first-of-type) {
    margin-top: 30px;
  }

  ${media.phoneMini`
    height: 350px;
    flex-direction: column;
    background: transparent;
    box-shadow: none;
    position: relative;
  `};
`;

const BlogImg = styled(Link)`
  display: flex;
  background: #FFFFFF;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  flex: 1;
  position: relative;
  overflow: hidden;

  ${media.phoneMini`
    width: 100%;
    height: 220px;
    box-shadow: none;
    flex: auto;
  `};

  ${media.mini`
    height: 200px;
  `};
`;

const BlogImage = styled.img`
  min-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BlogText = styled(Box)`
  font-size: 26px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 2;

  ${media.phoneMini`
    height: 238px;
    background: rgba(255, 255, 255, 0.95);
    width: 95%;
    margin: 0 auto;
    margin-top: -110px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    z-index: 2;
  `};

  ${media.mini`
    height: 258px;
    padding: 10px 15px;
  `};
`;

const BlogTitle = styled(Link)`
  font-size: 21px;
  margin-bottom: 10px;

  ${media.phoneMini`
    font-size: 18px;
    height: 40px;
    margin-top: 25px;
  `};

  ${media.mini`
    font-size: 16px;
  `};
`;

const BlogDescription = styled.p`
    font-size: 13px;
    padding-bottom 10px;
    margin: 0;
    flex: 1;
    overflow: hidden;
    margin-bottom: 6px;

    h6, h5, h4, h3, h2, h1, iframe {
      display: none;
    }

    & p:not(:first-of-type) {
      display: none;
    }

    ${media.phoneMini`
      order: 3;
      padding-bottom: 0;
      margin-bottom: 0;
      margin-top: 10px;
  `};
`;

const BlogBottom = styled.div`
  border-top: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  padding-top: 10px;

  ${media.phoneMini`
    padding-top: 0;
    border-top: 0;
    margin-bottom: 10px;
    position: relative;
  `};
`;

const BlogLink = styled(Link)`
  font-size: 13px;
  font-weight: bold;
  margin-right: 8px;
  border-right: 1px solid #e4e4e4;
  padding-right: 8px;

  ${media.phoneMini`
    position: absolute;
    top: -75px;
    border-right: none;
  `};
`;

const BlogDate = styled.p`
  font-size: 13px;
`;

const NotHaveBlog = styled.div`
  background: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  padding: 15px;
`;

const blogCard = ({ data }) => (
  <>
    {data.length <= 0 ? (
      <NotHaveBlog>Blog bulunamadı.</NotHaveBlog>
    ) : (
      data.map((b) => (
        <BlogCard key={b.id}>
          <BlogImg route={`/blog-detay/${b.url}`}>
            <BlogImage src={`/static/blog_images/${b.img}`} />
          </BlogImg>
          <BlogText>
            <BlogTitle route={`/blog-detay/${b.url}`}>{b.baslik}</BlogTitle>
            <BlogDescription dangerouslySetInnerHTML={{ __html: b.icerik }} />
            <BlogBottom>
              <BlogLink route={`/blog/${b.kategori_slug}`}>
                {b.kategori}
              </BlogLink>
              <BlogDate>{b.yayin_tarihi}</BlogDate>
            </BlogBottom>
          </BlogText>
        </BlogCard>
      ))
    )}
  </>
);

export default blogCard;
