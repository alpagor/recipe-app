import React from "react";
import styled from "styled-components"; //importar antes!!!
import { Droppable } from "react-beautiful-dnd";
import Recipe from "./Recipe";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const RecipesList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 108px;
`;

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.recipes === this.props.recipes) {
      return false;
    }
    return true;
  }

  render() {
    return this.props.recipes.map((recipe, index) => (
      <Recipe key={recipe.id} recipe={recipe} index={index} />
    ));
  }
}

class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id} index={this.props.index}>
          {(provided, snapshot) => (
            <RecipesList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <InnerList recipes={this.props.recipes} />
              {provided.placeholder}
            </RecipesList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default Column;
