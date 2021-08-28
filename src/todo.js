import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import backimage from "./Images/image2.jpg";

let todoTasks = [];

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newtodo: "" };
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  state = {
  };

  handleChangeInput(event) {
    this.setState({ newtodo: event.target.value });
  }

  addNewTodo = (props) => {
    if (this.state.newtodo !== "") {
      todoTasks.push({
        text: this.state.newtodo,
        completed: false,
        icon: <DeleteIcon />,
      });

      this.setState({
        todoTasks,
        newtodo: "",
      });
      <form action="http://localhost:3001/todos/:userId" method="POST">
        <input type = "text"/><br/>
      </form>
    } else {
      this.setState({
        newtodo: "Поле пустое",
      });
    }
  };

  componentDidMount = async () => {
    const { useridin } = this.props;

    //const url = "https://jsonplaceholder.typicode.com/todos?userId=" + useridin;
    const url = "http://localhost:3001/todos/"+useridin;
  
  
    const todosfrom = await fetch(url);
    let todosAll = await todosfrom.json();
 
    this.setState({
      todosAll,
    });
    this.buildTodo();
  };

  buildTodo = (state) => {
    for (let i = 0; i < this.state.todosAll.length; i++) {
      todoTasks.push({
        text: this.state.todosAll[i].title,
        completed: this.state.todosAll[i].completed,
        icon: <DeleteIcon />,
      });
    }
    this.setState({
      todoTasks,
    });
  };

  clearTodo = (state) => {
    todoTasks = [];
    this.setState({
      todoTasks,
    });
  };

  changeCompleted = (index, state) => {
    todoTasks[index].completed = !todoTasks[index].completed;
    this.setState({
      todoTasks,
    });
  };

  deleteTodo = (index) => {
    todoTasks.splice(index, 1);
    this.setState({
      todoTasks,
    });
  };

  render() {
    const buttonArray = [
      {
        text: "Add",
        icon: "",
        onClick: this.addNewTodo,
      },
      {
        text: "Clear",
        icon: "",
        onClick: this.clearTodo,
      },
      {
        text: "Exit",
        icon: "",
        onClick: this.returnPagefun,
      },
    ];
    var sectionStyle = {
      width: "100%",
      height: "2400px",
      backgroundSize: "cover",
      backgroundImage: `url(${backimage})`,
    };
    return (
      <>
        <section style={sectionStyle}>
          <div className="maintodo">
            <div>
              <h1>TODO</h1>
            </div>
            <input
              type="text"
              value={this.state.newtodo}
              onChange={this.handleChangeInput}
              className="input"
            ></input>
            <div>
              {buttonArray.map((button) => (
                <button className="button" onClick={button.onClick}>
                  {button.text}
                </button>
              ))}
            </div>
            <List className="widget">
              {todoTasks.map((todoTasks, index) => (
                <ListItem>
                  
                  <ListItemText>{todoTasks.text}</ListItemText>
                  <ListItemIcon>
                    {this.state.todoTasks[index].completed ? (
                      <CheckIcon 
                      classname="widget li"
                      onClick={() =>  this.changeCompleted(index)}
                      ></CheckIcon>
                    ) 
                    : 
                    (
                      <CancelIcon 
                      classname="widget li"
                      onClick={() =>  this.changeCompleted(index)}
                      ></CancelIcon>
                    )}
                  </ListItemIcon>
                  <IconButton
                    onClick={() => {
                      this.deleteTodo(index);
                    }}
                  >
                    {todoTasks.icon}
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </div>
        </section>
      </>
    );
  }
}
