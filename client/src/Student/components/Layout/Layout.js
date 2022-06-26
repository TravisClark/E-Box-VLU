import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../../shared/store/auth-slice';
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

function Layout(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const {isLoggedIn} = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(authActions.autoLoginHandler())
  }, [dispatch]);
  useEffect(() => {
    !isLoggedIn && history.push('/')
  }, [isLoggedIn, history]);
  return (
    <>
    <Navbar/>
    {props.children}
    <Footer/>
    </>
  )
}

export default Layout