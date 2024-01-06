import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import cx from 'classnames';
import { Grid, Select, Tab } from 'semantic-ui-react';

import { Link } from '../../reactor';

import Api from '../../lastikApi';

const Outer = styled.div`
  .lastikTab {
    background: transparent !important;
    margin-top: -43px;

    .ui.tabular.menu .item {
      background-color: ${props => props.theme.color.primary};
      border: none;
      color: #fff;
    }
    .ui.bottom.attached.segment {
      background-color: ${props => props.theme.color.primary};
    }

    &.solmenu {
      .row {
        display: block;

        .column {
          display: block;
        }
      }
    }

    > div {
      /* background-color: #ff8900 !important; */
      color: #fff;
      border: none !important;
    }

    label {
      color: #333;
    }

    .lastikTab .ui.bottom.tab {
      background: #ff8900;
    }
  }
`;

/*
  genişlikler
  /

  genişlik degeri ile uyumlu yükseklikler
  &width=145

  genişlik-yükseklik uyumlu çap
  &width=145&ratio=70

  genişlik-yükseklik-çap uyumlu yük endeksi
  &width=145&ratio=70&diameter=13

  genişlik-yükseklik-çap-yük uyumlu hız endeksleri
  &width=145&ratio=70&diameter=13&loadIndex=71

*/

class LastikFiltresi extends React.Component {
  // state = { markalar: markalarListe[0].markalar };
  state = {
    seciliGenislik: '',
    seciliYukseklik: '',
    seciliCap: '',
    seciliYuk: '',
    seciliHiz: '',

    genislikler: [],
    yukseklikler: [],
    caplar: [],
    yukEndeksleri: [],
    hizEndeksleri: [],
  };
  async componentDidMount() {
    const { widths } = await Api.get();
    this.setState({
      genislikler: widths.map(item => ({ text: item.value, value: item.value })),
    });
  }

  changeGenislik = async (e, { value }) => {
    const { ratios } = await Api.get(`&width=${value}`);
    this.setState({
      seciliGenislik: value,
      yukseklikler: ratios.map(item => ({ text: item.value, value: item.value })),

      seciliYukseklik: '',
      seciliCap: '',
      seciliYuk: '',
      seciliHiz: '',
      caplar: [],
      yukEndeksleri: [],
      hizEndeksleri: [],
    });

    if (ratios.length < 2) {
      const tekSecenek = this.state.ratios[0].value;
      const { diameters } = await Api.get(`&width=${this.state.seciliGenislik}&ratio=${tekSecenek}`);
      this.setState({
        seciliYukseklik: tekSecenek,
        caplar: diameters.map(item => ({ text: item.value, value: item.value })),

        seciliCap: '',
        seciliYuk: '',
        seciliHiz: '',

        yukEndeksleri: [],
        hizEndeksleri: [],
      });
    }
  };

  changeYukseklik = async (e, { value }) => {
    const { diameters } = await Api.get(`&width=${this.state.seciliGenislik}&ratio=${value}`);
    this.setState({
      seciliYukseklik: value,
      caplar: diameters.map(item => ({ text: item.value, value: item.value })),

      seciliCap: '',
      seciliYuk: '',
      seciliHiz: '',

      yukEndeksleri: [],
      hizEndeksleri: [],
    });

    if (diameters.length < 2) {
      // tek seçenek var , this.state.caplar[0].value
      const tekSecenek = this.state.caplar[0].value;
      const { loadIndexes } = await Api.get(`&width=${this.state.seciliGenislik}&ratio=${
        this.state.seciliYukseklik
      }&diameter=${tekSecenek}`);
      this.setState({
        seciliCap: tekSecenek,
        yukEndeksleri: loadIndexes.map(item => ({ text: item.value, value: item.value })),
      });
    }
  };

