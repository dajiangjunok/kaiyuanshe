'use client'
import React, { useState } from 'react'
import { Form, Input, Button, App as AntdApp } from 'antd'
import { signIn } from 'next-auth/react'
import styles from './index.module.css'
import { useRouter } from 'next/router'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { registerUser } from '../api/login'
import { sendVerificationCode, verifyCode } from '../api/verification'
import GitHubLoginButton from '@/components/GitHubLoginButton'

type LoginFieldType = {
  email?: string
  password?: string
}

type RegisterFieldType = {
  email?: string
  password?: string
  confirmPassword?: string
  username?: string
  verificationCode?: string
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [registerStep, setRegisterStep] = useState<
    'email' | 'verification' | 'password'
  >('email')
  const [countdown, setCountdown] = useState(0)
  const [verificationToken, setVerificationToken] = useState<string>('')
  const [tempEmail, setTempEmail] = useState<string>('')
  const router = useRouter()
  const { set, get } = useLocalStorage('user')
  const { message } = AntdApp.useApp()
  const initialValues = {
    email: (get() as { email?: string } | null)?.email
  }

  const onLoginFinish = async (values: LoginFieldType) => {
    try {
      const { email, password } = values
      setLoading(true)

      const res = await signIn('email-login', {
        redirect: false,
        email,
        password
      })

      if (res?.ok) {
        set({
          email: email
        })
        router.push('/')
      } else {
        message.warning('登录失败...')
      }
    } catch {
      message.error('网络错误...')
    } finally {
      setLoading(false)
    }
  }

  // 发送验证码
  const handleSendCode = async (email: string) => {
    try {
      setLoading(true)
      const res = await sendVerificationCode({
        email,
        type: 'register'
      })

      if (res.success) {
        message.success('验证码已发送到您的邮箱')
        setTempEmail(email)
        setRegisterStep('verification')
        setCountdown(60)

        // 倒计时
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        message.error(res.message || '发送验证码失败')
      }
    } catch {
      message.error('网络错误...')
    } finally {
      setLoading(false)
    }
  }

  // 验证验证码
  const handleVerifyCode = async (code: string) => {
    try {
      setLoading(true)
      const res = await verifyCode({
        email: tempEmail,
        code,
        type: 'register'
      })

      if (res.success && res.data?.token) {
        message.success('验证成功')
        setVerificationToken(res.data.token)
        setRegisterStep('password')
      } else {
        message.error(res.message || '验证码错误')
      }
    } catch {
      message.error('网络错误...')
    } finally {
      setLoading(false)
    }
  }

  const onRegisterFinish = async (values: RegisterFieldType) => {
    try {
      if (registerStep === 'email') {
        const { email } = values
        if (!email) {
          message.error('请输入邮箱')
          return
        }
        await handleSendCode(email)
        return
      }

      if (registerStep === 'verification') {
        const { verificationCode } = values
        if (!verificationCode) {
          message.error('请输入验证码')
          return
        }
        await handleVerifyCode(verificationCode)
        return
      }

      // 最终注册步骤
      const { password, username } = values
      if (!password || !username) {
        message.error('请填写完整信息')
        return
      }

      setLoading(true)

      const res = await registerUser({
        email: tempEmail,
        password,
        username,
        verificationToken
      })

      if (res.success) {
        message.success('注册成功！请登录')
        setIsRegister(false)
        setRegisterStep('email')
        setVerificationToken('')
        setTempEmail('')
      } else {
        message.error(res.message || '注册失败')
      }
    } catch {
      message.error('网络错误...')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <h2 className={styles.title}>{isRegister ? '欢迎注册' : '欢迎登录'}</h2>

        {isRegister ? (
          <Form layout="vertical" onFinish={onRegisterFinish}>
            {registerStep === 'email' && (
              <>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                  ]}
                >
                  <Input placeholder="邮箱" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.loginButton}
                    block
                    loading={loading}
                  >
                    发送验证码
                  </Button>
                </Form.Item>
              </>
            )}

            {registerStep === 'verification' && (
              <>
                <div className={styles.verificationInfo}>
                  验证码已发送至 {tempEmail}
                </div>

                <Form.Item
                  name="verificationCode"
                  rules={[
                    { required: true, message: '请输入验证码' },
                    { len: 6, message: '验证码为6位数字' }
                  ]}
                >
                  <Input
                    placeholder="请输入6位验证码"
                    maxLength={6}
                    className={styles.verificationInput}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.loginButton}
                    block
                    loading={loading}
                  >
                    验证
                  </Button>
                </Form.Item>

                <div className={styles.resendSection}>
                  {countdown > 0 ? (
                    <span className={styles.countdownText}>
                      {countdown}s 后可重新发送
                    </span>
                  ) : (
                    <a
                      onClick={() => handleSendCode(tempEmail)}
                      className={styles.resendLink}
                    >
                      重新发送验证码
                    </a>
                  )}
                </div>

                <div className={styles.resendSection}>
                  <a
                    onClick={() => {
                      setRegisterStep('email')
                      setTempEmail('')
                      setCountdown(0)
                    }}
                    className={styles.backLink}
                  >
                    ← 返回上一步
                  </a>
                </div>
              </>
            )}

            {registerStep === 'password' && (
              <>
                <div className={styles.verificationInfo}>
                  邮箱验证成功：{tempEmail}
                </div>

                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: '请输入用户名' },
                    { min: 2, message: '用户名至少2个字符' },
                    { max: 20, message: '用户名最多20个字符' }
                  ]}
                >
                  <Input placeholder="用户名" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: '请输入密码' },
                    { min: 6, message: '密码至少6位' }
                  ]}
                >
                  <Input.Password placeholder="密码" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: '请确认密码' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('两次输入的密码不一致'))
                      }
                    })
                  ]}
                >
                  <Input.Password placeholder="确认密码" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.loginButton}
                    block
                    loading={loading}
                  >
                    完成注册
                  </Button>
                </Form.Item>

                <div className={styles.resendSection}>
                  <a
                    onClick={() => {
                      setRegisterStep('email')
                      setTempEmail('')
                      setVerificationToken('')
                      setCountdown(0)
                    }}
                    className={styles.backLink}
                  >
                    ← 重新开始
                  </a>
                </div>
              </>
            )}

            {registerStep === 'email' && (
              <>
                <div className={styles.divider}>
                  <div className={styles.dividerLine} />
                  <span className={styles.dividerText}>或</span>
                </div>

                <GitHubLoginButton loading={loading} onLoading={setLoading} />
              </>
            )}
          </Form>
        ) : (
          <Form
            initialValues={initialValues}
            layout="vertical"
            onFinish={onLoginFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="邮箱" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
                block
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>

            <div className={styles.divider}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>或</span>
            </div>

            <GitHubLoginButton loading={loading} onLoading={setLoading} />
          </Form>
        )}

        <div className={styles.link}>
          {isRegister ? '已有账号？' : '还没有账号？'}
          <a
            onClick={() => setIsRegister(!isRegister)}
            className={styles.switchLink}
          >
            {isRegister ? '立即登录' : '立即注册'}
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
