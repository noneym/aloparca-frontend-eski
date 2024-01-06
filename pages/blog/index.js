/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import { Title } from '../../components/style';
import Layout from '../../layouts/container';
import { Container } from '../../reactor';
import BreadCrumb from '../../components/pages/blog/breadcrumb';
import BlogCard from '../../components/pages/blog/blog-card';
import BlogCategories from '../../components/pages/blog/blog-categories';
import BlogPopuler from '../../components/pages/blog/blog-populer';
import { media } from '../../style/theme';
import Paginate from '../../components/paginate';
import Api from '../../api';

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


const Blog = ({
  populerList,
  catForAllBlog,
  kategoriList,
  gosterKategori,
  query
}) => {
  const [sayfa, setSayfa] = useState(1);
  const [minBlogSayfa, setMinBlogSayfa] = useState(0);
  const [maxBlogSayfa, setMaxBlogSayfa] = useState(10);

  const onPageChange = ({ selected }) => {
    setSayfa(selected + 1);
    setMinBlogSayfa(selected * 10);
    setMaxBlogSayfa(selected * 10 + 10);
    window.scrollTo(0, 0);
  };

    const toplamSayfa = Math.ceil(catForAllBlog.length / 10);

    const pagesCatForAllBlog = catForAllBlog.slice(minBlogSayfa, maxBlogSayfa);

    return (
      <Layout meta={{ title: 'blog' }}>
        <BlogBg>
          <Container>
            <Box className="breadcrumb-wrapper" pb={2}>
              <BreadCrumb items={gosterKategori} />
            </Box>
            <Title>BLOG</Title>
            <RespFlex>
              <BoxBlog width={1} mr={50}>
                <BlogCard data={pagesCatForAllBlog} category={kategoriList} />
                {toplamSayfa <= 1 ? null : (
                  <Paginate
                    current={sayfa}
                    total={toplamSayfa}
                    onChange={onPageChange}
                  />
                )}
              </BoxBlog>
              <BoxBlogCategories width={1 / 3}>
                <BlogCategoryCard>
                  <BlogCategoryTitle>Kategorİler</BlogCategoryTitle>
                  <BlogCategories
                    data={kategoriList}
                    query={query}
                    sayfa={sayfa}
                    onClick={() => {
                      setSayfa(1);
                      setMinBlogSayfa(0);
                      setMaxBlogSayfa(10);
                    }}
                  />
                </BlogCategoryCard>
                <BlogCategoryCard>
                  <BlogCategoryTitle>Popüler Yazılar</BlogCategoryTitle>
                  <BlogPopuler data={populerList.slice(0, 5)} />
                </BlogCategoryCard>
              </BoxBlogCategories>
            </RespFlex>
          </Container>
        </BlogBg>
      </Layout>
    );
}

Blog.getInitialProps = async ({ query }) => {
  const { slug } = query;

  const blogList = await Api.get('Blog/blog_list');
  const populerList = await Api.get('Blog/blog_list?populer=1');
  const kategoriList = await Api.get('Blog/kategori_list');

  const gosterKategori = kategoriList.filter((item) => item.slug === slug);
  let oneCategory = '';
  if(typeof gosterKategori !== 'undefined' && gosterKategori.length > 0){
    console.log(gosterKategori);
    oneCategory = slug === 'null' || slug === undefined ? '' : gosterKategori[0].name;
  }
  const catForAllBlog = blogList.filter((item) => {
    const items = oneCategory;
    return item.kategori.search(items) === 0;
  });

  return {
    blogList, populerList, kategoriList, catForAllBlog, query, gosterKategori, oneCategory,
  };
}

export default Blog;