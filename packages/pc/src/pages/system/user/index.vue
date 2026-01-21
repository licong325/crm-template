<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus'
import { getUserList, deleteUser, createUser, updateUser, getRoleList, getDeptTree } from '@shared/api'
import type { UserInfo, RoleInfo, DeptInfo } from '@shared/types'

// 搜索表单
const searchForm = reactive({
  keyword: '',
  status: undefined as number | undefined
})

// 表格数据
const tableData = ref<UserInfo[]>([])
const loading = ref(false)
const total = ref(0)
const pagination = reactive({
  page: 1,
  pageSize: 10
})

// 弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增用户')
const dialogLoading = ref(false)
const formRef = ref()

// 表单数据
const formData = reactive({
  id: '',
  username: '',
  nickname: '',
  phone: '',
  email: '',
  gender: 1 as 0 | 1 | 2,
  status: 1 as 0 | 1,
  deptId: '',
  roleIds: [] as string[]
})

// 表单规则
const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  deptId: [{ required: true, message: '请选择部门', trigger: 'change' }],
  roleIds: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

// 角色和部门选项
const roleOptions = ref<RoleInfo[]>([])
const deptOptions = ref<DeptInfo[]>([])

// 获取列表
const getList = async () => {
  loading.value = true
  try {
    const res = await getUserList({
      page: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchForm.keyword,
      status: searchForm.status
    })
    tableData.value = res.list
    total.value = res.total
  } catch {
    // 获取失败
  } finally {
    loading.value = false
  }
}

// 获取角色和部门选项
const loadOptions = async () => {
  try {
    const [roleRes, deptRes] = await Promise.all([getRoleList(), getDeptTree()])
    roleOptions.value = roleRes.list
    deptOptions.value = deptRes
  } catch {
    // 获取失败
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  getList()
}

// 重置
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.status = undefined
  handleSearch()
}

// 重置表单
const resetForm = () => {
  formData.id = ''
  formData.username = ''
  formData.nickname = ''
  formData.phone = ''
  formData.email = ''
  formData.gender = 1
  formData.status = 1
  formData.deptId = ''
  formData.roleIds = []
}

// 新增
const handleAdd = () => {
  resetForm()
  dialogTitle.value = '新增用户'
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: UserInfo) => {
  resetForm()
  dialogTitle.value = '编辑用户'
  formData.id = row.id
  formData.username = row.username
  formData.nickname = row.nickname
  formData.phone = row.phone
  formData.email = row.email
  formData.gender = row.gender
  formData.status = row.status
  formData.deptId = row.deptId
  formData.roleIds = [...row.roleIds]
  dialogVisible.value = true
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    dialogLoading.value = true

    // 获取部门名称和角色名称
    const dept = findDept(deptOptions.value, formData.deptId)
    const roleNames = roleOptions.value
      .filter(r => formData.roleIds.includes(r.id))
      .map(r => r.name)

    const data = {
      ...formData,
      deptName: dept?.name || '',
      roleNames
    }

    if (formData.id) {
      await updateUser(formData.id, data)
      ElMessage.success('编辑成功')
    } else {
      await createUser(data)
      ElMessage.success('新增成功')
    }

    dialogVisible.value = false
    getList()
  } catch {
    // 验证失败或提交失败
  } finally {
    dialogLoading.value = false
  }
}

// 递归查找部门
const findDept = (list: DeptInfo[], id: string): DeptInfo | null => {
  for (const dept of list) {
    if (dept.id === id) return dept
    if (dept.children) {
      const found = findDept(dept.children, id)
      if (found) return found
    }
  }
  return null
}

// 删除
const handleDelete = async (row: UserInfo) => {
  try {
    await ElMessageBox.confirm(`确定删除用户「${row.nickname}」吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deleteUser(row.id)
    ElMessage.success('删除成功')
    getList()
  } catch {
    // 取消
  }
}

// 分页变化
const handlePageChange = (page: number) => {
  pagination.page = page
  getList()
}

onMounted(() => {
  getList()
  loadOptions()
})
</script>

<template>
  <div class="page-container">
    <!-- 搜索栏 -->
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keyword" placeholder="用户名/昵称/手机号" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable style="width: 120px">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格 -->
    <el-card shadow="never">
      <!-- 操作栏 -->
      <div class="table-toolbar">
        <el-button type="primary" v-permission="'system:user:add'" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增用户
        </el-button>
      </div>

      <!-- 表格 -->
      <el-table v-loading="loading" :data="tableData" border>
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="nickname" label="昵称" width="120" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="deptName" label="部门" width="150" />
        <el-table-column prop="roleNames" label="角色" min-width="150">
          <template #default="{ row }">
            <el-tag v-for="role in row.roleNames" :key="role" size="small" style="margin-right: 4px">
              {{ role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link v-permission="'system:user:edit'" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" link v-permission="'system:user:delete'" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.page"
          :page-size="pagination.pageSize"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" destroy-on-close>
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formData.username" placeholder="请输入用户名" :disabled="!!formData.id" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="formData.nickname" placeholder="请输入昵称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="formData.gender">
                <el-radio :value="1">男</el-radio>
                <el-radio :value="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="formData.status">
                <el-radio :value="1">启用</el-radio>
                <el-radio :value="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="部门" prop="deptId">
          <el-tree-select
            v-model="formData.deptId"
            :data="deptOptions"
            :props="{ label: 'name', value: 'id', children: 'children' }"
            placeholder="请选择部门"
            check-strictly
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="formData.roleIds" multiple placeholder="请选择角色" style="width: 100%">
            <el-option v-for="role in roleOptions" :key="role.id" :label="role.name" :value="role.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  .search-card {
    margin-bottom: 16px;
  }

  .table-toolbar {
    margin-bottom: 16px;
  }

  .pagination-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
}
</style>
