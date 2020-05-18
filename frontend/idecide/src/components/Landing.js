import React, { Component } from 'react';
import { Link } from 'react-router-dom';




class Landing extends Component {
  render() {
    return (
      <div className="container" style={{ padding: "150px" }}>


        <h1 style={{ color: "purple" }}>Women's Wellbeing Project</h1>
        <br></br>
        <h2>Do you worry about whether your relationship is healthy?</h2>
        <h2>Do you sometimes wonder if you are safe?</h2>
        <p>This website is for women who feel unsafe or afraid of a current or ex-partner.</p>
        <button >Start(anonmously)</button><br></br>
        <Link to="./loginComponent/loginPage">
          <button >Log in</button>
        </Link>


      </div>
    )
  }
}

export default Landing
