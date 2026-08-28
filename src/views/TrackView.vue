<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">EXPENSE TRACKER</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('តាមដានចំណាយប្រតិបត្តិការ', 'Operating Expense Tracker') }}
      </h2>
    </div>

    <!-- Inputs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border rounded-xl p-5" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-xs uppercase tracking-widest font-medium mb-3" :style="{ color: 'var(--text-label)' }">
          {{ t('ចំណូលប្រចាំខែ', 'MONTHLY REVENUE') }}
        </p>
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold shrink-0" :style="{ color: 'var(--accent)' }">$</span>
          <input type="number" v-model.number="revenue" step="100" min="0" inputmode="decimal"
            class="flex-1 w-full min-w-0 max-w-full border rounded-lg px-3 py-2 text-lg font-bold transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
        </div>
      </div>
      <div class="border rounded-xl p-5" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-xs uppercase tracking-widest font-medium mb-3" :style="{ color: 'var(--text-label)' }">
          {{ t('ចំណាយប្រតិបត្តិការពិតប្រាកដ', 'ACTUAL OPERATING EXPENSES') }}
        </p>
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold shrink-0" :style="{ color: '#f59e0b' }">$</span>
          <input type="number" v-model.number="expenses" step="100" min="0" inputmode="decimal"
            class="flex-1 w-full min-w-0 max-w-full border rounded-lg px-3 py-2 text-lg font-bold transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
        </div>
      </div>
    </div>

    <!-- Status -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: status.bg, borderColor: status.border }">
      <p class="text-lg font-display font-black mb-1" :style="{ color: status.color }">{{ status.title }}</p>
      <p class="text-sm" :style="{ color: 'var(--text-body)' }">{{ status.message }}</p>
    </div>

    <!-- Breakdown -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('ការបែងចែកពិតប្រាកដ', 'ACTUAL BREAKDOWN') }}
      </p>
      <div class="space-y-3">
        <div v-for="row in breakdown" :key="row.label">
          <div class="flex justify-between text-xs mb-1">
            <span class="font-bold" :style="{ color: row.color }">{{ row.label }}</span>
            <span :style="{ color: 'var(--text-muted)' }">${{ row.amount.toFixed(0) }}</span>
          </div>
          <div class="h-2 rounded-full overflow-hidden" :style="{ background: 'var(--bg-input)' }">
            <div class="h-full rounded-full transition-all duration-500"
              :style="{ width: row.pctDisplay + '%', background: row.color }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Expense Limit -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('ដែនកំណត់ចំណាយ', 'EXPENSE LIMIT') }}
      </p>
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center">
          <p class="text-[10px] uppercase tracking-widest mb-1" :style="{ color: 'var(--text-label)' }">{{ t('ដែនកំណត់', 'LIMIT') }}</p>
          <p class="text-xl font-display font-bold" :style="{ color: 'var(--text-heading)' }">${{ limit.toFixed(0) }}</p>
        </div>
        <div class="text-center">
          <p class="text-[10px] uppercase tracking-widest mb-1" :style="{ color: 'var(--text-label)' }">{{ t('ការប្រើប្រាស់', 'USED') }}</p>
          <p class="text-xl font-display font-bold" :style="{ color: status.color }">${{ safeExpenses.toFixed(0) }}</p>
        </div>
      </div>
      <div class="mt-3 flex justify-between text-[10px]" :style="{ color: 'var(--text-label)' }">
        <span>$0</span>
        <span>${{ limit.toFixed(0) }}</span>
      </div>
      <div class="h-2 rounded-full overflow-hidden mt-1" :style="{ background: 'var(--bg-input)' }">
        <div class="h-full rounded-full transition-all duration-500"
          :style="{ width: Math.min(usedPct, 100) + '%', background: status.color }"></div>
      </div>
    </div>

    <!-- Chart -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('ក្បួនចំណាយ', 'EXPENSE CHART') }}
      </p>
      <div class="chart-box" style="max-height:300px"><canvas ref="chartRef"></canvas></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'

Chart.register(...registerables)
const { theme, getChartColors } = useTheme()
const { t } = useLanguage()

const revenue = ref(10000)
const expenses = ref(3000)

const safeRevenue = computed(() => Math.max(0, revenue.value || 0))
const safeExpenses = computed(() => Math.max(0, expenses.value || 0))
const chartRef = ref(null)
let chartInstance = null

const opexPct = 30
const limit = computed(() => safeRevenue.value * (opexPct / 100))
const usedPct = computed(() => limit.value > 0 ? (safeExpenses.value / limit.value) * 100 : 0)

const breakdown = computed(() => {
  const ownerPay = safeRevenue.value * 0.50
  const tax = safeRevenue.value * 0.15
  const profit = safeRevenue.value * 0.05
  return [
    { label: t('ចំណាយប្រតិបត្តិការ', 'Operating'), amount: safeExpenses.value, color: '#94a3b8', pctDisplay: safeRevenue.value > 0 ? (safeExpenses.value / safeRevenue.value) * 100 : 0 },
    { label: t('ប្រាក់ខ្លួនឯង', 'Owner Pay'), amount: ownerPay, color: '#3b82f6', pctDisplay: 50 },
    { label: t('ពន្ធ', 'Tax'), amount: tax, color: '#f59e0b', pctDisplay: 15 },
    { label: t('ប្រាក់ចំណេញ', 'Profit'), amount: profit, color: '#10b981', pctDisplay: 5 },
  ]
})

const status = computed(() => {
  const remaining = limit.value - safeExpenses.value
  if (safeExpenses.value <= limit.value) {
    return {
      color: '#10b981',
      bg: 'rgba(16,185,129,0.06)',
      border: '#10b981',
      title: t('✅ ស្ថានភាពល្អ', '✅ ON TRACK'),
      message: t(`អ្នកនៅសល់ $${remaining.toFixed(0)} សម្រាប់ចំណាយបន្ថែម`, `You have $${remaining.toFixed(0)} left for more expenses`)
    }
  } else {
    return {
      color: '#ef4444',
      bg: 'rgba(239,68,68,0.06)',
      border: '#ef4444',
      title: t('⚠️ ចំណាយលើស', '⚠️ OVER BUDGET'),
      message: t(`អ្នកលើស $${(-remaining).toFixed(0)} — ត្រូវកាត់បន្ថយចំណាយ ឬរកចំណូលបន្ថែម`, `You're $${(-remaining).toFixed(0)} over — cut expenses or find more revenue`)
    }
  }
})

function renderChart() {
  if (chartInstance) chartInstance.destroy()
  if (!chartRef.value) return
  const cc = getChartColors()
  const ownerPay = safeRevenue.value * 0.50
  const tax = safeRevenue.value * 0.15
  const profit = safeRevenue.value * 0.05
  chartInstance = new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: [
        t('ចំណាយ', 'Expenses'),
        t('ប្រាក់ខ្លួនឯង', 'Owner Pay'),
        t('ពន្ធ', 'Tax'),
        t('ប្រាក់ចំណេញ', 'Profit'),
      ],
      datasets: [{
        data: [safeExpenses.value, ownerPay, tax, profit],
        backgroundColor: ['#94a3b8', '#3b82f6', '#f59e0b', '#10b981'],
        borderColor: cc.border,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '60%',
      plugins: { legend: { position: 'right', labels: { color: cc.legend, padding: 10, font: { size: 11 } } } }
    }
  })
}

onMounted(renderChart)
watch([theme, revenue, expenses], renderChart)
</script>
