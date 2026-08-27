<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">ALLOCATION CALCULATOR</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('គណនាការបែងចែកចំណូល', 'Revenue Allocation Calculator') }}
      </h2>
    </div>

    <!-- Revenue Input -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('បញ្ចូលចំណូលប្រចាំខែ', 'ENTER MONTHLY REVENUE') }}
      </p>
      <div class="flex items-center gap-3">
        <span class="text-2xl font-bold" :style="{ color: 'var(--accent)' }">$</span>
        <input type="number" v-model.number="revenue" step="100" min="0"
          class="flex-1 border rounded-lg px-4 py-3 text-2xl font-display font-bold transition"
          :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
      </div>
    </div>

    <!-- 4 Account Results -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div v-for="acc in results" :key="acc.name" class="border rounded-xl p-4 text-center"
        :style="{ background: 'var(--bg-card)', borderColor: acc.color }">
        <p class="text-[10px] uppercase tracking-widest font-medium" :style="{ color: acc.color }">{{ t(acc.km, acc.en) }}</p>
        <p class="text-2xl md:text-3xl font-display font-black mt-1" :style="{ color: acc.color }">${{ acc.amount.toFixed(0) }}</p>
        <p class="text-[10px] mt-1" :style="{ color: 'var(--text-label)' }">{{ acc.pct }}%</p>
      </div>
    </div>

    <!-- Progress Bars -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-5" :style="{ color: 'var(--text-label)' }">
        {{ t('ការបែងចែក', 'ALLOCATION BREAKDOWN') }}
      </p>
      <div class="flex h-6 rounded-full overflow-hidden mb-4">
        <div v-for="acc in results" :key="acc.name" class="h-full transition-all duration-500"
          :style="{ width: acc.pct + '%', background: acc.color }"></div>
      </div>
      <div class="grid grid-cols-4 gap-2 text-center">
        <div v-for="acc in results" :key="acc.name">
          <span class="text-[10px] font-bold" :style="{ color: acc.color }">{{ t(acc.km, acc.en) }}</span>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('ការបែងចែក', 'VISUAL') }}
      </p>
      <div class="chart-box" style="max-height:300px"><canvas ref="chartRef"></canvas></div>
    </div>

    <div class="flex justify-end">
      <router-link to="/tiers" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ កម្រិតចំណូល →', 'Next: Revenue Tiers →') }}
      </router-link>
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
const chartRef = ref(null)
let chartInstance = null

const safeRevenue = computed(() => revenue.value || 0)

const allocs = [
  { name: 'profit', pct: 5, color: '#10b981', km: 'ប្រាក់ចំណេញ', en: 'PROFIT' },
  { name: 'owner', pct: 50, color: '#3b82f6', km: 'ប្រាក់ខ្លួនឯង', en: 'OWNER PAY' },
  { name: 'tax', pct: 15, color: '#f59e0b', km: 'ពន្ធ', en: 'TAX' },
  { name: 'opex', pct: 30, color: '#94a3b8', km: 'ប្រតិបត្តិការ', en: 'OPERATING' },
]

const results = computed(() => allocs.map(a => ({
  ...a,
  amount: safeRevenue.value * (a.pct / 100)
})))

function renderChart() {
  if (chartInstance) chartInstance.destroy()
  if (!chartRef.value) return
  const cc = getChartColors()
  chartInstance = new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: results.value.map(a => t(a.km, a.en)),
      datasets: [{
        data: results.value.map(a => a.pct),
        backgroundColor: results.value.map(a => a.color),
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
watch([theme, revenue], renderChart)
</script>
