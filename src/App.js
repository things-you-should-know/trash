import React, { Component } from 'react';
import firebase from './firebase.js';

/*Bootstrap*/
import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
/*End Bootstrap*/


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username,
      timestamp: Date.now(),
      score: 1
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref('items').orderByChild('score');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user,
          score: items[item].score
        });
      }
      this.setState({
        items: newState
      });
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  voteUp(itemId, itemScore) {
    const newScore = itemScore+1;
    return firebase.database().ref(`/items/${itemId}`).update({score:newScore});
  }
  voteDown(itemId, itemScore) {
    const newScore = itemScore-1;
    return firebase.database().ref(`/items/${itemId}`).update({score:newScore});
  }
  render() {
    return (
      <div className='app'>
        <Navbar bg='light'>
              <Navbar.Brand>Things you should know</Navbar.Brand>           
        </Navbar>
        <Container>
          <Card className='add-item' bg='dark'>
                <form onSubmit={this.handleSubmit}>
                  <Form.Control type="text" name="currentItem" placeholder="What should everyone know?" onChange={this.handleChange} value={this.state.currentItem} />
                  {/*<Form.Control type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />*/}
                  <Form.Control as="select">
                    <option value="" disabled selected>Category</option>
                    <option>Health</option>
                    <option>Relationships</option>
                    <option>Learning</option>
                  </Form.Control>
                  <button class='del'>Add Item</button>
                </form>
          </Card>
          <CardColumns>
                  {this.state.items.map((item) => {
                    return (
                      <Card bg='info' text='light'>
                      <div key={item.id}>
                        <Card.Header><Badge variant='light'>{item.score}</Badge> {item.title}</Card.Header>
                        <Card.Body>
                          <button class='del' onClick={() => this.voteUp(item.id, item.score)}>+</button>
                          <button class='del' onClick={() => this.voteDown(item.id, item.score)}>-</button>
                          <button class='del' onClick={() => this.removeItem(item.id)}>Delete</button>
                        </Card.Body>
                      </div>
                      </Card>
                    )
                  })}
          </CardColumns>
        </Container>
      </div>
    );
  }
}
export default App;