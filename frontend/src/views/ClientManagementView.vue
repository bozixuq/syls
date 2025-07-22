<template>
  <div class="client-management">
    <el-button type="primary" @click="openCreateDialog">新增客户</el-button>

    <el-table :data="clients" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.gender" />
        </el-form-item>
        <el-form-item label="出生年份">
          <el-input v-model="form.birth_year" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="家属联系人">
          <el-input v-model="form.family_contact_name" />
        </el-form-item>
        <el-form-item label="家属电话">
          <el-input v-model="form.family_contact_phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'

const clients = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({
  id: null,
  name: '',
  gender: '',
  birth_year: '',
  phone: '',
  address: '',
  family_contact_name: '',
  family_contact_phone: '',
  status: ''
})

const dialogTitle = computed(() => (isEdit.value ? '编辑客户' : '新增客户'))

async function loadClients() {
  const res = await axios.get('/api/clients')
  clients.value = res.data
}

onMounted(loadClients)

function openCreateDialog() {
  isEdit.value = false
  form.value = {
    id: null,
    name: '',
    gender: '',
    birth_year: '',
    phone: '',
    address: '',
    family_contact_name: '',
    family_contact_phone: '',
    status: ''
  }
  dialogVisible.value = true
}

function openEditDialog(client) {
  isEdit.value = true
  form.value = { ...client }
  dialogVisible.value = true
}

async function submitForm() {
  try {
    if (isEdit.value) {
      await axios.put(`/api/clients/${form.value.id}`, form.value)
      ElMessage.success('更新成功')
    } else {
      await axios.post('/api/clients', {
        name: form.value.name,
        gender: form.value.gender,
        birth_year: form.value.birth_year,
        phone: form.value.phone,
        address: form.value.address,
        family_contact_name: form.value.family_contact_name,
        family_contact_phone: form.value.family_contact_phone
      })
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    loadClients()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

function handleDelete(client) {
  ElMessageBox.confirm('确定删除此客户吗？', '提示', {
    type: 'warning'
  })
    .then(async () => {
      await axios.delete(`/api/clients/${client.id}`)
      ElMessage.success('删除成功')
      loadClients()
    })
    .catch(() => {})
}
</script>

<style scoped>
.client-management {
  padding: 20px;
}
</style>

