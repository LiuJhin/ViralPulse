import { ElMessage } from 'element-plus'
import type { AxiosError } from 'axios'
import router from '../router'

// HTTP 状态码消息映射
const HTTP_STATUS_MAP: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
}

// API错误处理
export function handleApiError(error: AxiosError) {
  if (error.response) {
    const status = error.response.status
    const message = HTTP_STATUS_MAP[status] || error.message

    // 未授权时跳转到登录页
    if (status === 401) {
      router.push('/login')
    }

    ElMessage.error(message)
  } else if (error.request) {
    ElMessage.error('网络请求失败，请检查网络连接')
  } else {
    ElMessage.error(error.message)
  }
}

// 全局异常处理
export function setupGlobalErrorHandler() {
  window.onerror = (message, source, line, column, error) => {
    console.error('Global error:', { message, source, line, column, error })
    ElMessage.error('系统出现异常，请刷新页面重试')
    return true
  }

  window.onunhandledrejection = (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    ElMessage.error('操作失败，请重试')
    event.preventDefault()
  }
}