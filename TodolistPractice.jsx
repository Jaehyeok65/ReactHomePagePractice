import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import Card from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import HomeIcon from '@material-ui/icons/Home';

const styles = theme => ({
  card : {
    left : '10px',
  }
});

  const databaseurl = "https://todo-e3998-default-rtdb.firebaseio.com/";


class App8 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo : {},
      Todaytodo : null,
      checked : false,
      checkedlist : [],
      todostate : 1,
    };
  }


  _get = () => {
    fetch(`${databaseurl}/Today.json`).then(res => res.json())
    .then(data => {
      this.setState({todo : data});
    })
  }

  _post = (Todaytodo) => {
    fetch(`${databaseurl}/Today.json`, {
      method : 'POST',
      body : JSON.stringify(Todaytodo)
    }
    ).then(res => res.json())
    .then(data => {
      let Todaylist = this.state.todo;
      Todaylist[data.name] = Todaytodo;
      this.setState({ todo : Todaylist});
    })
  }



  componentDidMount() {
    this._get();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }


  _delete = (id) => {
    fetch(`${databaseurl}/Today/${id}.json`, {
      method : 'DELETE',
  }).then(res => res.json())
  .then(() => {
    let nextState = this.state.todo;
    delete nextState[id];
    this.setState({ todo : nextState});
  })
  }


  handleSubmit = () => {
    const Todaytodo = {
        todo : this.state.Todaytodo,
        checked : this.state.checked
    }
    if(!Todaytodo.todo && !Todaytodo.checked) {
        return;
    }
    this._post(Todaytodo);
}


  handleDelete = (id) => {
    this._delete(id);
  }

  handleCheck = (id) => {
    let list = this.state.todo;
    const result = this.state.todo[id].checked;
    var ans = null;
    if(result === false) {
      ans = true;
    }
    else {
      ans = false;
    }
    list[id].checked = ans;
    this.setState({ todo : list});
  }

  handleTodo1 = () => {
    this.setState({todostate : 1});
  }

  handleTodo2 = () => {
    this.setState({todostate : 2});
  }
  handleTodo3 = () => {
    this.setState({todostate : 3});
  }

  

  


  


  render() {

    var result = null;

    var item1 = Object.keys(this.state.todo).map(id => {
      const todolist = this.state.todo[id];
      if(todolist !== null) {
      return (
        <div className ="header">
        <Card border ="dark" style={{ marginBottom : '10px',marginLeft : '550px', marginRight : '500px'}}>
          <CardContent style = {{textDecoration : todolist.checked ? "line-through" : null}}>
            <input type ="checkbox" onClick = {() => this.handleCheck(id)} />
            {todolist.todo}
            <Button onClick = {() => this.handleDelete(id)}><DeleteIcon /></Button>
            </CardContent>
        </Card>
        </div>
      )
    }
    else {
      return (
        <br/>
      )
    }
    })

      var item2 = Object.keys(this.state.todo).map(id => {
        const todolist = this.state.todo[id];
        if(todolist.checked === false) {
        return (
          <div className ="header">
          <Card border ="dark" style={{ marginBottom : '10px',marginLeft : '550px', marginRight : '500px'}}>
            <CardContent style = {{textDecoration : todolist.checked ? "line-through" : null}}>
              <input type ="checkbox" onClick = {() => this.handleCheck(id)} />
              {todolist.todo}
              <Button onClick = {() => this.handleDelete(id)}><DeleteIcon /></Button>
              </CardContent>
          </Card>
          </div>
        )
      }
      else {
        return (
          <br/>
        )
      }
      })

      var item3 = Object.keys(this.state.todo).map(id => {
        const todolist = this.state.todo[id];
        if(todolist.checked === true) {
        return (
          <div className ="header">
          <Card border ="dark" style={{ marginBottom : '10px',marginLeft : '550px', marginRight : '500px'}}>
            <CardContent style = {{textDecoration : todolist.checked ? "line-through" : null}}>
              <input type ="checkbox" onClick = {() => this.handleCheck(id)} />
              {todolist.todo}
              <Button onClick = {() => this.handleDelete(id)}><DeleteIcon /></Button>
              </CardContent>
          </Card>
          </div>
        )
      }
      else {
        return (
          <br/>
        )
      }
      })

      if(this.state.todostate === 1) {
        result = item1;
      }
      else if(this.state.todostate === 2) {
        result = item2;
      }
      else {
        result = item3;
      }
      

      return(
        <div>
          <header className ="art">
          <h2 className ="header">오늘 할 일</h2>
          <input type = "text" name = "Todaytodo" onChange = {this.handleChange} placeholder = "할 일을 추가하세요" />
          <Button variant = "contained" color = "primary" onClick = {this.handleSubmit}>할 일 추가</Button>
          </header>
          <p style={{ marginBottom : '10px',marginLeft : '600px'}}>
          <Button variant = "outlined" color = "primary" style = {{ marginRight : '80px'}} onClick = {this.handleTodo1}><HomeIcon /></Button>
          <Button variant = "outlined" color = "primary" style = {{ marginRight : '80px'}} onClick = {this.handleTodo2}>할 일</Button>
          <Button variant = "outlined" color = "primary" onClick = {this.handleTodo3}>완료</Button>
          </p>
          <br/>
          <article>
            {result}
          </article>
        </div>
      );
  }
}


export default withStyles(styles)(App8);