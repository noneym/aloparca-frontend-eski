/* eslint-disable no-throw-literal */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import Layout from '../../layouts/container';
import { Router } from '../../routes';
import { Container } from '../../reactor';
import { media } from '../../style/theme';
import Api from '../../api';
import BlogDetailCard from '../../components/pages/blog/blog-detail-card';
import BlogCategories from '../../components/pages/blog/blog-categories';
import BlogPopuler from '../../components/pages/blog/blog-populer';
import BreadCrumb from '../../components/pages/blog/blog-detail-breadcrumb';

const BlogBg = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
`;

const RespFlex = styled(Flex)`
  ${media.tablet`
    flex-direction: column;
  `};
`;

const BoxBlog = styled(Box)`
  ${media.tablet`
    order: 2;
  `};
`;

const BoxBlogCategories = styled(Box)`
  ${media.tablet`
    order: 1;
    width: 100%;
  `};
`;

const BlogCategoryCard = styled(Box)`
  background: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 5px;

  &:not(:first-of-type) {
    margin-top: 15px;
  }

  ${media.tablet`
    margin-bottom: 30px;

    &:last-child {
      display: none;
    }
  `};
`;

const BlogCategoryTitle = styled.h4`
  font-size: 21px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

class BlogDetay extends React.Component {
  static async getInitialProps({ query }) {
    const { blog } = query;
    const blogList = await Api.get('Blog/blog_list');
    const kategoriList = await Api.get('Blog/kategori_list');

    const oneBlog = await Api.get(`Blog/blog_detail?blog=${blog}`);
    const notArrayOneBlog = oneBlog[0];

    if (blogList.status === false) {
      throw 404;
    }

    return {
      blogList,
      kategoriList,
      notArrayOneBlog,
      query,
    };
  }

  adres = () => {
    let adres_;
    if (process.browser) {
      adres_ = window.location.href;
      return adres_;
    }
    return '/';
  };

  render() {
    const {
      meta, kategoriList, blogList, notArrayOneBlog, query,
    } = this.props;

    return (
      <Layout meta={meta}>
        <BlogBg>
          <Container>
            <Box className="breadcrumb-wrapper" pb={2}>
              <BreadCrumb blog={notArrayOneBlog} />
            </Box>
            <RespFlex>
              <BoxBlog width={1} mr={50}>
                <BlogDetailCard blog={notArrayOneBlog} />
              </BoxBlog>
              <BoxBlogCategories width={1 / 3}>
                <BlogCategoryCard>
                  <BlogCategoryTitle>Kategorİler</BlogCategoryTitle>
                  <BlogCategories data={kategoriList} query={query} />
                </BlogCategoryCard>
                <BlogCategoryCard>
                  <BlogCategoryTitle>Popüler Yazılar</BlogCategoryTitle>
                  <BlogPopuler data={blogList.slice(0, 5)} />
                </BlogCategoryCard>
              </BoxBlogCategories>
            </RespFlex>
          </Container>
        </BlogBg>
      </Layout>
    );
  }
}

export default connect()(BlogDetay);
