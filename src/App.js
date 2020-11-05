import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

//import Amplify, { Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        items: [
            { name: "Feed the cat", status: "NEW" },
            { name: "Discover purpose of life", status: "NEW" },
            { name: "Learn to cloud", status: "NEW" }
        ]
    }
  }

  logout = () => {
    Auth.signOut();
    window.location.reload();
  }

  render(){
    return (
        <div className="App">
            <main>
                <h1>TODO List</h1>
                <TodoList items={this.state.items} />
            </main>
            <button onClick={this.logout}>Log out</button>
        </div>
    );
  }
}

class TodoList extends Component {
    render() {
        return(
            <div className="TodoList">
                <ul>
                    {
                        this.props.items.map( (itm, i) => {
                            return <TodoItem item={itm} key={i} />
                        })
                    }
                </ul>
            </div>
        )
    }
}

class TodoItem extends Component {
    render(){
        const item = this.props.item;

        return (
            <li>
                <input type="checkbox" />
                {item.name}
            </li>
        )
    }
}

export default withAuthenticator(App);
