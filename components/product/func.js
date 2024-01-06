const host = 'https://www.aloparca.com';
const asset = (src = '', size) =>
  host + (size ? `/resim/${size}-_/images/yedekparca_img${src}` : `/images/yedekparca_img${src}`);
export default asset;
