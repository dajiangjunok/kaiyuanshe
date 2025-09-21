import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';

import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { AuthProvider } from '@/contexts/AuthContext';

// 配置 dayjs 中文语言
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const customTheme = {
  token: {
    colorPrimary: '#1E3A8A',
  },
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || '开源社';

  return (
    <SessionProvider
      session={session}
      // 优化 SessionProvider 配置，减少客户端请求
      refetchInterval={5 * 60} // 5分钟刷新一次
      refetchOnWindowFocus={false} // 禁用窗口聚焦时的自动刷新
      refetchWhenOffline={false} // 离线时不刷新
    >
      {/* 认证上下文提供者，统一管理认证状态，利用 NextAuth 内置缓存 */}
      <AuthProvider>
        <ConfigProvider theme={customTheme} locale={zhCN}>
          <AntdApp>
            <Layout>
              <Head>
                <title>{appName}</title>
              </Head>
              <Component {...pageProps} />
              {process.env.NEXT_PUBLIC_GA_ID && (
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
              )}
            </Layout>
          </AntdApp>
        </ConfigProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
