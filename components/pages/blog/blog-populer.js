/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../reactor';

const BlogImageLink = styled(Link)`
  display: flex;
  height: 120px;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:not(:first-of-type) {
    margin-top: 10px;
  }
`;

const BlogImagePicture = styled.img`
  width: 100%;
  background: #d2d2d2;
`;

const BlogImageShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  transition: all 400ms;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  text-align: center;

  &:hover {
    opacity: 1;
  }
`;

const BlogImageTitle = styled.h3`
  color: #FFFFFF;
  font-weight: 900;
`;

const blogPopuler = ({ data }) => (
  <>
    {data.map((images) => (
      <BlogImageLink key={images.id} route={`/blog-detay/${images.url}`}>
        <BlogImagePicture src={`/static/blog_images/${images.img}`} />
        <BlogImageShadow>
          <BlogImageTitle>{images.baslik}</BlogImageTitle>
        </BlogImageShadow>
      </BlogImageLink>
    ))}
  </>
);

export default blogPopuler;
