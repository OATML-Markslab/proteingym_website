import React, { Fragment } from 'react';
import "./DirectionallyAwareButton.css";
import { useNavigate } from 'react-router-dom';

const DirectionallyAwareButton = ({ as, children, filled, secondary, ...rest }) => {
    const navigate = useNavigate()
    function onClick(e) {
        navigate(rest.pageLink, {replace: true, state:{viewType: rest.viewType, dataDomain: rest.dataDomain, modelParadigm: rest.modelParadigm, sortKey: rest.sortKey, currStatistic: rest.currStatistic }});
      }
    const that = {
      as
    }
    return (
      <that.as onClick={onClick} className={`dir-control ${secondary ? 'dir-control--secondary' : ''} ${filled ? 'dir-control--filled' : ''}`} >
        {children}
        <span/>
        <span/>
        <span/>
        <span/>
        <b aria-hidden="true">{children}</b>
        <b aria-hidden="true">{children}</b>
        <b aria-hidden="true">{children}</b>
        <b aria-hidden="true">{children}</b>
      </that.as>
    )
  }
  DirectionallyAwareButton.defaultProps = {
    as: 'button',
  }

export default DirectionallyAwareButton;
  