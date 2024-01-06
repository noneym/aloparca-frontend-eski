import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { media } from '../style/theme';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 0;
  ${media.tablet`
    margin: 25px 0;
  `};
  ul {
    display: flex;
    align-items: center;
    li {
      padding: 0 10px;
      font-weight: 500;
      a {
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        cursor: pointer;
        user-select: none;
        ${media.tablet`
          width: 20px;
          height: 20px;
        `};
      }
      &.is-active a {
        color: #ff8900;
      }
      &.disabled a {
        opacity: 0.3;
      }
      i {
        display: block;
        margin-top: 2px;
      }
    }
  }
`;

class Paginate extends React.Component {
  state = { marginPagesDisplayed: 2, pageRangeDisplayed: 5 };
  componentDidMount() {
    window.addEventListener('resize', this.update);
    this.update();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.update);
  }
  update = () => {
    const w = window.innerWidth;
    if (w < 500 && w > 410) {
      this.setState({ marginPagesDisplayed: 2, pageRangeDisplayed: 3 });
    } else if (w < 410) {
      this.setState({ marginPagesDisplayed: 1, pageRangeDisplayed: 2 });
    } else {
      this.setState({ marginPagesDisplayed: 2, pageRangeDisplayed: 5 });
    }
  };
  render() {
    const { total, current, onChange } = this.props;
    const { marginPagesDisplayed, pageRangeDisplayed } = this.state;
    return (
      <Outer>
        <ReactPaginate
          initialPage={current - 1}
          pageCount={total}
          previousLabel={<span className="icon-caret-left" />}
          nextLabel={<span className="icon-caret-right" />}
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          disableInitialCallback
          onPageChange={onChange}
          activeClassName="is-active"
        />
      </Outer>
    );
  }
}

export default Paginate;
