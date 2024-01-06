import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import Spinner from '../../../ui/spinner';
import moment from 'moment';

import { media } from '../../../style/theme';
import { Link } from '../../../reactor';
import Api from '../../../api';

const Outer = styled(Flex)`
  font-size: 16px;
  color: #525355;
  .ticket-header {
    ${media.tablet`
      flex-direction: column;
      `};
    .new-ticket {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      color: white;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      text-align: center;
      border-radius: 3px;
      background-color: #ff8900;
      ${media.tablet`
        width: 100%;
        margin-top: 15px;
        justify-content: center;
        `};
      i {
        font-size: 18px;
        margin-right: 10px;
      }
    }
  }
  .ticket-tablo {
    border: 1px solid #dddddd;
    border-radius: 3px;
    ${media.tablet`
      border-top: 0;
      `};
    .mobile {
      ${media.tablet`
        display: none;
        `};
    }
    .tablo-satir {
      ${media.tablet`
        flex-direction: column;
        `};
      & + .tablo-satir {
        border-top: 1px solid #dddddd;
      }
      .sutun {
        padding: 15px 20px;
        ${media.tablet`
          align-items: center;
          justify-content: flex-start;
          `};
        strong.mobile {
          display: none;
          font-weight: 500;
          ${media.tablet`
            display: inline-block;
            margin-right: 5px;
            `};
        }
        &.baslik {
          font-weight: 500;
          color: #ff8900;
          text-transform: uppercase;
        }
        a {
          display: flex;
          align-items: center;
          font-weight: 500;
          ${media.tablet`
            color: #ff8900;
            `};
          &:hover {
            color: #ff8900;
          }
        }
      }
    }
  }
`;

class Destek extends React.Component {
  state = { ticket: null, loading: true };
  componentDidMount() {
    this.loadData();
  }
  loadData = async () => {
    const ticket = await Api.get('Ticket/ticket_list');
    this.setState({ ticket, loading: false });
  };
  selectStatus = (data) => {
    switch (data) {
      case 'closed':
        return 'Kapalı';
      case 'solved':
        return 'Çözüldü';
      case 'open':
        return 'Açık';
      case 'new':
        return 'Yeni';
      default:
        return null;
    }
  };

  render() {
    const { ticket, loading } = this.state;
    return (
      <Outer flexDirection="column">
        {loading ? (
          <Flex my={3} justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          <React.Fragment>
            <Flex className="ticket-header" alignItems="center" justifyContent="space-between">
              Ticketlar ({ticket.count} adet){' '}
              <Link route="profile" params={{ slug: 'destek-merkezi-yeni' }} className="new-ticket">
                <i className="icon-add" /> Yeni Destek Talebi
              </Link>
            </Flex>
            <Flex className="ticket-tablo" flexDirection="column" mt={2}>
              <Flex alignItems="stretch" className="tablo-satir mobile" width={1}>
                <Flex alignItems="center" justifyContent="center" className="sutun" width={1 / 12} />
                <Flex alignItems="center" justifyContent="center" className="sutun baslik" width={1 / 12}>
                  Durum
                </Flex>
                <Flex alignItems="center" className="sutun baslik" width={6 / 12}>
                  Konu
                </Flex>
                <Flex alignItems="center" justifyContent="center" className="sutun baslik" width={1 / 12}>
                  Bölüm
                </Flex>
                <Flex alignItems="center" justifyContent="center" className="sutun baslik" width={3 / 12}>
                  Tarih
                </Flex>
              </Flex>
              {ticket.requests &&
                ticket.requests.reverse().map(item => (
                  <Flex alignItems="stretch" className="tablo-satir" width={1} key={item.id}>
                    <Flex alignItems="center" justifyContent="center" className="sutun" width={[1, 1, 1 / 12]}>
                      <strong className="mobile">Destek Kaydı: </strong>
                      {item.id}
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" className="sutun" width={[1, 1, 1 / 12]}>
                      <strong className="mobile">Durum: </strong>
                      {this.selectStatus(item.status)}
                    </Flex>
                    <Flex alignItems="center" className="sutun" width={[1, 1, 6 / 12]}>
                      <strong className="mobile">Konu: </strong>
                      <Link route="profile" params={{ slug: 'destek-merkezi-detay', id: item.id }}>
                        {item.subject}
                      </Link>
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" className="sutun" width={[1, 1, 1 / 12]}>
                      <strong className="mobile">Bölüm: </strong>
                      {item.fields[0].value ? item.fields[0].value : 'api'}
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" className="sutun" width={[1, 1, 3 / 12]}>
                      <strong className="mobile">Tarih: </strong>
                      {moment(item.updated_at).format('DD MMMM YYYY, HH:mm')}
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          </React.Fragment>
        )}
      </Outer>
    );
  }
}
export default Destek;
