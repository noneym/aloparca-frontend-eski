import { Rating } from 'semantic-ui-react';

const StarRating = ({ value }) => (
  <Rating maxRating={5} defaultRating={value} icon="star" size="huge" />
);

export default StarRating;
