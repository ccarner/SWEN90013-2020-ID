import React, { Component } from "react";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import "./DraggableList.css";

import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
class DragableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: {},
      columns: {
        "column-1": {
          id: "column-1",
          title: "",
          taskIds: [],
        },
      },
      columnOrder: ["column-1"],
    };
  }

  componentDidMount() {
    this.loadRankList();
  }

  loadRankList = () => {
    var question = this.props.section.questions[0];

    var newtasks = {};
    var newcolumns = {
      "column-1": {
        id: "column-1",
        title: question.questionText,
        taskIds: [],
      },
    };

    question.selectionOptions.map((item) => {
      newtasks[item] = { id: item, content: item };
      newcolumns["column-1"].taskIds.push(item);
    });
    this.setState({
      tasks: newtasks,
      columns: newcolumns,
    });
  };

  handleResult = (item, result) => {
    //here will handle the result !

    this.props.handleAnswer(item.questionId, result);

  };

  onDragEnd = (result) => {
    //todo
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
      <div
        style={{
          width: "30%",
          margin: "auto",
          display: "flex",
          position: "relative",
          flexDirection: "column",
        }}
      >
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => this.state.tasks[taskId]
            );

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </DragDropContext>
        <div className="button-container">
          <PrimaryButton
            onClick={() =>
              this.handleResult(
                this.props.section.questions[0],
                this.state.columns["column-1"].taskIds
              )
            }
          >
            CONFIRM
          </PrimaryButton>
        </div>
      </div>
    );
  }
}

export default DragableList;
