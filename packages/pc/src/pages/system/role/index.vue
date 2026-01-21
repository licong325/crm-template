<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus'
import { getRoleList, deleteRole, createRole, updateRole, getMenuTree } from '@shared/api'
import type { RoleInfo, MenuInfo } from '@shared/types'

// 搜索表单
const searchForm = reactive({
  keyword: '',
  status: undefined as number | undefined
})

// 表格数据
const tableData = ref<RoleInfo[]>([])
const loading = ref(false)
const total = ref(0)

// 弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增角色')
const dialogLoading = ref(false)
const formRef = ref()

// 表单数据
const formData = reactive({
  id: '',
  name: '',
  code: '',
  description: '',
  status: 1 as 0 | 1,
  sort: 1,
  menuIds: [] as string[]
})

// 权限树相关
const menuTreeData = ref<MenuInfo[]>([])
const treeRef = ref()
const defaultProps = {
  children: 'children',
  label: 'name'
}

// 表单规则
const formRules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
}

// 获取列表
const getList = async () => {
  loading.value = true
  try {
    const res = await getRoleList({
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

const handleSearch = () => getList()
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.status = undefined
  getList()
}

// 获取菜单树
const loadMenuTree = async () => {
  try {
    const res = await getMenuTree()
    menuTreeData.value = res
  } catch {
    // 获取失败
  }
}

// 重置表单
const resetForm = () => {
  formData.id = ''
  formData.name = ''
  formData.code = ''
  formData.description = ''
  formData.status = 1
  formData.sort = tableData.value.length + 1
  formData.menuIds = []
}

// 新增
const handleAdd = () => {
  resetForm()
  dialogTitle.value = '新增角色'
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: RoleInfo) => {
  resetForm()
  dialogTitle.value = '编辑角色'
  formData.id = row.id
  formData.name = row.name
  formData.code = row.code
  formData.description = row.description
  formData.status = row.status
  formData.sort = row.sort
  formData.menuIds = [...(row.menuIds || [])]
  dialogVisible.value = true
  // 需要等待 DOM 更新后再设置选中状态
  nextTick(() => {
    treeRef.value?.setCheckedKeys(formData.menuIds)
  })
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    dialogLoading.value = true

    // 获取选中的菜单权限（包括半选状态的父节点）
    const checkedKeys = treeRef.value?.getCheckedKeys() || []
    const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys() || []
    const menuIds = [...checkedKeys, ...halfCheckedKeys]

    const data = {
      ...formData,
      menuIds
    }

    if (formData.id) {
      await updateRole(formData.id, data)
      ElMessage.success('编辑成功')
    } else {
      await createRole(data)
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

// 删除
const handleDelete = async (row: RoleInfo) => {
  try {
    await ElMessageBox.confirm(`确定删除角色「${row.name}」吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deleteRole(row.id)
    ElMessage.success('删除成功')
    getList()
  } catch {
    // 取消
  }
}

onMounted(() => {
  getList()
  loadMenuTree()
})
</script>

<template>
  <div class="page-container">
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keyword" placeholder="角色名称/编码" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable style="width: 120px">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="table-toolbar">
        <el-button type="primary" v-permission="'system:role:add'" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增角色
        </el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" border>
        <el-table-column prop="name" label="角色名称" width="150" />
        <el-table-column prop="code" label="角色编码" width="120" />
        <el-table-column prop="description" label="描述" min-width="200" />
        <el-table-column prop="sort" label="排序" width="80" align="center" />
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
            <el-button type="primary" link v-permission="'system:role:edit'" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link v-permission="'system:role:delete'" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" destroy-on-close>
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="formData.code" placeholder="请输入角色编码" :disabled="!!formData.id" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入描述" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="formData.sort" :min="1" style="width: 100%" />
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
        <el-form-item label="权限">
          <div class="permission-tree-container">
            <el-tree
              ref="treeRef"
              :data="menuTreeData"
              :props="defaultProps"
              show-checkbox
              node-key="id"
              default-expand-all
              check-strictly
            >
              <template #default="{ node, data }">
                <span class="tree-node">
                  <el-icon v-if="data.type === 'directory'"><Folder /></el-icon>
                  <el-icon v-else-if="data.type === 'menu'"><Document /></el-icon>
                  <el-icon v-else><Operation /></el-icon>
                  <span style="margin-left: 4px">{{ node.label }}</span>
                </span>
              </template>
            </el-tree>
          </div>
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
}

.permission-tree-container {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  padding: 8px;

  .tree-node {
    display: flex;
    align-items: center;
  }
}
</style>
