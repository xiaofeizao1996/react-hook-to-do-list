import React, { useState } from 'react'
import { Form, Input, Button, Alert, Modal } from 'antd'
import { RouteChildrenProps } from 'react-router'
import UserLayout from '../../components/usersLayout'
import formItemLayout from '../../utils/globalFormStyle'
import { signUp } from '../../services/login'

const { confirm } = Modal

interface RegisterProps {
    history: RouteChildrenProps['history']
}

const Register: React.FC<RegisterProps> = props => {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [form] = Form.useForm()
    const handleSignUp = () => {
        form.validateFields().then(values => {
            const { username, password, passwordAgain } = values
            if (password !== passwordAgain) {
                setErrorMessage('两次密码不一致，请重新输入。')
                return
            }
            signUp({ username, password, passwordAgain })
                .then(res => {
                    const { status } = res
                    if (status === 204) {
                        const { history } = props
                        confirm({
                            content: '注册成功！',
                            okCancel: false,
                            centered: true,
                            onOk: () => {
                                history.push('/todo')
                                Modal.destroyAll()
                            },
                        })
                    }
                })
                .catch(err => {
                    const {
                        data: { error },
                    } = err
                    setErrorMessage(error)
                })
        })
    }
    return (
        <UserLayout>
            {errorMessage ? (
                <Alert message={errorMessage} type="error" style={{ marginBottom: 10 }} />
            ) : null}
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
