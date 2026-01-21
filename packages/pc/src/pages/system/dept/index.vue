<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus'
import { getDeptTree, deleteDept, createDept, updateDept } from '@shared/api'
import type { DeptInfo } from '@shared/types'

// 表格数据
const tableData = ref<DeptInfo[]>([])
const loading = ref(false)

// 弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增部门')
const dialogLoading = ref(false)
const formRef = ref()

// 表单数据
const formData = reactive({
  id: '',
  name: '',
  parentId: '0',
  sort: 1,
  leader: '',
  phone: '',
  email: '',
  status: 1 as 0 | 1
})

// 表单规则
const formRules = {
  name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
  leader: [{ required: true, message: '请输入负责人', trigger: 'blur' }]
}

// 获取列表
const getList = async () => {
  loading.value = true
  try {
    tableData.value = await getDeptTree()
  } catch {
    // 获取失败
  } finally {
    loading.value = false
  }
}

// 重置表单
const resetForm = () => {
  formData.id = ''
  formData.name = ''
  formData.parentId = '0'
  formData.sort = 1
  formData.leader = ''
  formData.phone = ''
  formData.email = ''
  formData.status = 1
}

// 新增
const handleAdd = (parentId = '0') => {
  resetForm()
  formData.parentId = parentId
  dialogTitle.value = '新增部门'
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: DeptInfo) => {
  resetForm()
  dialogTitle.value = '编辑部门'
  formData.id = row.id
  formData.name = row.name
  formData.parentId = row.parentId
  formData.sort = row.sort
  formData.leader = row.leader
  formData.phone = row.phone
  formData.email = row.email
  formData.status = row.status
  dialogVisible.value = true
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    dialogLoading.value = true

    if (formData.id) {
      await updateDept(formData.id, formData)
      ElMessage.success('编辑成功')
    } else {
      await createDept(formData)
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
const handleDelete = async (row: DeptInfo) => {
  if (row.children && row.children.length > 0) {
    ElMessage.warning('该部门下有子部门，无法删除')
    return
  }

  try {
    await ElMessageBox.confirm(`确定删除部门「${row.name}」吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deleteDept(row.id)
    ElMessage.success('删除成功')
    getList()
  } catch {
    // 取消
  }
}

// 获取父部门选项（排除自己及子部门）
const getParentOptions = computed(() => {
  const result: { id: string; name: string; disabled?: boolean }[] = [
    { id: '0', name: '顶级部门' }
  ]

  const flatten = (list: DeptInfo[], prefix = '') => {
    list.forEach(item => {
      const disabled = formData.id ? item.id === formData.id : false
      result.push({
        id: item.id,
        name: prefix + item.name,
        disabled
      })
      if (item.children) {
        flatten(item.children, prefix + '　')
      }
    })
  }

  flatten(tableData.value)
  return result
})

onMounted(() => getList())
</script>

<template>
  <div class="page-container">
    <el-card shadow="never">
      <div class="table-toolbar">
        <el-button type="primary" v-permission="'system:dept:add'" @click="handleAdd()">
          <el-icon><Plus /></el-icon>
          新增部门
        </el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="name" label="部门名称" min-width="200" />
        <el-table-column prop="leader" label="负责人" width="120" />
        <el-table-column prop="phone" label="联系电话" width="140" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="sort" label="排序" width="80" align="center" />
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link v-permission="'system:dept:add'" @click="handleAdd(row.id)">新增</el-button>
            <el-button type="primary" link v-permission="'system:dept:edit'" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link v-permission="'system:dept:delete'" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" destroy-on-close>
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="formData.parentId" placeholder="请选择上级部门" style="width: 100%">
            <el-option
              v-for="opt in getParentOptions"
              :key="opt.id"
              :label="opt.name"
              :value="opt.id"
              :disabled="opt.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="负责人" prop="leader">
              <el-input v-model="formData.leader" placeholder="请输入负责人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
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
  .table-toolbar {
    margin-bottom: 16px;
  }
}
</style>
