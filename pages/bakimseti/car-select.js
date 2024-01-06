/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import {
  Button, Input, Label,
} from 'semantic-ui-react';
import _ from 'lodash';
import cx from 'classnames';
import { media } from '../../style/theme';
// import CarSelect from "./components/car-select";
import SeoContent from '../../components/product-list/seo-content';
// import carsApi from './carsApi.json';
import Api from '../../api';
import ProductPage from './product-page';
import { getInquireData, setChangePage } from "../../actions";
import Select from "../../ui/select";

const Outer = styled(Flex)`
  margin: 40px 0;
  ${media.tablet`
    margin: 0;
  `};
  .main {
    min-height: 700px;
    padding: 40px;
    border-radius: 3px;
    background-image: linear-gradient(rgb(233, 190, 8), rgb(255, 137, 0));
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    ${media.tablet`
      flex-direction: column;
      padding: 20px;
      min-height: auto;
    `};
    .robot {
      background-image: url("/static/img/robot.png");
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      ${media.tablet`
        background: none;
      `};
      .page-title {
        display: inline-flex;
        align-items: center;
        height: 60px;
        border-radius: 30px;
        background-color: rgba(255, 255, 255, 0.2);
        padding-right: 30px;
        font-size: 20px;
        font-weight: 500;
        color: white;
        text-transform: uppercase;
        ${media.tablet`
          width: 100%;
        `};
        ${media.phoneMini`
          width: 100%;
          height: 50px;
          border-radius: 25px;
          font-size: 16px;
        `};
        span {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          margin-right: 15px;
          font-size: 30px;
          font-weight: 600;
          color: #ff8900;
        }
      }
    }
    .car {
      padding-right: 20px;
      ${media.tablet`
        padding-right: 0;
      `};
    }
  }
  .two {
    display: flex;
    flex-direction: column;
  }
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  .car-select {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    padding: 50px 0;
    ${media.tablet`
      padding: 20px 0;
    `};
    .car-select-box {
      width: 100%;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      .ui.label {
        background-color: inherit;
        font-size: 1.2em;
        color: white;
        margin-left: -1rem;
      }
      ${media.tablet`
        padding: 10px;
      `};
    }
  }
  .ui.selection.dropdown,
  .ui.selection.dropdown .item {
    padding-left: 10px !important;
    padding-right: 5px !important;
  }
  .ui.selection.dropdown {
    min-width: auto;
    display: block;
    border-radius: 0;
    border: 1px solid #dddddd;
    padding-top: 12px;
    padding-bottom: 12px;
    min-height: auto;
    position: relative;
    ${media.tablet`
      min-width: 100%;
    `};
    .menu {
      border: none;
      margin: 0;
      min-width: 100%;
      width: 100%;
    }
    .icon {
      font-family: "icomoon";
      font-size: 12px;
      padding: 12px;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      margin: 0;
      &:before {
        content: "\\e903";
      }
    }
  }

  .ui.button {
    color: white;
    text-transform: uppercase;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.3);
    height: 42px;
  }
`;

const title = 'PRATİK BAKIM ROBOTU NEDİR';
const content = '<p><span>Pratik bakım robotu, arabanızın özelliklerine göre periyodik bakım seti oluşturmanızı sağlar.</span> Motorun uzun süre ve sorunsuz çalışması için, yapılması gerekenler yağ bakımı ve filtrelerin değişimidir. Motor için hayati önemi olan yağ, tüm motor aksamını koruyan bir maddedir. Yağın ve filtrelerin düzenli olarak değiştirilmesi, motor ömrünü otomatik olarak uzatarak  motorun sorunsuz çalışmasını sağlar. Bu yüzden aracın kaç km’de olduğunun kontrol edilmesi ve bakım zamanının gelip gelmediğinin iyi takip edilmesi gerekir.</p><h2>MARKALARA ÖZEL BAKIM SETİ ROBOTU:</h2><p>Renault Clio ya da Fluence bakım seti, Ford Focus bakım seti, Toyoto Corolla bakım seti,  Fiat Linea bakım seti, Honda Civic bakım seti, Hyundai Accent bakım seti, Mazda 3 bakım seti ile aklınıza gelebilecek her marka ve model araca yönelik bakım setine Aloparca.com’dan  ulaşabilirsiniz.</p><p>Sitemizde bakım seti robotu sekmesine girip aracınızın marka model- kasa tipi –yılı-motor hacmi ve beygir gücü bilgilerini girdikten sonra karşınıza aracınıza uygun hava, polen, yağ ve yakıt filtresi ile madeni yağ seçenekleri çıkar.  Bu seçeneklerden dilediğinizi seçerek  sepetinize ekleyebilir ve alışverişi tamamlayı seçerek seçtiğiniz ürünleri satın alabilirsiniz.</p>';

