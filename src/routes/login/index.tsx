import React, { useState, useEffect } from 'react'
import { Form, Input, Row, Col, Button } from 'antd'
import { RouteChildrenProps } from 'react-router'
import logo from '../../assets/logo.jpg'
import formItemLayout from '../../utils/globalFormStyle'
import './index.less'
import { getCaptcha, login } from '../../services/login'

interface LoginProps {
    history: RouteChildrenProps['history']
}

const Login: React.FC<LoginProps> = props => {
    const [captchaUrl, setCaptchaUrl] = useState<string | null>(null)
    const [hashKey, setHashKey] = useState<string | null>(null)
    useEffect(() => {
        getCaptcha().then(({ data }) => {
            setCaptchaUrl(data.captchaUrl)
            setHashKey(data.hashKey)
        })
    }, [])

    const [form] = Form.useForm()
    const handleLogin = () => {
        form.validateFields().then(values => {
            const { username, password, captcha } = values
            login({ username, password, captcha, hashKey: hashKey || '' }).then(res => {
                const {
                    data: { token },
                } = res
                if (token) {
                    localStorage.setItem('token', token)
                    props.history.push('/todo')
                }
            })
        })
    }
    // eslint-disable-next-line no-nested-ternary
    const imgSrc = captchaUrl ? (IS_PROXY ? `/api${captchaUrl}` : `${captchaUrl}`) : ''

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
                                <div style={{ paddingLeft: 20 }}>
                                    <img height={32} src={imgSrc} alt="captcha" />
                                </div>
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
