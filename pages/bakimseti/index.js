import React from 'react';
import styled from 'styled-components';
import Layout from '../../layouts/container';
import { Container } from '../../reactor';
import CarSelect from './car-select';
// import { useDispatch, useSelector } from 'react-redux';
// import { animateScroll as scroll } from 'react-scroll';
// import Api from '../../api';
// import ProductSelect from './product-select';

const BakimSetiPage = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
`;

function BakimSeti() {
//   const [page, setpage] = useState(1);
//   const [newproduct, setnewproduct] = useState(null);
//   const [isLoading, setisLoading] = useState(false);

  //   const storeState = useSelector((state) => state);
  //   const dispatch = useDispatch();
  //   const { tempCar, isLogin, tempBakimSeti } = storeState;

  return (
    <Layout meta={{ title: 'Pratik Bakım Robotu' }}>
      <BakimSetiPage>
        <Container>
          <CarSelect />
        </Container>
      </BakimSetiPage>
    </Layout>
  );
}

export default BakimSeti;
