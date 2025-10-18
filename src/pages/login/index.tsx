'use client';
import React, { useState } from 'react';
import { Form, Input, Button, App as AntdApp } from 'antd';
import { signIn } from 'next-auth/react';
import styles from './index.module.css';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { registerUser } from '../api/login';

type LoginFieldType = {
  email?: string;
  password?: string;
};

type RegisterFieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
};

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();
  const { set, get } = useLocalStorage('user');
  const { message } = AntdApp.useApp();
  const initialValues = {
    email: get()?.email,
  };

  const onLoginFinish = async (values: LoginFieldType) => {
    try {
      const { email, password } = values;
      setLoading(true);

      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.ok) {
        set({
          email: email,
        });
        router.push('/');
      } else {
        message.warning('登录失败...');
      }
    } catch {
      message.error('网络错误...');
    } finally {
      setLoading(false);
    }
  };

  const onRegisterFinish = async (values: RegisterFieldType) => {
    try {
      const { email, password, username } = values;
      if (!email || !password || !username) {
        message.error('请填写完整信息');
        return;
      }
      
      setLoading(true);

      const res = await registerUser({
        email,
        password,
        username,
      });

      if (res.success) {
        message.success('注册成功！请登录');
        setIsRegister(false);
      } else {
        message.error(res.message || '注册失败');
      }
    } catch {
      message.error('网络错误...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <h2 className={styles.title}>{isRegister ? '欢迎注册' : '欢迎登录'}</h2>

        {isRegister ? (
          <Form
            layout="vertical"
            onFinish={onRegisterFinish}
          >
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
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
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
                注册
              </Button>
            </Form.Item>
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
  );
};

export default LoginPage;
