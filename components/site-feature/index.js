import { Flex } from '@rebass/grid';
import { Link } from '../../reactor';

import Outer from './style';

const iconList = require('./data.json');

const SiteFeature = () => (
  <Outer mt={[3, 3, 5]} mb={[3, 3, 5]}>
    <Flex className="icons" mx={-1} flexWrap="wrap">
      {iconList.map(p => (
        <Flex className="item" width={[1, 1, 1 / 4]} px={1} key={p.title}>
          {p.route ? (
            <Link route={p.route} params={{ slug: p.slug }}>
              <Flex className="desktop" style={{ backgroundColor: p.color }}>
                <i className={`icon icon-${p.icon}`} />
              </Flex>
              <Flex className="mobile">
                <i className={`icon icon-${p.icon}`} style={{ color: p.color }} />
              </Flex>
              <h3>{p.title}</h3>
              <i className="icon icon-chevron-thin-right" />
            </Link>
          ) : (
            <a href="javascript:;">
              <Flex className="desktop" style={{ backgroundColor: p.color }}>
                <i className={`icon icon-${p.icon}`} />
              </Flex>
              <Flex className="mobile">
                <i className={`icon icon-${p.icon}`} style={{ color: p.color }} />
              </Flex>
              <h3>{p.title}</h3>
              <i className="icon icon-chevron-thin-right" />
            </a>
          )}
        </Flex>
      ))}
    </Flex>
  </Outer>
);

export default SiteFeature;
