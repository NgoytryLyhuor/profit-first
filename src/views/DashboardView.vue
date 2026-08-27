<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">BOOK SUMMARY</p>
      <h1 class="text-3xl md:text-5xl font-display font-black leading-tight mb-3" :style="{ color: 'var(--text-heading)' }">
        {{ t('ប្រាក់ចំណេញជាមុន', 'Profit First') }}
      </h1>
      <p class="max-w-lg text-sm leading-relaxed" :style="{ color: 'var(--text-muted)' }">
        {{ t('រូបមន្តហិរញ្ញវត្ថុដែលបញ្ច្រាសរូបមន្តបែបបុរាណ — ដាក់ប្រាក់ចំណេញជាមុន សិន ទើបដឹងថាចំណាយអីបាន។', 'A system that flips traditional accounting — take your profit first, then operate on what\'s left.') }}
      </p>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <router-link v-for="card in statCards" :key="card.to" :to="card.to"
        class="border rounded-xl p-4 text-left cursor-pointer hover:opacity-80 transition block"
        :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-[10px] uppercase tracking-widest font-medium" :style="{ color: 'var(--text-label)' }">{{ t(card.kmLabel, card.enLabel) }}</p>
        <p class="text-2xl md:text-3xl font-display font-black mt-1" :style="{ color: card.color }">{{ card.value }}</p>
        <p class="text-[10px] mt-1" :style="{ color: 'var(--text-label)' }">{{ t(card.kmSub, card.enSub) }}</p>
      </router-link>
    </div>

    <!-- Chart -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('ការបែងចែកចំណូល $10,000/ខែ', 'REVENUE ALLOCATION $10,000/mo') }}
      </p>
      <div class="chart-box"><canvas ref="mainChartRef"></canvas></div>
    </div>

    <!-- Old vs New Formula -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border-2 border-dashed rounded-xl p-5" :style="{ borderColor: 'var(--red)', background: 'var(--bg-card)' }">
        <p class="text-[10px] uppercase tracking-widest font-bold mb-2" :style="{ color: 'var(--red)' }">
          {{ t('រូបមន្តបែបបុរាណ ( WRONG )', 'OLD WAY (WRONG)') }}
        </p>
        <p class="text-lg font-display font-black" :style="{ color: 'var(--text-heading)' }">
          Revenue - Expenses = Profit
        </p>
        <p class="text-xs mt-2" :style="{ color: 'var(--text-muted)' }">
          {{ t('ប្រាក់ចំណេញ? អ្វីដែលនៅសល់ (តែងតែមិននៅសល់)', 'Profit? Whatever is left (usually nothing)') }}
        </p>
      </div>
      <div class="border-2 rounded-xl p-5" :style="{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }">
        <p class="text-[10px] uppercase tracking-widest font-bold mb-2" :style="{ color: 'var(--accent)' }">
          {{ t('រូបមន្ត Profit First ( CORRECT )', 'PROFIT FIRST (CORRECT)') }}
        </p>
        <p class="text-lg font-display font-black" :style="{ color: 'var(--text-heading)' }">
          Revenue - Profit = Expenses
        </p>
        <p class="text-xs mt-2" :style="{ color: 'var(--text-muted)' }">
          {{ t('ដាក់ប្រាក់ចំណេញសិន សិន រួចដំណើរការជាមួយអ្វីដែលនៅសល់', 'Take profit first, then run the business on what\'s left') }}
        </p>
      </div>
    </div>

    <div class="text-center">
      <router-link to="/formula"
        class="inline-block px-8 py-3 rounded-xl font-bold text-sm transition shadow-lg"
        :style="{ background: 'var(--accent)', color: '#ffffff', boxShadow: '0 4px 14px rgba(16,185,129,0.25)' }">
        {{ t('ចាប់ផ្តើមរៀន', 'Start Learning') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'

Chart.register(...registerables)

const { theme, getChartColors } = useTheme()
const { lang, t } = useLanguage()

const mainChartRef = ref(null)
let chartInstance = null

const statCards = [
  { to: '/formula', kmLabel: 'រូបមន្ត', enLabel: 'FORMULA', value: 'R-P=E', color: 'var(--accent)', kmSub: 'Revenue − Profit = Expenses', enSub: 'Revenue − Profit = Expenses' },
  { to: '/accounts', kmLabel: 'គណនី', enLabel: 'ACCOUNTS', value: '4', color: 'var(--blue)', kmSub: '៤ គណនីធនាគារ', enSub: '4 Bank Accounts' },
  { to: '/tiers', kmLabel: 'កម្រិតចំណូល', enLabel: 'TIERS', value: '5', color: 'var(--orange)', kmSub: 'កម្រិតចំណូល ៥', enSub: '5 Revenue Tiers' },
  { to: '/rules', kmLabel: 'គោលការណ៍', enLabel: 'COMPONENTS', value: '5', color: 'var(--purple)', kmSub: 'គោលការណ៍ស្នូល ៥', enSub: '5 Core Components' },
]

function renderChart() {
  if (chartInstance) chartInstance.destroy()
  if (!mainChartRef.value) return
  const cc = getChartColors()
  chartInstance = new Chart(mainChartRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Profit (5%)', 'Owner Pay (50%)', 'Tax (15%)', 'Operating (30%)'],
      datasets: [{
        data: [5, 50, 15, 30],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#94a3b8'],
        borderColor: cc.border,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: { legend: { position: 'right', labels: { color: cc.legend, padding: 12, font: { size: 12 } } } }
    }
  })
}

onMounted(renderChart)
watch(theme, renderChart)
</script>