  changeCap = async (e, { value }) => {
    const { loadIndexes } = await Api.get(`&width=${this.state.seciliGenislik}&ratio=${this.state.seciliYukseklik}&diameter=${value}`);
    this.setState({
      seciliCap: value,
      yukEndeksleri: loadIndexes.map(item => ({ text: item.value, value: item.value })),

      seciliYuk: '',
      seciliHiz: '',

      hizEndeksleri: [],
    });

    // console.log('seciliCap: ', this.state.seciliCap);

    if (loadIndexes.length < 2) {
      // tek seçenek var , this.state.caplar[0].value
      const tekSecenek = this.state.yukEndeksleri[0].value;
      const { speedIndexes } = await Api.get(`&width=${this.state.seciliGenislik}&ratio=${this.state.seciliYukseklik}&diameter=${
        this.state.seciliCap
      }&loadIndex=${tekSecenek}`);

      this.setState({
        seciliYuk: tekSecenek,
        hizEndeksleri: speedIndexes.map(item => ({ text: item.value, value: item.value })),
      });
    }
  };

  changeYuk = async (e, { value }) => {
    const { speedIndexes } = await Api.get(`&width=${this.state.seciliGenislik}&ratio=${this.state.seciliYukseklik}&diameter=${
      this.state.seciliCap
    }&loadIndex=${value}`);

    this.setState({
      seciliYuk: value,
      hizEndeksleri: speedIndexes.map(item => ({ text: item.value, value: item.value })),
    });

    if (speedIndexes.length < 2) {
      // tek seçenek var , this.state.caplar[0].value
      const tekSecenek = this.state.speedIndexes[0].value;

      this.setState({
        seciliHiz: tekSecenek,
      });
    }
  };

  changeHiz = async (e, { value }) => {
    // const { loadIndexes } = await Api.get(`&width=${this.state.seciliGenislik}&ratio=${this.state.seciliYukseklik}&diameter=${this.state.seciliCap}`);
    this.setState({
      seciliHiz: value,
    });
  };

  render() {
    // const { genislik } = this.state;
    const { query, bolge } = this.props;
    const {
      genislikler, yukseklikler, caplar, yukEndeksleri, hizEndeksleri,
    } = this.state;

    // console.log('state : ', this.state);

    const LastikTab = [
      {
        menuItem: 'EBATA GÖRE ARA',
        render: () => (
          <Tab.Pane>
            <Flex p={2} flexDirection="column">
              <Flex className="ebatagore-filtre" flexDirection="column">
                <Grid flexDirection="column"s="equal">
                  <Grid.Row>
                    <Grid.Column>
                      <label className="form-label required">Genişlik</label>
                      <Select
                        placeholder="Genişlik"
                        onChange={this.changeGenislik}
                        options={genislikler}
                        disabled={!(genislikler.length > 0)}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <label className="form-label required">Yükseklik</label>

                      <Select
                        id="yukseklikSelect"
                        placeholder="Yükseklik"
                        onChange={this.changeYukseklik}
                        options={yukseklikler}
                        disabled={!(yukseklikler.length > 0)}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <label className="form-label required">Çap</label>

                      <Select
                        id="capSelect"
                        placeholder="Çap"
                        onChange={this.changeCap}
                        options={caplar}
                        disabled={!(caplar.length > 0)}
                        value={caplar.length === 1 ? caplar[0].value : false}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <label className="form-label required">Yük Endeksi</label>
                      <Select
                        placeholder="Yük Endeksi"
                        onChange={this.changeYuk}
                        options={yukEndeksleri}
                        disabled={!(yukEndeksleri.length > 0)}
                        value={
                          yukEndeksleri[0] && yukEndeksleri.length < 2
                            ? yukEndeksleri[0].value
                            : false
                        }
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <label className="form-label required">Hız Endeksi</label>
                      <Select
                        placeholder="Hız Endeksi"
                        onChange={this.changeHiz}
                        options={hizEndeksleri}
                        disabled={!(hizEndeksleri.length > 0)}
                        value={
                          hizEndeksleri[0] && hizEndeksleri.length < 2
                            ? hizEndeksleri[0].value
                            : false
                        }
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Flex>
            </Flex>
          </Tab.Pane>
        ),
      },
      /* { menuItem: 'ARACA GÖRE ARA', render: () => <Tab.Pane>araca göre arama formu</Tab.Pane> }, */
    ];

    // console.log('bolge: ', bolge);

    return (
      <Outer>
        <Tab className={cx('lastikTab', bolge)} panes={LastikTab} />
      </Outer>
    );
  }
}
export default LastikFiltresi;
