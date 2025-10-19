// 验证码相关接口

// 发送验证码参数
export interface SendCodeParams {
  email: string;
  type: 'register' | 'reset_password';
}

// 验证验证码参数
export interface VerifyCodeParams {
  email: string;
  code: string;
  type: 'register' | 'reset_password';
}

// 验证码响应结果
export interface VerificationResult {
  success: boolean;
  message: string;
  data?: {
    token?: string; // 验证成功后的临时token
    expiresAt?: string;
  };
}

// 发送验证码
export const sendVerificationCode = async (params: SendCodeParams): Promise<VerificationResult> => {
  try {
    const isDev = process.env.NODE_ENV === 'development';
    const apiUrl = isDev ? '' : process.env.NEXT_PUBLIC_API_URL;
    
    if (!isDev && !apiUrl) {
      throw new Error('API URL is not defined');
    }

    const body = {
      email: params.email.trim(),
      type: params.type,
    };

    const endpoint = isDev ? '/api/send-verification-code' : `${apiUrl}/send-verification-code`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok && data.code === 200) {
      return {
        success: true,
        message: data.message ?? '验证码发送成功',
        data: data.data,
      };
    }

    return { success: false, message: data.message ?? '发送验证码失败' };
  } catch (error: unknown) {
    console.error('发送验证码异常:', error);
    const errorMessage = error instanceof Error ? error.message : '网络错误，请稍后重试';
    return { success: false, message: errorMessage };
  }
};

// 验证验证码
export const verifyCode = async (params: VerifyCodeParams): Promise<VerificationResult> => {
  try {
    const isDev = process.env.NODE_ENV === 'development';
    const apiUrl = isDev ? '' : process.env.NEXT_PUBLIC_API_URL;
    
    if (!isDev && !apiUrl) {
      throw new Error('API URL is not defined');
    }

    const body = {
      email: params.email.trim(),
      code: params.code.trim(),
      type: params.type,
    };

    const endpoint = isDev ? '/api/verify-code' : `${apiUrl}/verify-code`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok && data.code === 200) {
      return {
        success: true,
        message: data.message ?? '验证成功',
        data: data.data,
      };
    }

    return { success: false, message: data.message ?? '验证码验证失败' };
  } catch (error: unknown) {
    console.error('验证码验证异常:', error);
    const errorMessage = error instanceof Error ? error.message : '网络错误，请稍后重试';
    return { success: false, message: errorMessage };
  }
};