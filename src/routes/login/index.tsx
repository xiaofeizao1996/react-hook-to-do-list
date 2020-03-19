import React, { useEffect } from 'react'
import { Form, Input, Row, Col, Button, Alert } from 'antd'
import { Link } from 'react-router-dom'
import formItemLayout from 'utils/globalFormStyle'
import UserLayout from 'components/usersLayout'
import { connect } from 'react-redux'
import { LOGIN, GET_CAPTCHA } from 'store/login'
import { AppState, AppDispatch } from 'store/index'

const Login: React.FC<LoginProps> = props => {
    const { dispatch, captchaUrl, hashKey, error } = props
    const [form] = Form.useForm()
    const getCaptcha = () =>
        dispatch({
            type: GET_CAPTCHA,
        })

    useEffect(() => {
        getCaptcha()
    }, [])

    const handleLogin = () => {
        form.validateFields().then(values => {
            const { username, password, captcha } = values
            dispatch({
                type: LOGIN,
                payload: {
                    username,
                    password,
                    captcha,
                    hashKey,
                },
            })
        })
    }

    return (
        <UserLayout>
            {error ? <Alert message={error} type="error" style={{ marginBottom: 10 }} /> : null}
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
                    <Row gutter={[20, 0]}>
                        <Col span={18}>
                            <Input maxLength={4} />
                        </Col>
                        <Col span={6} onClick={getCaptcha}>
                            <img height={32} src={captchaUrl || ''} alt="captcha" />
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

const mapStateToProps = ({ login }: AppState) => ({
    hashKey: login.hashKey,
    captchaUrl: login.captchaUrl,
    error: login.error,
})

interface LoginProps extends ReturnType<typeof mapStateToProps> {
    dispatch: AppDispatch
}

export default connect(mapStateToProps)(Login)
