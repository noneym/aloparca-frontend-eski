/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../reactor';
import { media } from '../../../style/theme';

const BlogCategoryUl = styled.ul`
  ${media.tablet`
    display: flex;
    flex-wrap: wrap;
  `};
`;

const BlogCategoryLi = styled.li`
  padding: 10px 5px;

  &:not(:first-of-type) {
    border-top: 1px solid #eeeeee;
  }

  & a {
    color: ${({ active }) => (active ? '#FF8900' : '#666666')};
  }

  ${media.tablet`
    background: ${({ active }) => (active ? '#FF8900' : 'transparent')};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 5px 10px;
    border-radius: 3px;
    margin: 0 5px;
    margin-top: 10px;
    transition: all 300ms;
    
    &:not(:first-of-type) {
      border-top: 0;
    }

    &:hover {
      background: #FF8900;

      a {
        color: #FFFFFF;
      }
    }

    & a {
      color: ${({ active }) => (active ? '#FFFFFF' : '#666666')};
    }
  `};
`;

const BlogCategoryLink = styled(Link)`
  font-size: 13px;
  font-weight: 500;
`;

const blogCategories = ({ data, query, onClick }) => {
  const isActive = false;

  return (
    <BlogCategoryUl>
      {data.map((bc) => (
        <BlogCategoryLi
          onClick={onClick}
          active={query.slug === bc.slug ? !isActive : isActive}
          key={bc.id}
        >
          <BlogCategoryLink route={`/blog/${bc.slug}`}>
            {bc.name}
          </BlogCategoryLink>
        </BlogCategoryLi>
      ))}
    </BlogCategoryUl>
  );
};

export default blogCategories;
