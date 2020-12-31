import React, { Component } from 'react';
import ListCard from './ListCard';
import ActionButton from './ActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteList } from '../actions';
import {connect} from 'react-redux';
import styled from 'styled-components';

const ListContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    margin-right: 7px;
    height: 100%;
`;

class List extends Component {

    render() {

    return(
        <Draggable draggableId={String(this.props.listID)} index={this.props.index}>
        {provided => (
            <ListContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <Droppable droppableId={String(this.props.listID)}>
                {provided => (
                    <div  {...provided.droppableProps} ref={provided.innerRef}>
                        <div style={styles.listHeadingContainer}>
                            <h4>{this.props.title}</h4>
                            <DeleteIcon onClick={() => this.props.dispatch(deleteList(this.props.listID))} style={styles.deleteIcon}></DeleteIcon>
                        </div>
                        {
                            this.props.cards.map((card, index) => (
                                <ListCard key={card.id} index={index} text={card.text} id={card.id}/>
                            ))
                        }
                        {provided.placeholder}
                        <ActionButton listID={this.props.listID}/>
                    </div>
                )}
                </Droppable>
            </ListContainer>
        )}
        </Draggable>
    );
    }
};

const styles = {
    listHeadingContainer: {
        display: "flex", 
        alignItems: "center",
        justifyContent: "space-between" 
    },
    deleteIcon: {
        cursor: "pointer"
    }
}

export default connect()(List);