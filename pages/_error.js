// import React from 'react';
// import Error from 'next/error';
// import { connect } from 'react-redux';
// import NotFound from '../components/notfound';
// import Api from '../api';

// class ErrorPage extends React.Component {
//   static async getInitialProps({ res, err }) {
//     let statusCode = null;
//     if (res) {
//       statusCode = res.statusCode;
//       if (res.req && res.req.url && res.req.url === '/service-worker.js' || res.req && res.req.url && res.req.url.includes('next/webpack')) return statusCode;
//       const data = await Api.get(`Tools/redirect301/?url=${res.req && res.req.url ? res.req.url : '/home'}&status=404`);
//       if (parseInt(data.result.status, 10) === 301) {
//         res.writeHead(301, {
//           Location: encodeURI(res.req.url),
//         });
//         res.end();
//       }
//     } else if (err) {
//       statusCode = err.statusCode;
//     }
//     //console.log(res.statusCode);
//     return { statusCode };
//   }

//   render() {
//     const { statusCode } = this.props;
//     if ([404, 500].includes(statusCode)) {
//       return <NotFound code={statusCode} />;
//     }
//     return <Error statusCode={statusCode} />;
//   }
// }

// export default connect()(ErrorPage);

/* eslint-disable no-irregular-whitespace */
import Error from 'next/error';
import React from 'react';
import { connect } from 'react-redux';
import NotFound from '../components/notfound';
import Api from '../api';

class ErrorPage extends React.Component {
  static async getInitialProps({ res, err }) {
    let statusCode = null;
    if (res) {
      statusCode = res.statusCode;

      if (typeof res.req !== 'undefined') {
        if (
          res.req.url === '/service-worker.js'
          || res.req.url.includes('next/webpack')
          || res.req.url === '/sp-push-worker-fb.js'
        ) {
          return { statusCode };
        }

        const data = await Api.get(
          `Tools/redirect301/?url=${res.req.url}&status=${statusCode}`,
        );

        if (
          data
          && data.result
          && data.result.status
          && parseInt(data.result.status, 10) == 301
        ) {
          res.writeHead(301, {
            Location: encodeURI(data.result.redirect),
          });
          res.end();
        }

        if (
          data
          && data.result
          && data.result.status
          && data.result.status === false
        ) {
          res.writeHead(301, {
            // eslint-disable-next-line no-undef
            Location: encodeURI(data.result.redirect),
          });
          res.end();
        }
      }
      return { statusCode };
    } if (err) {
      statusCode = err.statusCode;
    }
  }

  render() {
    const { statusCode } = this.props;
    if ([404, 500].includes(statusCode)) {
      return <NotFound code={statusCode} />;
    }
    return <Error statusCode={statusCode} />;
  }
}

export default connect()(ErrorPage);