const Car = ({ stepNext }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state);
  const { inquireData, changePage } = useSelector(state => state.pratikBakim);
  const [carBrands, setcarBrands] = useState([]);
  const [selectedBrand, setselectedBrand] = useState('');
  const [carModels, setcarModels] = useState([]);
  const [selectedModel, setselectedModel] = useState('');
  const [carsEngineValue, setcarsEngineValue] = useState([]);
  const [selectedEngine, setselectedEngine] = useState('');
  const [enteredKm, setenteredKm] = useState(0);
  const [allFieldsFull, setallFieldsFull] = useState(false);
  const carsApi = Api.get('PratikBakim/carBrands');
  const loggedOrLogout = userData === null ? 0 : userData.user[0].id;

  useEffect(() => {
    const carsBrandList = [];
    async function getCarList() {
      await carsApi.then((res) => {
        Object.keys(res).forEach((brand, index) => {
          const obj = {
            key: index,
            text: brand,
            value: brand,
          };
          carsBrandList.push(obj);
        });
        setcarBrands(carsBrandList);
      });
    }
    getCarList();
  }, []);

  useEffect(() => {
    const carsModelList = [];
    selectedBrand !== '' && carsApi.then((res) => {
      const mySelectedBrand = res[selectedBrand];
      Object.keys(mySelectedBrand).forEach((model, index) => {
        const obj = {
          key: index,
          text: model,
          value: model,
        };
        carsModelList.push(obj);
      });
      setcarModels(carsModelList);
    });
  }, [selectedBrand]);

  useEffect(() => {
    const carsEngineList = [];
    selectedModel !== '' && carsApi.then((res) => {
      const mySelectedModel = res[selectedBrand][selectedModel];
      mySelectedModel.forEach((engine, index) => {
        const obj = {
          key: index,
          text: engine,
          value: engine,
        };
        carsEngineList.push(obj);
      });
      setcarsEngineValue(carsEngineList);
    });
  }, [selectedModel]);

  useEffect(() => {
    if (enteredKm < 0) {
      setenteredKm(0);
    } else if (enteredKm > 1000000) {
      setenteredKm(1000000);
    }
    if (typeof enteredKm === 'number') {
      setenteredKm(String(enteredKm));
    }
  }, [enteredKm]);

  useEffect(() => {
    if (
      Number(enteredKm) >= 1
      && selectedEngine.length >= 1
      && selectedModel.length >= 1
      && selectedBrand.length >= 1
      && selectedEngine.length !== ''
      && selectedModel.length !== ''
      && selectedBrand.length !== ''
    ) {
      setallFieldsFull(true);
    } else {
      setallFieldsFull(false);
    }
  }, [enteredKm, selectedEngine, selectedModel, selectedBrand]);

  const SetPageFunc = () => {
    if (changePage === false) {
      return dispatch(setChangePage(true));
    } else {
      setselectedBrand('');
      setselectedModel('');
      setselectedEngine('');
      setenteredKm(0);
      dispatch(setChangePage(false));
    }
  };

  const onClick = async () => {
    const data = await Api.get(`PratikBakim/sorgula?marka=${selectedBrand}&model=${selectedModel}&motor=${selectedEngine}&km=${enteredKm}&uye_id=${loggedOrLogout}`);
    dispatch(getInquireData(data.paketler));
    SetPageFunc();
  };

  useEffect(() => {
    setselectedModel('');
    setselectedEngine('');
  }, [selectedBrand]);

  useEffect(() => {
    setselectedEngine('');
  }, [selectedModel]);

  return (
    <Outer flexDirection="column">
      <SeoContent mt={-40} title={title} content={content} />
      {!changePage ? (
        <Flex mb={3} className="main">
          <Box className="robot" width={[1, 1, 2 / 3]}>
            <div className="page-title">
              <span>1</span>
              araç bilgileriniz
            </div>
          </Box>
          <Flex className="car" width={[1, 1, 1 / 3]} alignItems="center">
            <Inner>
              <Flex className="car-select">
                <Box
                  className={cx('car-select-box', {
                    disabled: false,
                  })}
                  width={1}
                  px={[1, 1, 2]}
                  key="1"
                >
                  <Label className="label">Marka</Label>
                  <Select
                    fullWidth
                    name="Marka"
                    placeholder="Marka seçiniz"
                    options={carBrands}
                    setSelected={setselectedBrand}
                    selected={selectedBrand}
                  />
                </Box>
                <Box
                  className={cx('car-select-box', {
                    disabled: false,
                  })}
                  width={1}
                  px={[1, 1, 2]}
                  key="2"
                >
                  <Label className="label">Model</Label>
                  <Select
                    fullWidth
                    name="Model"
                    placeholder="Model seçiniz"
                    disabled={selectedBrand === ''}
                    options={carModels}
                    setSelected={setselectedModel}
                    selected={selectedModel}
                  />
                </Box>
                <Box
                  className={cx('car-select-box', {
                    disabled: false,
                  })}
                  width={1}
                  px={[1, 1, 2]}
                  key="3"
                >
                  <Label className="label">Motor Hacmi</Label>
                  <Select
                    fullWidth
                    name="Motor"
                    id="Motor"
                    placeholder="Motor seçiniz"
                    disabled={selectedModel === ''}
                    options={carsEngineValue}
                    setSelected={setselectedEngine}
                    selected={selectedEngine}
                  />
                </Box>
                <Box
                  className={cx('car-select-box', {
                    disabled: false,
                  })}
                  width={1}
                  px={[1, 1, 2]}
                  key="4"
                >
                  <Label className="label">Kilometre</Label>

                  <Input
                    type="number"
                    value={enteredKm}
                    onChange={(e) => setenteredKm(e.target.value)}
                  />
                </Box>
                <Box className="car-select-box" width={1} px={[1, 1, 2]}>
                  <Button
                    type="button"
                    onClick={() => onClick()}
                    fluid
                    width="100"
                    disabled={!allFieldsFull}
                  >
                    DEVAM ET
                  </Button>
                </Box>
              </Flex>
            </Inner>
          </Flex>
        </Flex>
      ) : (
        <ProductPage SetPageFunc={SetPageFunc} data={inquireData} />
      )}
    </Outer>
  );
};
export default Car;
