import React from "react"
import { Modal, Form, Input } from "antd"
import formItemLayout from "./utils/globalFormStyle"

const { TextArea } = Input

function EditMessageModel(props) {
    const { messageList, messageId, visible, changeVisible } = props
    const [form] = Form.useForm()
    const message = messageList.filter(item => item.id === messageId)

    const handleSubmit = () => {
        // eslint-disable-next-line no-console
        form.validateFields().then(values => console.log(values))
    }

    return (
        <Modal
            title="编辑信息"
            centered
            visible={visible}
            onCancel={() => changeVisible(false)}
            destroyOnClose
            cancelText="取消"
            okText="保存"
            onOk={handleSubmit}
        >
            <Form
                form={form}
                initialValues={message && message[0]}
                labelAlign="right"
                labelCol={formItemLayout.labelCol}
                wrapperCol={formItemLayout.wrapperCol}
            >
                <Form.Item label="创建时间" name="time">
                    <Input style={{ width: "100%" }} disabled />
                </Form.Item>
                <Form.Item label="信息" name="message">
                    <TextArea style={{ width: "100%" }} autoSize={{ minRows: 4, maxRows: 4 }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditMessageModel
