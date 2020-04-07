import Dialog, { DialogFooter, DialogButton, DialogContent, FadeAnimation } from 'react-native-popup-dialog';
import {Text, View, StyleSheet} from "react-native";
import React from "react";

class Alert extends React.Component{
    constructor(props){
        super(props);
    }
    /**
     * render the alert box
     * @returns alert component
     * @author KhanhPhung
     */
    render(){
        return(
            <Dialog
                width={0.8}
                dialogStyle={styles.container}
                visible={this.props.visible}
                dialogAnimation={new FadeAnimation({
                    initialValue: 0, // optional
                    animationDuration: 300, // optional
                    useNativeDriver: true, // optional
                  })}
                footer={
                <DialogFooter style={styles.footerDialog}>
                    <DialogButton
                    text="Dismiss"
                    style = {styles.buttonDialog}
                    textStyle={styles.buttonTextDialog}
                    onPress={() => {this.props.dismiss()}}
                    />
                </DialogFooter>
                }
            >
                <DialogContent style={styles.dialogContent}>
                    <Text style={styles.text}>{this.props.question}</Text>
                </DialogContent>
            </Dialog>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#333333"
    },
    text: {
        paddingHorizontal: 10,
        fontFamily: 'opensans',
        fontSize: 18,
        fontWeight: "300",
        color: "red"
    },
    dialogContent: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    buttonTextDialog: {
        color: "#fefefe",
        marginTop: -8
    },
    footerDialog: {
        borderTopWidth: 0.5
    },
    buttonDialog: {
        justifyContent: "center",
    }
})
export default Alert;