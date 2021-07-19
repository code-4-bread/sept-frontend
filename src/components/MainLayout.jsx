import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import Title from '../components/Title';



const MainLayout = (props) => (
  <>
    <Container>
      <Title />
      {props.children}
    </Container>
  </>
);

MainLayout.propTypes = {
  children: PropTypes.element
};

export default MainLayout;