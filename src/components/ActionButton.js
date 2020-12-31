import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextArea from 'react-textarea-autosize';
import { connect } from 'react-redux';
import {addList, addCard} from '../actions';

class ActionButton extends Component {

    state = {
        formOpen: false,
        text: ""
    }

    openForm = () => {
        this.setState({
            formOpen: true
        })
    }

    closeForm = () => {
        this.setState({
            formOpen: false
        })
    }

    renderAddButton = () => {
        const {list} = this.props;

        const buttonText = list ? "Add another list" : "Add another card";
        const buttonOpacity = list ? 1 : 0.5;
        const buttonColor = list ? "white" : "inherit";
        const buttonBackground = list ? "rgba(0, 0, 0, .15)" : "inherit";

        return (
            <div 
                onClick = {this.openForm}
                style={{
                    ...styles.actionButtonContainer,
                    opacity: buttonOpacity, 
                    color: buttonColor, 
                    backgroundColor: buttonBackground
            }}>
                <AddIcon/>
                <p>{buttonText}</p>
            </div>
        );
    };

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if(text){
            this.setState({
                text: ""
            })
            dispatch(addList(text))
        }

        return;
    }

    handleAddCard = () => {
        const { dispatch, listID } = this.props;
        const { text } = this.state;

        if(text){
            this.setState({
                text: ""
            })
            dispatch(addCard(listID, text))
        }

        return;
    }

    renderForm = () => {

        const {list} = this.props;

        const placeholder = list ? "Enter list title..." : "Enter a title for the card...";
        const buttonTitle = list ? "Add List" : "Add Card";

        return (
            <div>
                <Card style={{overflow: "visible", minHeight: 80, minWidth: 272, padding: "6px 8px 2px"}}>
                    <TextArea 
                        placeholder={placeholder} 
                        autoFocus 
                        onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={(e) => this.setState({ text: e.target.value })}
                        style={{
                            resize: "none",
                            width: "100%",
                            overflow: "hidden",
                            outline: "none",
                            border: "none"
                        }}
                    />
                </Card>
                <div style={styles.buttonGroup}>
                    <Button
                        onMouseDown={ list ? this.handleAddList : this.handleAddCard}
                        variant="contained"
                        style={{color: "white", backgroundColor: "#5aae44"}}
                    >
                        {buttonTitle}
                    </Button>
                    <CloseIcon style={{marginLeft: 10, cursor: "pointer"}}/>
                </div>
            </div>
        );
    };


    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

const styles = {
    actionButtonContainer: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    buttonGroup: {
        display: "flex",
        alignItems: "center",
        marginTop: 7
    }
}

export default connect()(ActionButton);