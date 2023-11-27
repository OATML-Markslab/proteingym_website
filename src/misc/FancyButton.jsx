import React from 'react';
import ReactDOM from 'react-dom';
import { useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';
import "./FancyButton.css";

function FancyButton(props){
    const navigate = useNavigate()
    function onClick(e) {
        navigate(props.pageLink, {replace: true, state:{viewType: props.viewType, dataDomain: props.dataDomain, modelParadigm: props.modelParadigm, sortKey: props.sortKey, currStatistic: props.currStatistic }});
      }
    return <button className="button bottom" onClick={onClick}>
        {props.text}
        </button>
}

export default FancyButton