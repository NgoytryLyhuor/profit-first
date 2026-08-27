<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">THE FORMULA</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('រូបមន្ត Profit First', 'The Profit First Formula') }}
      </h2>
    </div>

    <!-- Visual Flow -->
    <div class="border rounded-xl p-6 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-6" :style="{ color: 'var(--text-label)' }">
        {{ t('របៀបដែលលុយចូល', 'HOW MONEY FLOWS') }}
      </p>
      <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
        <!-- Income -->
        <div class="border-2 rounded-xl p-4 text-center min-w-[120px]" :style="{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }">
          <p class="text-2xl font-display font-black" :style="{ color: 'var(--accent)' }">$10,000</p>
          <p class="text-[10px] uppercase tracking-widest mt-1" :style="{ color: 'var(--text-label)' }">{{ t('ចំណូល', 'INCOME') }}</p>
        </div>
        <!-- Arrow -->
        <div class="text-2xl font-bold" :style="{ color: 'var(--accent)' }">&#8594;</div>
        <!-- 4 Accounts -->
        <div class="grid grid-cols-2 gap-2">
          <div v-for="acc in accounts" :key="acc.name" class="border rounded-lg p-3 text-center min-w-[90px]"
            :style="{ borderColor: acc.color, background: acc.bg }">
            <p class="text-lg font-display font-black" :style="{ color: acc.color }">{{ acc.pct }}%</p>
            <p class="text-[9px] uppercase tracking-widest" :style="{ color: acc.color }">{{ t(acc.km, acc.en) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Explanation Steps -->
    <div class="space-y-4 mb-6">
      <div v-for="(step, i) in steps" :key="i" class="border rounded-xl p-5"
        :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            :style="{ background: 'var(--accent-light)', color: 'var(--accent)' }">{{ i + 1 }}</div>
          <div>
            <h3 class="font-bold mb-1" :style="{ color: 'var(--text-heading)' }">{{ t(step.kmTitle, step.enTitle) }}</h3>
            <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-muted)' }">{{ t(step.kmDesc, step.enDesc) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Old vs New Diagram -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border-2 border-dashed rounded-xl p-5" :style="{ borderColor: 'var(--red)' }">
        <p class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: 'var(--red)' }">{{ t('រូបមន្តបុរាណ', 'OLD WAY') }}</p>
        <div class="space-y-2">
          <div class="h-3 rounded-full" :style="{ background: 'var(--red)', width: '100%' }"></div>
          <p class="text-[10px]" :style="{ color: 'var(--text-label)' }">{{ t('ចំណូល 100% → ចំណាយអស់ → ប្រាក់ចំណេញ 0%', 'Revenue 100% → Spent all → Profit 0%') }}</p>
        </div>
      </div>
      <div class="border-2 rounded-xl p-5" :style="{ borderColor: 'var(--accent)' }">
        <p class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: 'var(--accent)' }">{{ t('រូបមន្ត Profit First', 'PROFIT FIRST') }}</p>
        <div class="space-y-2">
          <div class="flex gap-1 h-3 rounded-full overflow-hidden">
            <div class="rounded-full" :style="{ background: '#10b981', width: '5%' }"></div>
            <div class="rounded-full" :style="{ background: '#3b82f6', width: '50%' }"></div>
            <div class="rounded-full" :style="{ background: '#f59e0b', width: '15%' }"></div>
            <div class="rounded-full" :style="{ background: '#94a3b8', width: '30%' }"></div>
          </div>
          <p class="text-[10px]" :style="{ color: 'var(--text-label)' }">{{ t('ចំណូល 100% → ប្រាក់ចំណេញសិន → រួចចំណាយ', 'Revenue 100% → Profit first → Then expenses') }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8">
      <router-link to="/accounts" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ ៤ គណនី →', 'Next: 4 Accounts →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const accounts = [
  { name: 'profit', pct: 5, color: '#10b981', bg: 'rgba(16,185,129,0.06)', km: 'ប្រាក់ចំណេញ', en: 'PROFIT' },
  { name: 'owner', pct: 50, color: '#3b82f6', bg: 'rgba(59,130,246,0.06)', km: 'ប្រាក់ខ្លួនឯង', en: 'OWNER' },
  { name: 'tax', pct: 15, color: '#f59e0b', bg: 'rgba(245,158,11,0.06)', km: 'ពន្ធ', en: 'TAX' },
  { name: 'opex', pct: 30, color: '#94a3b8', bg: 'rgba(148,163,184,0.06)', km: 'ប្រតិបត្តិការ', en: 'OPERATING' },
]

const steps = [
  {
    kmTitle: '១. បើកគណនី ៤ ធនាគារ', enTitle: '1. Open 4 Bank Accounts',
    kmDesc: 'បើកគណនីពិសេស ៤ នៅធនាគារផ្សេងគ្នា — Profit, Owner\'s Pay, Tax, និង Operating Expenses។ កុំប្រើគណនីតែមួយសម្រាប់អស់។',
    enDesc: 'Open 4 separate bank accounts at different banks — Profit, Owner\'s Pay, Tax, and Operating Expenses. Never mix them.'
  },
  {
    kmTitle: '២. កំណត់ភាគរយ', enTitle: '2. Set Your Percentages',
    kmDesc: 'ចាប់ផ្តើមជាមួយភាគរយតូច (ឧ. Profit 1%) រួចបង្កើនបន្តិចម្តងៗ។ ភាគរយដែលនៅសល់ជា Operating Expenses។',
    enDesc: 'Start with small percentages (e.g. Profit 1%) and gradually increase. The remainder goes to Operating Expenses.'
  },
  {
    kmTitle: '៣. យកប្រាក់ចំណេញ ២ ដងក្នុងខែ', enTitle: '3. Take Profit Twice a Month',
    kmDesc: 'នៅថ្ងៃទី ១ និងថ្ងៃទី ១៥ នៃខែ — ដាក់ភាគរយទៅគណនី Profit, Owner\'s Pay, និង Tax។ ទុក Operating សម្រាប់ចំណាយ។',
    enDesc: 'On the 1st and 15th of each month — allocate percentages to Profit, Owner\'s Pay, and Tax accounts. Keep Operating for expenses.'
  },
  {
    kmTitle: '៤. កាត់បន្ថយ Operating', enTitle: '4. Decrease Operating Expenses',
    kmDesc: 'ប្រសិនបើ Operating មិនគ្រប់គ្រាន់ — រកវិធីកាត់បន្ថយចំណាយ ឬរកចំណូលបន្ថែម កុំយកពី Profit ឬ Owner\'s Pay។',
    enDesc: 'If Operating isn\'t enough — find ways to cut expenses or increase revenue. Never steal from Profit or Owner\'s Pay.'
  },
  {
    kmTitle: '៥. បង្កើនភាគរយប្រាក់ចំណេញ', enTitle: '5. Increase Profit % Over Time',
    kmDesc: 'រៀងរាល់ត្រីមាស បង្កើនភាគរយ Profit 1% រហូតដល់ 15-20%។ នេះជាគោលដៅចុងក្រោយ។',
    enDesc: 'Every quarter, increase your Profit percentage by 1% until you reach 15-20%. That\'s the ultimate goal.'
  },
]
</script>
