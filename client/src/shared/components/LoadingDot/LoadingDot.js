import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import DotLoader from 'react-spinners/DotLoader'
import { uiActions } from '../../store/ui-slice';

export const LoadingDot = ({className, color='#1b74e9', size='24px'}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(uiActions.setSpinnerState({ type: "DONE" }));
    }
  }, [dispatch]);
  return (
    <DotLoader size={size} color={color} className={className}/>
  )
}
