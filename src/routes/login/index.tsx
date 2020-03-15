import React from 'react'
import { Form, Input, Row, Col, Button } from 'antd'
import logo from '../../assets/logo.jpg'
import formItemLayout from '../../utils/globalFormStyle'
import './index.less'

import request from '../../utils/request'

request('/api/captcha')

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const [form] = Form.useForm()
    const handleLogin = () => {
        // eslint-disable-next-line no-console
        form.validateFields().then(data => console.log(data))
    }
    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-logo">
                    <img className="login-logo-img" src={logo} alt="logo" width="48" />
                </div>
                <Form
                    form={form}
                    labelAlign="right"
                    hideRequiredMark
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="captcha"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row>
                            <Col span={18}>
                                <Input />
                            </Col>
                            <Col span={6}>
                                <img src="" alt="captcha" />
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
                <Button type="primary" block onClick={handleLogin}>
                    登录
                </Button>
            </div>
        </div>
    )
}

export default Login
