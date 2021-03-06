
import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from 'socket.io-client';

const ENDPOINT =
    window.location.host.indexOf('localhost') >= 0
        ? 'http://127.0.0.1:5000'
        : window.location.host;

export default function ChatBox(props) {
    const { userInfo } = props;
    const [socket, setSocket] = useState(null);
    const uiMessagesRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [messageBody, setMessageBody] = useState('');
    const [messages, setMessages] = useState([
        { name: 'Admin', body: 'Hello there, Please ask your question.' },
    ]);

    useEffect(() => {
        if (uiMessagesRef.current) {
            uiMessagesRef.current.scrollBy({
                top: uiMessagesRef.current.clientHeight,
                left: 0,
                behavior: 'smooth',

            });
        }
        if (socket) {
            socket.emit('onLogin', {
                _id: userInfo._id,
                name: userInfo.name,
                isAdmin: userInfo.isAdmin,
            });
            socket.on('message', (data) => {
                setMessages([...messages, { body: data.body, name: data.name }]);
            });
        }
    }, [messages, isOpen, socket]);

    const supportHandler = () => {
        setIsOpen(true);
        const sk = socketIOClient(ENDPOINT);
        setSocket(sk);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!messageBody.trim()) {
            alert('Error. Please type message.');
        } else {
            setMessages([...messages, { body: messageBody, name: userInfo.name }]);
            setMessageBody('');
            setTimeout(() => {
                socket.emit('onMessage', {
                    body: messageBody,
                    name: userInfo.name,
                    isAdmin: userInfo.isAdmin,
                    _id: userInfo._id,
                });
            }, 1000);
        }
    };

    const closeHandler = () => {
        setIsOpen(false);
    };

    return (
        <div className="chatbox small-container">
            {!isOpen ? (
                <button type="button"  className="border-0 bg-transparent" onClick={supportHandler}>
                    <img src="https://i.postimg.cc/yN0S58sQ/Grsssssssoup.png"></img>
                    <i className="fa fa-support" />
                </button>
            ) : (
                <div className="card card-body">
                    <div className="row small">
                        <h4 class="text-center">Shoplive's Support</h4>
                        <p class="text-center">
                            You are now in chat with the admin
                        </p>
                        {/* <button class="btn btn-secondary"onClick={closeHandler}>Close */}
                            {/* <i className="fa fa-close" />
                        </button> */}
                    </div>
                    <ul ref={uiMessagesRef}>
                        {messages.map((msg, index) => (
                            <li key={index}>
                                <strong>{`${msg.name}: `}</strong> {msg.body}
                            </li>
                        ))}
                    </ul>
                    <div>
                        <form onSubmit={submitHandler} className="row">
                            <input
                                value={messageBody}
                                onChange={(e) => setMessageBody(e.target.value)}
                                type="text"
                                placeholder="Type message..."
                            />
                            <button className="submit" type="submit" class="btn btn-outline-primary btn-sm">Send</button>
                        </form>
                    </div>
                        <p></p>
                    <div className="row small">
                        <button class="btn btn-secondary"onClick={closeHandler}>Close
                            <i className="fa fa-close" />
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}
