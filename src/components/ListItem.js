import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TouchableWithoutFeedback,
    LayoutAnimation,
    UIManager,
    Platform
 } from 'react-native';
import { connect } from 'react-redux'
import { CardSection } from './common'
import * as actions from '../actions'

const style = {
    titlestyle:{
        fontSize: 22,
        paddingLeft: 15,
        fontWeight: 'bold',
        color: 'green'
    }
}

class ListItem extends Component {
    
    componentWillUpdate () {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental (true)
        }
        LayoutAnimation.spring ();
    }

    renderDescription () {
        const { expanded, library } = this.props

        if (expanded ) {
            return (
                <CardSection>
                    <Text style={{ flex: 1, paddingLeft: 15, color: '#000', fontSize: 18 }}>
                        {library.description}
                    </Text>
                </CardSection>
            )
        }
    }


    render (){
        const {id, title} = this.props.library

        return (
            <TouchableWithoutFeedback
                onPress = {() => this.props.selectLibrary (id)}
            >
                <View>
                    <CardSection>
                        <Text style={style.titlestyle}>{title}</Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        )
    
    }
}

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id
    
    return { expanded }
}

export default connect (mapStateToProps, actions) (ListItem);