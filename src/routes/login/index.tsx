import React, { useState, useEffect } from 'react'
import { Form, Input, Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import { RouteChildrenProps } from 'react-router'
import formItemLayout from '../../utils/globalFormStyle'
import { getCaptcha, login } from '../../services/login'
import UserLayout from '../../components/usersLayout'

interface LoginProps {
    history: RouteChildrenProps['history']
}

const Login: React.FC<LoginProps> = props => {
    const [captchaUrl, setCaptchaUrl] = useState<string | null>(null)
    const [hashKey, setHashKey] = useState<string | null>(null)
    const [form] = Form.useForm()

    useEffect(() => {
        getCaptcha().then(({ data }) => {
            setCaptchaUrl(data.captchaUrl)
            setHashKey(data.hashKey)
        })
    }, [])

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
        <UserLayout>
            <Form
                form={form}
                labelAlign="right"
                colon={false}
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
            <Row gutter={[25, 0]}>
                <Col span={12}>
                    <Button type="primary" block onClick={handleLogin}>
                        登录
                    </Button>
                </Col>
                <Col span={12}>
                    <Button block>
                        <Link to="/sign-up">注册</Link>
                    </Button>
                </Col>
            </Row>
        </UserLayout>
    )
}

export default Login
