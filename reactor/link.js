import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { stringify } from 'query-string';

import { Link, routesJSON } from '../routes';

import { asset } from '../reactor/func';

class CustomLink extends React.Component {
  render() {
    const {
      title = '',
      route = 'home',
      router,
      params,
      className,
      children,
      to,
      isActive,
      innerRef,
      nativeProps,
      nativeLink,
    } = this.props;
    const routeObject = routesJSON[route];

    if (params && !params.slug) {
      delete params.slug;
    }

    const linkRoute = to || route;
    const linkParams = { ...params };

    const isExternal = linkRoute && linkRoute.match(/http|uploads/g);

    // const {
    //   q, start, end, page, ...routerQuery
    // } = router.query;

    const pageCondition = router.route.match('page')
      ? stringify(router.query) === stringify(linkParams)
      : true;

    const isActiveClassName =
      !isExternal && (isActive === true || isActive === false)
        ? isActive
        : router.route.replace(/(-item$|^\/)/g, '') === linkRoute && pageCondition;

    let externalProps = {};
    if (isExternal) {
      externalProps = {
        href: linkRoute.match(/uploads/) ? asset(linkRoute) : linkRoute,
        target: '_blank',
      };
    }

    if (nativeLink) {
      externalProps = {
        href: 'javascript:;',
      };
    }

    const content = (
      <a
        ref={innerRef}
        title={title || (typeof children === 'string' ? children : '')}
        className={cx(className, { 'is-active': isActiveClassName })}
        {...{ ...nativeProps, ...externalProps }}
      >
        {children}
      </a>
    );

    if (isExternal || nativeLink) {
      return content;
    }
    
    return (
      <Link route={linkRoute} params={linkParams}>
        {content}
      </Link>
    );
  }
}

const mapStateToProps = ({ lang }) => ({ lang });

export default connect(mapStateToProps)(withRouter(CustomLink));
