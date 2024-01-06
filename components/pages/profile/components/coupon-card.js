import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import { Input } from 'semantic-ui-react';
import moment from 'moment';


class CouponCard extends React.Component {
  codeCopy = () => {
    const copyText = this.code.inputRef.current;
    copyText.select();
    document.execCommand('Copy');
    window.getSelection().removeAllRanges();
    this.props.dispatch({
      type: 'FLASH_MESSAGE',
      payload: `Kupon kodu: ${copyText.value} başarıyla kopyalandı.`,
    });
  };
  render() {
    const { coupon } = this.props;
    return (
      <Flex py={[2, 2, 0]} className="satir">
        <Flex alignItems="center" className="sutun" width={[1, 1, 1 / 2]}>
          <Flex mb={[2, 2, 0]} width={[1, 1, 1 / 4]} justifyContent="center">
            <strong>100 TL'lik çek</strong>
          </Flex>
          <Flex mb={[2, 2, 0]} width={[1, 1, 2 / 4]} justifyContent="center">
            <Input
              defaultValue={coupon.kupon_kod}
              ref={(n) => {
                this.code = n;
              }}
            />
          </Flex>
          <Flex width={[1, 1, 1 / 4]} justifyContent="center">
            <a href="javascript:;" onClick={this.codeCopy}>
              Kopyala
            </a>
          </Flex>
        </Flex>
        <Box className="sutun" width={[1, 1, 1 / 2]}>
          {coupon.son_kullanma_tarihi && (
            <React.Fragment>
              <strong>{moment.unix(coupon.son_kullanma_tarihi).format('DD/MM/YYYY')}</strong>{' '}
              tarihine kadar yapacağınız,{' '}
            </React.Fragment>
          )}
          <strong>{coupon.kosul_uzeri} TL</strong> ve üzeri alışverişlerinizde geçerlidir.
        </Box>
      </Flex>
    );
  }
}

export default connect()(CouponCard);
