/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';
import { Link } from '../../../reactor';
import { media } from '../../../style/theme';

const BlogDetayCard = styled.div`
  background: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  padding: 30px 20px;
  width: 100%;

  p {
    font-size: 20px;
  }
`;

const Title = styled.h4`
  font-size: 24px;
`;

const Image = styled.div`
    display: flex;
    align-items: center;
    justify-content; center;
    min-height: 100px;
    max-height: 500px;
    overflow: hidden;
    border-radius: 5px;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const OnImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const DateAndCategory = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  padding-top: 20px;
  border-bottom: 1px solid #eee;

  ${media.phone`
      flex-direction: column;
      align-items: flex-end;
    `};
`;

const ReleaseDate = styled.p`
  font-size: 13px;
  margin-bottom: 0;

  ${media.phone`
      order: 2;
    `};
`;

const CategoryLink = styled(Link)`
  font-size: 13px;
  font-weight: bold;

  ${media.phone`
        order: 1;
        margin-bottom: 10px;
    `};
`;

const Content = styled.div`
  padding: 15px 0;
`;

const Share = styled.div`
margin-top: 20px;
margin-bottom: -15px;
display: flex;
justify-content: flex-end;

  button:not(:first-of-type) {
    margin-left: 5px;
  }
`;

const adres = () => {
  let adres_;
  if (process.browser) {
    adres_ = window.location.href;
    return adres_;
  }
  return '/';
};

const ShareButtonWt = 30;

const blogDetailCard = ({ blog }) => (
  <>
    {blog === '' || typeof blog === 'undefined'? (
      <BlogDetayCard>
        <p>Görüntülemeye çalıştığınız blog yayından kaldırılmış olabilir ya da hiç var olmadı. Kategori listesinden okumak istediğiniz konu başlıklarını seçerek devam edebilirsiniz. </p>
      </BlogDetayCard>
    ) : (
      <BlogDetayCard>
        <Title>{blog.baslik}</Title>
        <Image>
          <OnImage src={`/static/blog_images/${blog.img}`} />
        </Image>
        <DateAndCategory>
          <ReleaseDate>{`Yayın Tarih: ${blog.yayin_tarihi}`}</ReleaseDate>
          <CategoryLink route={`/blog/${blog.kategori_slug}`}>{blog.kategori}</CategoryLink>
        </DateAndCategory>
        <Content dangerouslySetInnerHTML={{ __html: blog.icerik }} />
        <Share>
          <FacebookShareButton url={adres()} className="share">
            <FacebookIcon size={ShareButtonWt} round />
          </FacebookShareButton>
          <TwitterShareButton url={adres()} className="share">
            <TwitterIcon size={ShareButtonWt} round />
          </TwitterShareButton>
          <LinkedinShareButton url={adres()} className="share">
            <LinkedinIcon size={ShareButtonWt} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={adres()} className="share">
            <WhatsappIcon size={ShareButtonWt} round />
          </WhatsappShareButton>
          <EmailShareButton url={adres()} className="share">
            <EmailIcon size={ShareButtonWt} round />
          </EmailShareButton>
        </Share>
      </BlogDetayCard>
    )}
  </>
);

export default blogDetailCard;
