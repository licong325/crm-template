import type {UserInfo, RoleInfo, DeptInfo, MenuInfo} from '../../packages/shared/types'

// 模拟用户数据
export const mockUsers: UserInfo[] = [
    {
        id: '1',
        username: 'user1',
        nickname: '用户1',
        avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        email: 'user1@crm.com',
        phone: '13800138001',
        gender: 1,
        status: 1,
        deptId: '1',
        deptName: '行政部门',
        roleIds: ['1'],
        roleNames: ['超级管理员'],
        createTime: '2024-01-01 00:00:00',
        lastLoginTime: '2024-01-20 10:00:00'
    },
    {
        id: '2',
        username: 'user2',
        nickname: '用户2',
        avatar: '',
        email: 'user2@crm.com',
        phone: '13800138002',
        gender: 1,
        status: 1,
        deptId: '21',
        deptName: '项目部门1-研发部',
        roleIds: ['3'],
        roleNames: ['项目经理'],
        createTime: '2024-01-05 00:00:00',
        lastLoginTime: '2024-01-20 09:00:00'
    },
    {
        id: '3',
        username: 'user3',
        nickname: '用户3',
        avatar: '',
        email: 'user3@crm.com',
        phone: '13800138003',
        gender: 2,
        status: 1,
        deptId: '22',
        deptName: '项目部门1-销售部',
        roleIds: ['4'],
        roleNames: ['部门组长'],
        createTime: '2024-01-03 00:00:00',
        lastLoginTime: '2024-01-19 18:00:00'
    },
    {
        id: '4',
        username: 'user4',
        nickname: '用户4',
        avatar: '',
        email: 'user4@crm.com',
        phone: '13800138004',
        gender: 1,
        status: 1,
        deptId: '31',
        deptName: '项目部门2-研发部',
        roleIds: ['5'],
        roleNames: ['开发'],
        createTime: '2024-01-06 00:00:00',
        lastLoginTime: '2024-01-20 08:00:00'
    },
    {
        id: '5',
        username: 'user5',
        nickname: '用户5',
        avatar: '',
        email: 'user5@crm.com',
        phone: '13800138005',
        gender: 2,
        status: 0,
        deptId: '32',
        deptName: '项目部门2-销售部',
        roleIds: ['6'],
        roleNames: ['运营'],
        createTime: '2024-01-08 00:00:00',
        lastLoginTime: '2024-01-18 16:00:00'
    }
]

// 模拟角色数据
export const mockRoles: RoleInfo[] = [
    {
        id: '1',
        name: '超级管理员',
        code: 'super_admin',
        description: '拥有系统所有权限',
        status: 1,
        sort: 1,
        menuIds: ['1', '2', '21', '211', '212', '213', '22', '221', '222', '223', '23', '231', '232', '233'],
        createTime: '2024-01-01 00:00:00'
    },
    {
        id: '2',
        name: '管理员',
        code: 'admin',
        description: '系统管理员',
        status: 1,
        sort: 2,
        menuIds: ['1', '2', '21', '211', '212', '213', '22', '221', '222', '223', '23', '231', '232', '233'],
        createTime: '2024-01-01 00:00:00'
    },
    {
        id: '3',
        name: '项目经理',
        code: 'pm',
        description: '项目经理，负责项目管理',
        status: 1,
        sort: 3,
        menuIds: ['1', '2', '21', '211', '212', '22', '23'],
        createTime: '2024-01-02 00:00:00'
    },
    {
        id: '4',
        name: '部门组长',
        code: 'leader',
        description: '部门组长，负责团队管理',
        status: 1,
        sort: 4,
        menuIds: ['1', '2', '21', '22', '23'],
        createTime: '2024-01-02 00:00:00'
    },
    {
        id: '5',
        name: '开发',
        code: 'developer',
        description: '开发人员',
        status: 1,
        sort: 5,
        menuIds: ['1'],
        createTime: '2024-01-03 00:00:00'
    },
    {
        id: '6',
        name: '运营',
        code: 'operator',
        description: '运营人员',
        status: 1,
        sort: 6,
        menuIds: ['1'],
        createTime: '2024-01-03 00:00:00'
    }
]

