import React, { useState, useEffect } from "react"
import { Input, Button, message as info } from "antd"
import moment from "moment"
import EditMessageModal from "./EditMessageModel"
import "./app.less"

const uuid = () => new Date().getTime()

export default function App() {
    const [message, changeMessage] = useState(null)
    const [messageList, addMessage] = useState([])
    const [visible, changeVisible] = useState(false)
    const [messageId, changeMessageId] = useState(null)

    useEffect(() => {
        const result = JSON.parse(localStorage.getItem("messageList")) || []
        addMessage(result)
    }, [])

    const handleMessageSubmit = () => {
        if (message) {
            messageList.unshift({
                message,
                id: uuid(),
                time: moment().format("YYYY-MM-DD HH:mm:ss"),
            })
            addMessage(messageList)
            localStorage.setItem("messageList", JSON.stringify(messageList))
            changeMessage(null)
        } else {
            info.error("请输入待办事项")
        }
    }

    const handleEditMessage = event => {
        const id = Number(event.target.value)
        changeMessageId(id)
        changeVisible(true)
    }

    const handleDeleteMessage = event => {
        const id = Number(event.target.value)
        const messageListAfterDelete = messageList.filter(item => item.id !== id)
        localStorage.setItem("messageList", JSON.stringify(messageListAfterDelete))
        addMessage(messageListAfterDelete)
    }

    return (
        <div className="container">
            <header className="header">Todo List</header>
            <div className="content">
                <div className="input">
                    <Input
                        placeholder="请输入待办事项"
                        value={message}
                        onChange={event => changeMessage(event.target.value)}
                        onPressEnter={handleMessageSubmit}
                    />
                    <Button style={{ marginLeft: 20 }} onClick={handleMessageSubmit}>
                        提交
                    </Button>
                </div>
                <div className="message-list">
                    {messageList.length >= 1 && (
                        <ul>
                            {messageList.map(item => (
                                <li key={item.id}>
                                    <span className="message">{item.message}</span>
                                    <span>
                                        <Button
                                            type="link"
                                            value={item.id}
                                            onClick={handleEditMessage}
                                        >
                                            编辑
                                        </Button>
                                        <Button
                                            type="link"
                                            value={item.id}
                                            onClick={handleDeleteMessage}
                                        >
                                            删除
                                        </Button>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {visible && (
                <EditMessageModal
                    visible={visible}
                    changeVisible={changeVisible}
                    messageId={messageId}
                    messageList={messageList}
                />
            )}
        </div>
    )
}
