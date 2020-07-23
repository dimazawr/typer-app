import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import Message from './Message';


    class MessagesList extends Component {
        constructor(props) {
            super(props)
            this.listRef = createRef();
        }

        getSnapshotBeforeUpdate(prevProps, prevState) {
            if (prevProps.messages.length < this.props.messages.length) {
                const list = this.listRef.current;
                return list.scrollHeight - list.scrollTop;
              }
              return null;
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (snapshot !== null) {
                const list = this.listRef.current;
                list.scrollTop = list.scrollHeight - snapshot;
              }          
        }

        render(){
            return (
                <div ref={this.listRef} className="d-inline-flex flex-column w-100 chat-messages">
                    {this.props.messages.map(msg => {
                    const {username, text, id, msgId, time} = msg;
                            return  <Message username={username} 
                             text={text} 
                             key={msgId} 
                             time={time} 
                             isOwner={id === this.props.userId ? true : false} />
                })}
                </div>
            )
        }
        
    }

    const mapStateToProps = state => (
        {
            messages: state.messages,
            userId: state.socketId
        })
 
export default connect(mapStateToProps,null)(MessagesList);