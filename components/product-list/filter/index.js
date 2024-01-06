import { Accordion, Menu } from 'semantic-ui-react';
import Outer from './style';

class Filter extends React.Component {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Outer>
        <Accordion as={Menu} fluid vertical inverted>
          <Menu.Item>
            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
              <i className="dropdown icon" />
              <span>test</span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>Osman</Accordion.Content>
          </Menu.Item>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 1}
              content="Şasi No ile Ara"
              index={1}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 1}>Şafak</Accordion.Content>
          </Menu.Item>
        </Accordion>
      </Outer>
    );
  }
}
export default Filter;
