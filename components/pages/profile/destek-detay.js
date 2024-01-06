import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import { Form, TextArea } from 'semantic-ui-react';
import Spinner from "../../../ui/spinner";
import moment from 'moment';
import cx from 'classnames';

import { media } from '../../../style/theme';
import { Link } from '../../../reactor';
import Api from '../../../api';

const Outer = styled(Flex)`
  font-size: 15px;
  color: #525355;
  .title {
    padding: 15px;
    color: white;
    background-color: #ff8900;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 500;
    ${media.tablet`
      font-size: 16px;
      padding: 10px;
    `};
    a {
      font-size: 16px;
      padding: 10px 20px;
      border-radius: 3px;
      color: #ff8900;
      background-color: white;
      ${media.tablet`
        font-size: 14px;
        padding: 10px 15px;
      `};
    }
  }
  .ticket-box {
    border: 1px solid #dddddd;
    border-radius: 3px;
    ${media.tablet`
      flex-direction: column;
    `};
    .summary {
      background-color: #dddddd;
      strong {
        font-weight: 500;
      }
      .row {
        ${media.tablet`
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        `};
        & + .row {
          border-top: 1px solid #f7f7f7;
        }
        .sub-row {
          text-align: center;
        }
        .description {
          text-align: center;
          line-height: 1.5em;
        }
        .button {
          color: #525355;
          font-weight: 500;
          background-color: #f7f7f7;
          padding: 10px 20px;
          border-radius: 3px;
          &:hover {
            color: white;
            background-color: #ff8900;
          }
        }
      }
    }
    .main {
      .message {
        flex-grow: 1;
        padding: 20px;
        .left {
          margin-right: auto;
        }
        .right {
          margin-left: auto;
          text-align: right;
        }
        .comment-title {
          font-weight: 500;
          strong {
            font-weight: 600;
          }
        }
      }
      .reply {
        padding: 20px;
        border-top: 1px solid #dddddd;
        background-color: #f7f7f7;
        .ui.form {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          textarea,
          textarea:focus {
            border-color: #dddddd;
          }
          button {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #dddddd;
            font-weight: 500;
            text-transform: uppercase;
            border-radius: 3px;
            cursor: pointer;
            &:hover {
              color: white;
              background-color: #ff8900;
            }
          }
        }
      }
    }
  }
`;

class DestekDetay extends React.Component {
  state = {
    ticket: null,
    loading: true,
    buttonLoading: false,
    statusLoading: false,
  };
  componentDidMount() {
    this.loadData();
  }
  loadData = async () => {
    const ticket = await Api.get(`Ticket/ticket_view?ticket_id=${this.props.id}`);
    this.setState({ ticket, loading: false });
  };

