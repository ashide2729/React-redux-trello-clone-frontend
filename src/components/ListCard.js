import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { deleteCard } from '../actions';
import DeleteIcon from '@material-ui/icons/Delete';

const CardContainer = styled.div`
      margin-bottom: 7px;
`;

class ListCard extends Component {

    render() {

    return(
        <Draggable draggableId={String(this.props.id)} index={this.props.index}>
        {provided => (
            <CardContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <Card style={styles.cardContainer}>
                    <DeleteIcon
                    onClick={() => this.props.dispatch(deleteCard(this.props.id))} style={styles.deleteIcon}></DeleteIcon>
                    <CardContent>
                        <Typography gutterBottom>{this.props.text}</Typography>
                    </CardContent>
                </Card>
            </CardContainer>
        )}
        </Draggable>
    );
    }
};

const styles = {
    cardContainer: {
        position: "relative"
    },
    deleteIcon: {
        cursor: "pointer",
        position: "absolute",
        right: 0
    }
}

export default connect()(ListCard);