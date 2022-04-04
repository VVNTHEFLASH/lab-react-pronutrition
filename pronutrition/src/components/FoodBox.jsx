import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../components/FoodBox.css";
import FoodList from "../components/FoodList.json";

export default class FoodBox extends Component {

    constructor(props){
        super(props)
        this.state = {
            search: ""
        }
        this.caloriesCount = parseInt(0);
        this.mainList = [];
    }

    createMainList = (foodName, foodCal, foodQty) => {
        this.mainList.push({
          name: foodName,
          cal: foodCal * foodQty,
          quantity: foodQty,
        });
      };
    
      removeFoodFromTodaysList = (event) => {
        console.log("delete");
        var tempList = [];
        this.caloriesCount = parseInt(0);
        for (let i = 0; i < this.mainList.length; i++) {
          if (event.target.value !== this.mainList[i].name) {
            tempList.push(this.mainList[i]);
            this.caloriesCount += this.mainList[i].cal;
          }
        }
        this.mainList = tempList;
        this.renderSideList();
      };
    
      addToListHandler = (e) => {
        var foodName = e.target.value;
        const list = FoodList;
    
        for (let i = 0; i < list.length; i++) {
          if (list[i].name === foodName) {
            this.caloriesCount = this.caloriesCount + list[i].cal; //total calories eaten
            var nameFoundInMainList = 0;
            for (let i = 0; i < this.mainList.length; i++) {
              if (this.mainList[i].name === foodName) {
                nameFoundInMainList = 1;
                this.mainList[i].quantity += 1;
                break;
              }
            }
            if (nameFoundInMainList === 0) {
              this.createMainList(foodName, list[i].cal, 1);
            }
            break;
          }
        }
        this.renderSideList();
      };
    
      renderSideList = () => {
        const MapOfList = this.mainList.map((item) => {
          return (
            <li key={item.name}>
              {item.name} x {item.quantity} = {item.cal}
              <button
                value={item.name}
                onClick={this.removeFoodFromTodaysList}
                className="cancel-food"
              >
                x
              </button>
            </li>
          );
        });

        ReactDOM.render(
            <>
              <ul className="listitem">{MapOfList}</ul>
              <br></br>
            </>,
            document.getElementById("list")
          );
          ReactDOM.render(
            <p className="todayHeader">
              Today's Food : {this.caloriesCount} Calories
            </p>,
            document.getElementById("todayHeader")
          );
        };
      
// Template for each food
    renderFoodList = (item) => {
        return(
            <>
                <div className="box">
                    <div className="image">
                        <img src={item.image_url} alt="food_image" />
                    </div>
                    <div className="name">
                        <h4>{item.foodname}</h4>
                        <p>{item.foodcalories} Cal</p>
                    </div>
                    <div className="input">
                        <input type="number" defaultValue="1" />
                        <button className="plus-food" id="btn" value={item.name} onClick={this.addToListHandler}>+</button>
                    </div>
                </div>
            </>
        )
    }

// Template for each added food
    // renderTodaysFoodList = (item) => {
    //     return(
    //         <>
    //             <div className="TodayFoodList" key={item.foodname}>
    //                 <p>{item.foodname} - {item.calories}</p>
    //                 <button id="delete">X</button>
    //             </div>
    //         </>
    //     )
    // }

    onChangeHandler = e => {
        this.setState({ search: e.target.value });
    }

    // inputChangeHandler = (e) => {
    //     this.setState({count: e.target.value})
    // }

    render(){
        const { search } = this.state;
        const filteredFoods = FoodList.filter((food, key) => {
            return food.foodname.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });

        // let { foodManage } = this.state;
        // let addFoods = () => {

        // }
        return(
            <>
      <div className='SearchBox'>
          <h1>Search</h1>
          <input type="text" placeholder="Search Food"
                onChange={this.onChangeHandler}
                />
      </div>
            <div className="grid">
                <div className="left">
                    {filteredFoods.map((food) => {
                        return this.renderFoodList(food);
                    })}
                </div>
                <div className="right">
                    <div className="todayFood">
                    <p id="todayHeader">Today's Food : {this.caloriesCount} Calories</p>
                    <div id="list"></div>
                    </div>  
                </div>
            </div>
            </>
        )
    }
} 