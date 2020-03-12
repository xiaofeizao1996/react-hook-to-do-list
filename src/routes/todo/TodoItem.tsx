import React, { useState } from 'react'
import { Button } from 'antd'
import EditMessageModal from './EditMessageModel'
import { todoItem } from './type'

interface TodoItemProps {
    data: Array<todoItem> | null
    addMessage: React.Dispatch<React.SetStateAction<todoItem[] | null>>
}

const TodoItem: React.FC<TodoItemProps> = ({ data, addMessage }) => {
    const [visible, changeVisible] = useState<boolean>(false)
    const [messageId, changeMessageId] = useState<number | null>(null)

    const handleEditMessage = (id: number) => () => {
        changeMessageId(id)
        changeVisible(true)
    }

    const handleDeleteMessage = (id: number) => () => {
        const messageListAfterDelete = data && data.filter(item => item.id !== id)
        localStorage.setItem('messageList', JSON.stringify(messageListAfterDelete))
        addMessage(messageListAfterDelete)
    }

    return (
        <div className="message-list">
            {data && (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>
                            <span className="message">{item.message}</span>
                            <span>
                                <Button type="link" onClick={handleEditMessage(item.id)}>
                                    编辑
                                </Button>
                                <Button type="link" onClick={handleDeleteMessage(item.id)}>
                                    删除
                                </Button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            {visible && (
                <EditMessageModal
                    visible={visible}
                    changeVisible={changeVisible}
                    messageId={messageId}
                    messageList={data}
                />
            )}
        </div>
    )
}

export default TodoItem
