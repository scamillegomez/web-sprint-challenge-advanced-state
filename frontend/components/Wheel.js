import React from 'react'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'
import { connect } from 'react-redux'

const Wheel = (props) => {
  
  console.log(props.wheel);
  return (
    <div id="wrapper">
      <div id="wheel">
        {/* {
          [0,1,2,3,4,5].map((idx) => (
            <div style={{ "--i": {idx}}} className={`${idx === props.wheel ? 'cog active' : 'cog'}`}>
              {idx === props.wheel ? 'B' : ''}
            </div>
          ))} */}
        
        

        <div className= {`cog ${props.wheel === 0 ? 'active' : ''}`} style={{ "--i": 0 }} value={0}>{`${props.wheel === 0 ? 'B' : ''}`}</div>
        <div className={`cog ${props.wheel === 1 ? 'active' : ''}`} style={{ "--i": 1 }} value={1}>{`${props.wheel === 1 ? 'B' : ''}`}</div>
        <div className={`cog ${props.wheel === 2 ? 'active' : ''}`} style={{ "--i": 2 }} value={2}>{`${props.wheel === 2 ? 'B' : ''}`}</div>
        <div className={`cog ${props.wheel === 3 ? 'active' : ''}`} style={{ "--i": 3 }} value={3}>{`${props.wheel === 3 ? 'B' : ''}`}</div>
        <div className={`cog ${props.wheel === 4 ? 'active' : ''}`} style={{ "--i": 4 }} value={4}>{`${props.wheel === 4 ? 'B' : ''}`}</div>
        <div className={`cog ${props.wheel === 5 ? 'active' : ''}`} style={{ "--i": 5 }} value={5}>{`${props.wheel === 5 ? 'B' : ''}`}</div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={()=>props.moveCounterClockwise()}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={()=>props.moveClockwise()}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheel: state.wheel
  }

}
export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);


