import { http, HttpResponse, delay } from 'msw'
import { mockUsers, mockRoles, mockDepts, mockMenus } from '../data/user'
import type { UserInfo, RoleInfo, DeptInfo } from '../../packages/shared/types'

// 用于生成自增ID
let userIdCounter = 100
let roleIdCounter = 100
let deptIdCounter = 100

export const userHandlers = [
  // ============ 用户管理 ============
  // 用户列表
  http.get('/api/system/users', async ({ request }) => {
    await delay(500)

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const keyword = url.searchParams.get('keyword') || ''

    let list = [...mockUsers]

    // 搜索过滤
    if (keyword) {
      list = list.filter(
        u =>
          u.username.includes(keyword) ||
          u.nickname.includes(keyword) ||
          u.phone.includes(keyword)
      )
    }

    // 分页
    const total = list.length
    const start = (page - 1) * pageSize
    list = list.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: { list, total, page, pageSize }
    })
  }),

  // 用户详情
  http.get('/api/system/users/:id', async ({ params }) => {
    await delay(300)
    const user = mockUsers.find(u => u.id === params.id)

    if (!user) {
      return HttpResponse.json(
        { code: 404, message: '用户不存在', data: null },
        { status: 200 }
      )
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: user
    })
  }),

  // 新增用户
  http.post('/api/system/users', async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Partial<UserInfo>

    const newUser: UserInfo = {
      id: String(++userIdCounter),
      username: body.username || '',
      nickname: body.nickname || '',
      avatar: body.avatar || '',
      email: body.email || '',
      phone: body.phone || '',
      gender: body.gender || 1,
      status: body.status ?? 1,
      deptId: body.deptId || '',
      deptName: body.deptName || '',
      roleIds: body.roleIds || [],
      roleNames: body.roleNames || [],
      createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
      lastLoginTime: ''
    }

    mockUsers.push(newUser)

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: newUser
    })
  }),

  // 编辑用户
  http.put('/api/system/users/:id', async ({ params, request }) => {
    await delay(300)
    const body = (await request.json()) as Partial<UserInfo>
    const index = mockUsers.findIndex(u => u.id === params.id)

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '用户不存在', data: null },
        { status: 200 }
      )
    }

    mockUsers[index] = { ...mockUsers[index], ...body }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: mockUsers[index]
    })
  }),

  // 删除用户
  http.delete('/api/system/users/:id', async ({ params }) => {
    await delay(300)
    const index = mockUsers.findIndex(u => u.id === params.id)

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '用户不存在', data: null },
        { status: 200 }
      )
    }

    mockUsers.splice(index, 1)

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: null
    })
  }),

  // ============ 角色管理 ============
  // 角色列表
  http.get('/api/system/roles', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const keyword = url.searchParams.get('keyword') || ''

    let list = [...mockRoles]

    if (keyword) {
      list = list.filter(r => r.name.includes(keyword) || r.code.includes(keyword))
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: { list, total: list.length }
    })
  }),

  // 角色详情
  http.get('/api/system/roles/:id', async ({ params }) => {
    await delay(300)
    const role = mockRoles.find(r => r.id === params.id)

    if (!role) {
      return HttpResponse.json(
        { code: 404, message: '角色不存在', data: null },
        { status: 200 }
      )
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: role
    })
  }),

  // 新增角色
  http.post('/api/system/roles', async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Partial<RoleInfo>

    const newRole: RoleInfo = {
      id: String(++roleIdCounter),
      name: body.name || '',
      code: body.code || '',
      description: body.description || '',
      status: body.status ?? 1,
      sort: body.sort || mockRoles.length + 1,
      menuIds: body.menuIds || [],
      createTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
    }

    mockRoles.push(newRole)

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: newRole
    })
  }),

  // 编辑角色
  http.put('/api/system/roles/:id', async ({ params, request }) => {
    await delay(300)
    const body = (await request.json()) as Partial<RoleInfo>
    const index = mockRoles.findIndex(r => r.id === params.id)

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '角色不存在', data: null },
        { status: 200 }
      )
    }

    mockRoles[index] = { ...mockRoles[index], ...body }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: mockRoles[index]
    })
  }),

  // 删除角色
  http.delete('/api/system/roles/:id', async ({ params }) => {
    await delay(300)
    const index = mockRoles.findIndex(r => r.id === params.id)

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '角色不存在', data: null },
        { status: 200 }
      )
    }

    mockRoles.splice(index, 1)

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: null
    })
  }),

  // ============ 部门管理 ============
  // 部门列表（树形）
  http.get('/api/system/depts', async () => {
    await delay(300)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: mockDepts
    })
  }),

  // 部门详情
  http.get('/api/system/depts/:id', async ({ params }) => {
    await delay(300)

    // 递归查找部门
    const findDept = (list: DeptInfo[], id: string): DeptInfo | null => {
      for (const dept of list) {
        if (dept.id === id) return dept
        if (dept.children) {
          const found = findDept(dept.children!, id)
          if (found) return found
        }
      }
      return null
    }

    const dept = findDept(mockDepts, params.id as string)

    if (!dept) {
      return HttpResponse.json(
        { code: 404, message: '部门不存在', data: null },
        { status: 200 }
      )
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: dept
    })
  }),

  // 新增部门
  http.post('/api/system/depts', async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as Partial<DeptInfo>

    const newDept: DeptInfo = {
      id: String(++deptIdCounter),
      name: body.name || '',
      parentId: body.parentId || '0',
      sort: body.sort || 1,
      leader: body.leader || '',
      phone: body.phone || '',
      email: body.email || '',
      status: body.status ?? 1
    }

    // 如果有父部门，添加到父部门的children中
    if (body.parentId && body.parentId !== '0') {
      const findAndAdd = (list: DeptInfo[]): boolean => {
        for (const dept of list) {
          if (dept.id === body.parentId) {
            if (!dept.children) dept.children = []
            dept.children.push(newDept)
            return true
          }
          if (dept.children && findAndAdd(dept.children!)) {
            return true
          }
        }
        return false
      }
      findAndAdd(mockDepts)
    } else {
      mockDepts.push(newDept)
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: newDept
    })
  }),

  // 编辑部门
  http.put('/api/system/depts/:id', async ({ params, request }) => {
    await delay(300)
    const body = (await request.json()) as Partial<DeptInfo>

    // 递归查找并更新部门
    const findAndUpdate = (list: DeptInfo[]): boolean => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === params.id) {
          list[i] = { ...list[i], ...body, children: list[i].children }
          return true
        }
        if (list[i].children && findAndUpdate(list[i].children!)) {
          return true
        }
      }
      return false
    }

    if (!findAndUpdate(mockDepts)) {
      return HttpResponse.json(
        { code: 404, message: '部门不存在', data: null },
        { status: 200 }
      )
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: null
    })
  }),

  // 删除部门
  http.delete('/api/system/depts/:id', async ({ params }) => {
    await delay(300)

    // 递归查找并删除部门
    const findAndDelete = (list: DeptInfo[]): boolean => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === params.id) {
          list.splice(i, 1)
          return true
        }
        if (list[i].children && findAndDelete(list[i].children!)) {
          return true
        }
      }
      return false
    }

    if (!findAndDelete(mockDepts)) {
      return HttpResponse.json(
        { code: 404, message: '部门不存在', data: null },
        { status: 200 }
      )
    }

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: null
    })
  }),

  // ============ 菜单管理 ============
  // 菜单树（用于角色权限配置）
  http.get('/api/system/menus', async () => {
    await delay(300)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: mockMenus
    })
  })
]
