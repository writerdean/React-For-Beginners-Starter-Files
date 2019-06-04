import React from "react";
import Header from "./Header"
import Order from "./Order"
import Inventory from "./Inventory"
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {// this will sync the state btwn our app and Firebase
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId)
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });// need to change it back into object
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    // console.log('IT UPDATED!!!!!!!');
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {// use this syntax because we need to use 'this'
  // this.state.fishes.push(fish) NO, not this way
  // this.state.fishes.fish1 = fish NO, not this way either
  // 1. take a copy of the existing state
  const fishes = {...this.state.fishes};// the object spread will take a copy of the current state
  // 2. Add our new fish to that fishes variable
  fishes[`fish${Date.now()}`] = fish;// gives the new fish a timestamp as a unique identifier, now the state (const fishes) is the new updated state (fishes[timestampe] = fish)
  // 3. Set the new fishes object to state, passing it the piece of state that you want to update
  this.setState({ fishes });// this will take the old fishes, combine it with the new fishes, and overwrite the state to the new fishes object, Remember if the property and value are the same, you can just pass in the property (i.e., fishes)
};

updateFish = (key, updatedFish) => {
  // 1. take a copy of the current state
  const fishes = {...this.state.fishes};
  // 2. update the state
  fishes[key] = updatedFish;
  // 3. set that to state
  this.setState({ fishes });
}

deleteFish = (key) => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state - set the fish to null so that Firebase will update in sync (instead of just deleting the fish)
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes });
}

loadSampleFishes = () => {
  this.setState({ fishes: sampleFishes });
};

addToOrder = (key) => {
  // 1. Take a copy of state
  const order = { ...this.state.order };
  // 2. either add to order or update number in our order
  order[key] = order[key]+1 || 1;
  // 3. call setState to update our state object
  this.setState({ order })
}
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
            <ul className="fishes">
              {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}></Fish>)}
            </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish} 
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;