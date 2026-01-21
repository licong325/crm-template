import { http, HttpResponse, delay } from 'msw'
import { mockUsers, mockMenus, mockPermissions } from '../data/user'

export const authHandlers = [
  // 登录
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as { username: string; password: string }
    const { username, password } = body

    // 验证用户
    const user = mockUsers.find(u => u.username === username)
    if (!user || password !== '123456') {
      return HttpResponse.json(
        { code: 401, message: '用户名或密码错误', data: null },
        { status: 200 }
      )
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        token: `mock_token_${user.id}_${Date.now()}`,
        refreshToken: `mock_refresh_${user.id}_${Date.now()}`,
        expiresIn: 7200,
        userInfo: user
      }
    })
  }),

  // 登出
  http.post('/api/auth/logout', async () => {
    await delay(200)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: null
    })
  }),

  // 获取用户信息
  http.get('/api/auth/user-info', async ({ request }) => {
    await delay(300)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return HttpResponse.json(
        { code: 401, message: '未登录', data: null },
        { status: 200 }
      )
    }

    // 模拟返回第一个用户
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: mockUsers[0]
    })
  }),

  // 获取权限
  http.get('/api/auth/permissions', async () => {
    await delay(300)

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        menus: mockMenus,
        permissions: mockPermissions
      }
    })
  }),

  // 修改密码
  http.post('/api/auth/change-password', async () => {
    await delay(500)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: null
    })
  })
]
