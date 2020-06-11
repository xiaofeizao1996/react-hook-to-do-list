import React, { useState } from 'react'
import { Input, Button, message as info } from 'antd'
import moment from 'moment'
import TodoItem from './TodoItem'
import './index.less'
import { todoItem } from './type'

const uuid = () => new Date().getTime()

export default function Todo() {
    const [message, changeMessage] = useState<string | undefined>(undefined)
    const [messageList, addMessage] = useState<Array<todoItem> | null>(null)
    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const currentMessage = event.target.value
        changeMessage(currentMessage)
    }

    const handleMessageSubmit = () => {
        if (message) {
            addMessage([
                {
                    message,
                    id: uuid(),
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
            ] as Array<todoItem>)
            localStorage.setItem('messageList', JSON.stringify(messageList))
            changeMessage(undefined)
        } else {
            info.error('请输入待办事项')
        }
    }

    return (
        <div className="container">
            <header className="header">Todo List</header>
            <div className="content">
                <div className="input">
                    <Input
                        placeholder="请输入待办事项"
                        value={message}
                        onChange={handleMessageChange}
                        onPressEnter={handleMessageSubmit}
                        />
                    <Button style={{ marginLeft: 20 }} onClick={handleMessageSubmit}>
                        提交
                    </Button>
                </div>
                <TodoItem data={messageList} addMessage={addMessage} />
            </div>
        </div>
    )
}
