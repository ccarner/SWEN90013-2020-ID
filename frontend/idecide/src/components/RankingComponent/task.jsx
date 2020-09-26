import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import "./DraggableList.css";
const Container = styled.div`
  margin-buttom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2em;
  padding: 8px;
  font-size: 1rem;
  text-align: center;
  font-weight: 400;
  color: #fff;
  background: #be3eed;
  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12); // <Thing> when hovered
    color: rgb(74, 74, 74);
  }

  &:nth-child(2) {
    background: #cb64f1;
  }
  &:nth-child(3) {
    background: #c282d6;
  }
  &:nth-child(4) {
    background: #e5b2f7;
  }
  &:nth-child(5) {
    background: #f2d8fd;
  }
`;

class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