  commentForm = async (e) => {
    e.preventDefault();
    this.setState({ buttonLoading: true });
    if (this.comment.ref.value) {
      const fd = new FormData();
      fd.append('ticket_id', this.state.ticket.ticket_detay.tickets[0].id);
      fd.append('mesaj', this.comment.ref.value);
      e.target.reset();
      const data = await Api.post('Ticket/ticket_cevap', fd);
      if (typeof data === 'object') {
        await this.loadData();
      } else {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Mesaj gönderilirken beklenmedik bir hata oluştu.',
        });
      }
    } else {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Boş mesaj gönderemezsiniz.',
      });
    }
    this.setState({ buttonLoading: false });
  };

  changeStatus = async () => {
    this.setState({ statusLoading: true });
    const {
      ticket: {
        ticket_detay: { tickets },
      },
    } = this.state;
    const fd = new FormData();
    fd.append('ticket_id', tickets[0].id);
    fd.append('type', tickets[0].status === 'open' ? 'solved' : 'open');
    await Api.post('Ticket/ticket_ac_kapa', fd);
    await this.loadData();
    this.setState({ statusLoading: false });
  };

  render() {
    const { userData } = this.props;
    const user = userData && userData.user;
    const {
      ticket, loading, buttonLoading, statusLoading,
    } = this.state;
    return (
      <Outer flexDirection="column">
        {loading ? (
          <Flex my={3} justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          <React.Fragment>
            <Flex mb={3} alignItems="center" justifyContent="space-between" className="title">
              <span>Konu: {ticket.baslik}</span>
              <Link route="profile" params={{ slug: 'destek-merkezi' }}>
                Geri
              </Link>
            </Flex>
            <Flex className="ticket-box">
              <Flex className="summary" width={[1, 1, 1 / 5]} flexDirection="column">
                <Flex py={2} className="row" flexDirection="column" alignItems="center">
                  <Box>Destek Kaydı</Box>
                  <Box mt={[0, 0, 1]} ml={[1, 1, 0]}>
                    <strong>#{ticket.ticket_detay.tickets[0].id}</strong>
                  </Box>
                </Flex>
                <Flex py={2} className="row" flexDirection="column" alignItems="center">
                  <Box className="sub-row" width={[1 / 2, 1 / 2, 1]}>
                    Durum: <strong>{ticket.status}</strong>
                  </Box>
                  <Box className="sub-row" width={[1 / 2, 1 / 2, 1]} mt={[0, 0, 1]}>
                    Bölüm: <strong>{ticket.bolum}</strong>
                  </Box>
                  <Box className="sub-row" width={1} mt={1}>
                    Eklendi:{' '}
                    <strong>{moment(ticket.tarih_ticket).format('DD MMM YYYY HH:mm')}</strong>
                  </Box>
                </Flex>
                {ticket.ticket_detay.tickets[0].status === 'open' ||
                ticket.ticket_detay.tickets[0].status === 'new' ? (
                  <Flex py={2} className="row" flexDirection="column" alignItems="center">
                    <Box px={1} className="description">
                      Sorununuz zaten çözüldü mü? Bu destek kaydını kapatmak için aşağıdaki düğmeye
                      tıklayın.
                    </Box>
                    <Box mt={3} mb={1}>
                      {statusLoading ? (
                        <Spinner />
                      ) : (
                        <a href="javascript:;" onClick={this.changeStatus} className="button">
                          Konuyu Kapat
                        </a>
                      )}
                    </Box>
                  </Flex>
                ) : (
                  <Flex py={2} className="row" flexDirection="column" alignItems="center">
                    <Box className="description">
                      Bu konu çözümlendi olarak işaretlenmiştir. tekrar aktifleştirmek için
                      aşağıdaki buttona tıklayınız.
                    </Box>
                    <Box mt={3} mb={1}>
                      {statusLoading ? (
                        <Spinner />
                      ) : (
                        <a href="javascript:;" onClick={this.changeStatus} className="button">
                          Konuyu Tekrar Aç
                        </a>
                      )}
                    </Box>
                  </Flex>
                )}
              </Flex>
              <Flex className="main" width={[1, 1, 4 / 5]} flexDirection="column">
                <Flex className="message" justifyContent="flex-end" flexDirection="column">
                  {ticket.comments.comments.map(comment => (
                    <Flex
                      className={cx({
                        left: ticket.ticket_detay.tickets[0].assignee_id === comment.author_id,
                        right: ticket.ticket_detay.tickets[0].assignee_id !== comment.author_id,
                      })}
                      width={3 / 4}
                      flexDirection="column"
                      key={comment.id}
                    >
                      <Box mt={3} mb={1} className="comment-title">
                        <strong>
                          {ticket.ticket_detay.tickets[0].assignee_id === comment.author_id
                            ? 'Destek'
                            : `${user[0].uyeadi} ${user[0].uyesoyadi}`}
                        </strong>{' '}
                        - {moment(comment.created_at).format('DD MMM YYYY HH:mm')}
                      </Box>
                      {comment.body.split('\n').map((item, key) => (
                        <Box mb="5px" key={key}>
                          {item}
                        </Box>
                      ))}
                    </Flex>
                  ))}
                </Flex>
                {(ticket.ticket_detay.tickets[0].status === 'open' ||
                  ticket.ticket_detay.tickets[0].status === 'new') && (
                  <Flex className="reply" flexDirection="column">
                    <Form onSubmit={this.commentForm}>
                      <TextArea
                        placeholder="Cevap yazın"
                        style={{ minHeight: 100 }}
                        ref={(n) => {
                          this.comment = n;
                        }}
                      />
                      {buttonLoading ? (
                        <Box mt={2}>
                          <Spinner />
                        </Box>
                      ) : (
                        <button type="submit" name="btn_submit">Gönder</button>
                      )}
                    </Form>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </React.Fragment>
        )}
      </Outer>
    );
  }
}
const mapStateToProps = ({ userData }) => ({
  userData,
});
export default connect(mapStateToProps)(DestekDetay);
