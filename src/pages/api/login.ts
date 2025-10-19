// 登录参数 (code方式)
export interface LoginParams {
  code: string
}

// 邮箱密码登录参数
export interface EmailLoginParams {
  email: string
  password: string
}

// 登录响应数据
export interface LoginUser {
  ID: number
  username: string
  github: string
  email: string
  avatar: string
  permissions: string[]
  token: string
}

// 登录结果
export interface LoginResult {
  success: boolean
  message: string
  data?: LoginUser
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const loginUser = async (params: LoginParams): Promise<LoginResult> => {
  try {
    if (!apiUrl) {
      throw new Error('API URL is not defined')
    }

    const body = {
      code: params.code.trim()
    }

    // 直接使用 fetch，避免在认证过程中调用 apiRequest（会尝试获取 session）
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    console.log(body)

    const data = await response.json()

    if (response.ok && data.code === 200) {
      return {
        success: true,
        message: data.message ?? '登录成功',
        data: data.data as LoginUser
      }
    }

    return { success: false, message: data.message ?? '登录失败' }
  } catch (error: unknown) {
    console.error('登录异常:', error)
    const errorMessage =
      error instanceof Error ? error.message : '网络错误，请稍后重试'
    return { success: false, message: errorMessage }
  }
}

// 邮箱密码登录函数
export const loginWithEmail = async (
  params: EmailLoginParams
): Promise<LoginResult> => {
  try {
    if (!apiUrl) {
      throw new Error('API URL is not defined')
    }

    const body = {
      email: params.email.trim(),
      password: params.password
    }

    const response = await fetch(`${apiUrl}/login-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    // 检查响应的内容类型
    const contentType = response.headers.get('content-type')
    console.log('Email login response status:', response.status)
    console.log('Email login response content-type:', contentType)
    console.log('Email login response url:', response.url)
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.log('Email login non-JSON response:', text.substring(0, 500))
      throw new Error(`服务器返回非JSON响应: ${response.status} ${response.statusText}。请检查API服务器是否正常运行。`)
    }

    const data = await response.json()

    if (response.ok && data.code === 200) {
      return {
        success: true,
        message: data.message ?? '登录成功',
        data: data.data as LoginUser
      }
    }

    return { success: false, message: data.message ?? '登录失败' }
  } catch (error: unknown) {
    console.error('邮箱登录异常:', error)
    const errorMessage =
      error instanceof Error ? error.message : '网络错误，请稍后重试'
    return { success: false, message: errorMessage }
  }
}

// 注册参数
export interface RegisterParams {
  email: string
  password: string
  username: string
  verificationToken?: string // 验证码验证成功后的token
}

// 注册响应数据
export interface RegisterUser {
  ID: number
  username: string
  email: string
  avatar: string
}

// 注册结果
export interface RegisterResult {
  success: boolean
  message: string
  data?: RegisterUser
}

export const registerUser = async (
  params: RegisterParams
): Promise<RegisterResult> => {
  try {
    if (!apiUrl) {
      throw new Error('API URL is not defined')
    }

    const body = {
      email: params.email.trim(),
      password: params.password,
      username: params.username.trim(),
      verificationToken: params.verificationToken
    }

    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (response.ok && data.code === 200) {
      return {
        success: true,
        message: data.message ?? '注册成功',
        data: data.data as RegisterUser
      }
    }

    return { success: false, message: data.message ?? '注册失败' }
  } catch (error: unknown) {
    console.error('注册异常:', error)
    const errorMessage =
      error instanceof Error ? error.message : '网络错误，请稍后重试'
    return { success: false, message: errorMessage }
  }
}
