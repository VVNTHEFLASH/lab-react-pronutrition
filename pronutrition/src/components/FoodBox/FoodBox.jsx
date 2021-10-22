import React, { Component } from 'react';
import './FoodBox.css'

export default class FoodBox extends Component {

  constructor(foods) {
    super(foods);
    this.state = {
      name: 'Pizza',
      calories: 400,
      url: 'https://i.imgur.com/eTmWoAN.png'
    }
  }


  render() {
    return (
        <div className="box">
    <article className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img src=''/>
          {/* <img src="https://i.imgur.com/eTmWoAN.png" /> */}
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{this.state.name}</strong> <br />
            <small>{this.state.calories} cal</small>
          </p>
        </div>
      </div>
      <div className="media-right">
        <div className="field has-addons">
          <div className="control">
            <input className="input" type="number" value="1" />
            <button className="button is-info">
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
    )
  }
}
