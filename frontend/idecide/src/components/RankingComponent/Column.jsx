import React, { Component } from "react";

import styled from "styled-components";
import Task from "./task";
import { Droppable } from "react-beautiful-dnd";
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

class Column extends Component {
  render() {
    return (
      <Container>
        <Droppable
          droppableId={this.props.column.id}
          styled={{ position: "static" }}
        >
          {(provided) => (
            <TaskList
              innerRef={provided.innerRef}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default Column;
