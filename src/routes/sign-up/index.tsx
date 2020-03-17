import React from 'react'
import { Form, Input, Button } from 'antd'
import UserLayout from '../../components/usersLayout'
import formItemLayout from '../../utils/globalFormStyle'

function Register() {
    const [form] = Form.useForm()
    const handleSignUp = () => {
        console.log('sign up')
    }
    return (
        <UserLayout>
            <Form
                form={form}
                labelAlign="right"
                colon={false}
                hideRequiredMark
                labelCol={formItemLayout.labelCol}
                wrapperCol={formItemLayout.wrapperCol}
            >
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password">
                    <Input.Password />
                </Form.Item>
                <Form.Item label="重复密码" name="passwordAgain">
                    <Input.Password />
                </Form.Item>
            </Form>
            <Button type="primary" block onClick={handleSignUp}>
                注册
            </Button>
        </UserLayout>
    )
}

export default Register
