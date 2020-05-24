import React, { Component } from "react";
import ReactDOM from "react-dom";
import "reset-css";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./Column";

const Container = styled.div`
  display: flex;
`;

class App extends Component {
  state = initialData;

  //actulize the state of the draggable components
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newRecipeIds = Array.from(start.recipeIds);
      newRecipeIds.splice(source.index, 1);
      newRecipeIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        recipeIds: newRecipeIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    //Moving from one list to another
    const startRecipeIds = Array.from(start.recipeIds);
    startRecipeIds.splice(source.index, 1);
    const newStart = {
      ...start,
      recipeIds: startRecipeIds,
    };

    const finishRecipeIds = Array.from(finish.recipeIds);
    finishRecipeIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      recipeIds: finishRecipeIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const recipes = column.recipeIds.map(
              (recipeById) => this.state.recipes[recipeById]
            );

            return <Column key={column.id} column={column} recipes={recipes} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
export default App;
