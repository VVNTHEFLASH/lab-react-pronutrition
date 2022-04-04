import React, { Component } from "react";
import "./App.css";
import FoodBox from "./components/FoodBox";
// import SearchBox from "./components/SearchBox";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className="header">
          <h3>Pro-Nutrition</h3>
        </div>
        {/* <SearchBox /> */}
        <FoodBox />
      </div>
    );
  }
}

export default App;