// 模拟部门数据
export const mockDepts: DeptInfo[] = [
    {
        id: '1',
        name: '行政部门',
        parentId: '0',
        sort: 1,
        leader: '张总',
        phone: '13800138000',
        email: 'admin@crm.com',
        status: 1
    },
    {
        id: '4',
        name: '人事部门',
        parentId: '0',
        sort: 2,
        leader: '周总',
        phone: '13800138030',
        email: 'hr@crm.com',
        status: 1
    },
    {
        id: '2',
        name: '项目部门1',
        parentId: '0',
        sort: 3,
        leader: '李总',
        phone: '13800138010',
        email: 'project1@crm.com',
        status: 1,
        children: [
            {
                id: '21',
                name: '研发部',
                parentId: '2',
                sort: 1,
                leader: '王经理',
                phone: '13800138011',
                email: 'dev1@crm.com',
                status: 1
            },
            {
                id: '22',
                name: '销售部',
                parentId: '2',
                sort: 2,
                leader: '赵经理',
                phone: '13800138012',
                email: 'sales1@crm.com',
                status: 1
            }
        ]
    },
    {
        id: '3',
        name: '项目部门2',
        parentId: '0',
        sort: 4,
        leader: '陈总',
        phone: '13800138020',
        email: 'project2@crm.com',
        status: 1,
        children: [
            {
                id: '31',
                name: '研发部',
                parentId: '3',
                sort: 1,
                leader: '刘经理',
                phone: '13800138021',
                email: 'dev2@crm.com',
                status: 1
            },
            {
                id: '32',
                name: '销售部',
                parentId: '3',
                sort: 2,
                leader: '孙经理',
                phone: '13800138022',
                email: 'sales2@crm.com',
                status: 1
            }
        ]
    }
]

// 模拟菜单数据
export const mockMenus: MenuInfo[] = [
    {
        id: '1',
        parentId: '0',
        name: '首页',
        path: '/dashboard',
        component: 'dashboard/index',
        icon: 'HomeFilled',
        sort: 1,
        type: 'menu',
        visible: true,
        keepAlive: true,
        status: 1
    },
    {
        id: '2',
        parentId: '0',
        name: '系统管理',
        path: '/system',
        component: 'Layout',
        redirect: '/system/user',
        icon: 'Setting',
        sort: 99,
        type: 'directory',
        visible: true,
        keepAlive: false,
        status: 1,
        children: [
            {
                id: '21',
                parentId: '2',
                name: '用户管理',
                path: 'user',
                component: 'system/user/index',
                icon: 'User',
                sort: 1,
                type: 'menu',
                permission: 'system:user:list',
                visible: true,
                keepAlive: true,
                status: 1,
                children: [
                    {
                        id: '211',
                        parentId: '21',
                        name: '新增用户',
                        type: 'button',
                        permission: 'system:user:add',
                        sort: 1,
                        status: 1
                    },
                    {
                        id: '212',
                        parentId: '21',
                        name: '编辑用户',
                        type: 'button',
                        permission: 'system:user:edit',
                        sort: 2,
                        status: 1
                    },
                    {
                        id: '213',
                        parentId: '21',
                        name: '删除用户',
                        type: 'button',
                        permission: 'system:user:delete',
                        sort: 3,
                        status: 1
                    }
                ]
            },
            {
                id: '22',
                parentId: '2',
                name: '角色管理',
                path: 'role',
                component: 'system/role/index',
                icon: 'UserFilled',
                sort: 2,
                type: 'menu',
                permission: 'system:role:list',
                visible: true,
                keepAlive: true,
                status: 1,
                children: [
                    {
                        id: '221',
                        parentId: '22',
                        name: '新增角色',
                        type: 'button',
                        permission: 'system:role:add',
                        sort: 1,
                        status: 1
                    },
                    {
                        id: '222',
                        parentId: '22',
                        name: '编辑角色',
                        type: 'button',
                        permission: 'system:role:edit',
                        sort: 2,
                        status: 1
                    },
                    {
                        id: '223',
                        parentId: '22',
                        name: '删除角色',
                        type: 'button',
                        permission: 'system:role:delete',
                        sort: 3,
                        status: 1
                    }
                ]
            },
            {
                id: '23',
                parentId: '2',
                name: '部门管理',
                path: 'dept',
                component: 'system/dept/index',
                icon: 'OfficeBuilding',
                sort: 3,
                type: 'menu',
                permission: 'system:dept:list',
                visible: true,
                keepAlive: false,
                status: 1,
                children: [
                    {
                        id: '231',
                        parentId: '23',
                        name: '新增部门',
                        type: 'button',
                        permission: 'system:dept:add',
                        sort: 1,
                        status: 1
                    },
                    {
                        id: '232',
                        parentId: '23',
                        name: '编辑部门',
                        type: 'button',
                        permission: 'system:dept:edit',
                        sort: 2,
                        status: 1
                    },
                    {
                        id: '233',
                        parentId: '23',
                        name: '删除部门',
                        type: 'button',
                        permission: 'system:dept:delete',
                        sort: 3,
                        status: 1
                    }
                ]
            }
        ]
    }
]

// 模拟权限标识
export const mockPermissions: string[] = [
    '*', // 超级管理员拥有所有权限
    'system:user:list',
    'system:user:add',
    'system:user:edit',
    'system:user:delete',
    'system:role:list',
    'system:role:add',
    'system:role:edit',
    'system:role:delete',
    'system:dept:list',
    'system:dept:add',
    'system:dept:edit',
    'system:dept:delete'
]
