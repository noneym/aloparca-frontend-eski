import moment from 'moment';
import 'moment/locale/tr';

import Api, { host, env } from '../api';

moment.locale('tr');

export const site = env.SITE;

export const seoMeta = async (url) => {
  if (url === '/service-worker.js' || url === '/sp-push-worker-fb.js') return;
  let meta = {};
  let data = {};

  try {
    data = await Api.get(`Tools/redirect301/?url=${url}&status=200`);
  } catch (e) {
    // console.log("seoMeta fonk hata: ", e);
  }
  if (data.result && data.result.title) {
    const { title, description, canonical } = data.result;
    let refinedTitle = title;
    if (title.includes(' | Aloparca.com')) {
      refinedTitle = title.replace(/ \| Aloparca.com/g, '');
    }
    meta = { title: refinedTitle, description, canonical };
  }
  // console.log(url, meta, data);
  return meta;
};

export const redirectCheck = async (res, status = '404') => {
  if (res) {
    if (res.req.url === '/service-worker.js' || res.req.url === '/sp-push-worker-fb.js') return;
    if (status !== '200') res.statusCode = 404;
    const data = await Api.get(`Tools/redirect301/?url=${res.req.url}&status=${status}`);
    if (parseInt(data.result.status, 10) === 301) {
      res.writeHead(301, {
        Location: data.result.redirect,
      });
      res.end();
      return true;
    }
    return false;
  }
  return false;
};

export const ratio = (type) => `padding-top: ${type === 'square' ? '100' : '56.25'}%;`;

export const slugify = (text) => {
  const trMap = {
    çÇ: 'c',
    ğĞ: 'g',
    şŞ: 's',
    üÜ: 'u',
    ıİ: 'i',
    öÖ: 'o',
  };
  for (const key in trMap) {
    text = text.replace(new RegExp(`[${key}]`, 'g'), trMap[key]);
  }
  return text
    .replace(/[^-a-zA-Z0-9\s]+/gi, '') // remove non-alphanumeric chars
    .replace(/\s/gi, '-') // convert spaces to dashes
    .replace(/[-]+/gi, '-') // trim repeated dashes
    .toLowerCase();
};

export const asset = (src = '', size) => host + (size ? src.replace('/uploads/', `/uploads/${size}/`) : src);

export const cover = (position) => `
  position:${position || 'absolute'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const textEllipsis = () => `
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const getYoutubeID = (url) => {
  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  return url.match(regex) ? RegExp.$2 : url;
};

export const replaceWithEmbed = (url, { autoplay }) => {
  if (url.match(/youtu.?be/)) {
    return `https://www.youtube.com/embed/${getYoutubeID(url)}?autoplay=${autoplay ? 1 : 0}`;
  }
};

export const splitDate = (date) => {
  const md = moment(date);
  return [
    <strong className="day" key="day">
      {md.format('DD')}
    </strong>,
    <strong className="month" key="month">
      {md.format('MMM')}
    </strong>,
    <span className="year" key="year">
      {md.format('Y')}
    </span>,
  ];
};
