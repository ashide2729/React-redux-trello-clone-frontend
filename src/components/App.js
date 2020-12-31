import React, { Component } from 'react';
import List from './List';
import {connect} from 'react-redux';
import ActionButton from './ActionButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort } from '../actions';
import styled from 'styled-components';

const ListsContainer = styled.div`
      display: flex;
      marginLeft: 7px;
`;

class App extends Component {

  onDragEnd = result => {

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))

  }

  render() {

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <h2 style={styles.headContainer}>Hello</h2>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListsContainer {...provided.droppableProps} ref={provided.innerRef}>
              {
                this.props.lists.map((list, index) => (
                  <List key={list.id} listID={list.id} title={list.title} cards={list.cards} index={index}/>
                ))
              }
              <ActionButton list/>
            </ListsContainer>
          )}
          </Droppable>
        </div>
      </DragDropContext>
    ); 
    
  }
}

const styles = {
  headContainer: {
    marginLeft: 7
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
