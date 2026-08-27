<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">4 ACCOUNTS</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('៤ គណនីធនាគារសំខាន់', 'The 4 Key Bank Accounts') }}
      </h2>
    </div>

    <div class="space-y-4 mb-6">
      <div v-for="(acc, i) in accounts" :key="i" class="border rounded-xl overflow-hidden"
        :style="{ background: 'var(--bg-card)', borderColor: acc.color }">
        <div class="p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
              :style="{ background: acc.bg, color: acc.color }">
              {{ acc.icon }}
            </div>
            <div>
              <h3 class="font-bold" :style="{ color: acc.color }">{{ t(acc.kmName, acc.enName) }}</h3>
              <p class="text-[10px] uppercase tracking-widest" :style="{ color: 'var(--text-label)' }">{{ acc.pct }}%</p>
            </div>
          </div>
          <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-muted)' }">{{ t(acc.kmDesc, acc.enDesc) }}</p>
          <div class="mt-3 border rounded-lg px-3 py-2" :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)' }">
            <p class="text-xs font-bold" :style="{ color: acc.color }">{{ t(acc.kmExample, acc.enExample) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Warning -->
    <div class="border-2 border-dashed rounded-xl p-5 mb-6" :style="{ borderColor: 'var(--red)' }">
      <p class="text-sm font-bold mb-2" :style="{ color: 'var(--red)' }">
        {{ t('កុំធ្វើរឿងនេះ:', 'NEVER DO THIS:') }}
      </p>
      <ul class="text-sm space-y-1" :style="{ color: 'var(--text-muted)' }">
        <li>&#10007; {{ t('កុំច្របល់គណនី Profit និង Operating', 'Don\'t mix Profit and Operating accounts') }}</li>
        <li>&#10007; {{ t('កុំយកប្រាក់ពី Profit Account សម្រាប់ចំណាយប្រចាំថ្ងៃ', 'Don\'t use Profit Account for daily expenses') }}</li>
        <li>&#10007; {{ t('កុំប្រើគណនីធនាគារតែមួយសម្រាប់អស់', 'Don\'t use one account for everything') }}</li>
      </ul>
    </div>

    <div class="flex justify-end mt-8">
      <router-link to="/calc" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ គណនាការបែងចែក →', 'Next: Allocation Calculator →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const accounts = [
  {
    icon: '&#9830;', color: '#10b981', bg: 'rgba(16,185,129,0.08)', pct: '5%',
    kmName: 'គណនីប្រាក់ចំណេញ', enName: 'PROFIT ACCOUNT',
    kmDesc: 'លុយនេះជារបស់អ្នក — កុំចំណាយវា។ នៅចុងឆ្នាំ បែងចែកជាប្រាក់រង្វាន់ (Profit Distribution) សម្រាប់ខ្លួនឯង។',
    enDesc: 'This money is yours — don\'t spend it. At year-end, distribute it as a bonus to yourself. This is the reward for running a profitable business.',
    kmExample: 'ចំណូល $10,000 × 5% = $500/ខែ = $6,000/ឆ្នាំ ប្រាក់ចំណេញសុទ្ធ', enExample: 'Revenue $10,000 × 5% = $500/mo = $6,000/yr pure profit'
  },
  {
    icon: '&#9632;', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', pct: '50%',
    kmName: 'គណនីប្រាក់ខ្លួនឯង', enName: "OWNER'S PAY ACCOUNT",
    kmDesc: 'នេះជាប្រាក់ខែរបស់អ្នក។ អ្នកជាម្ចាស់ក្រុមហ៊ុន ត្រូវបើកប្រាក់ខែឱ្យខ្លួនឯងដោយមិនខុសពីបុគ្គលិក។',
    enDesc: 'This is your salary. You\'re the business owner — pay yourself just like you\'d pay an employee. Consistently.',
    kmExample: 'ចំណូល $10,000 × 50% = $5,000/ខែ ប្រាក់ខែខ្លួនឯង', enExample: 'Revenue $10,000 × 50% = $5,000/mo your salary'
  },
  {
    icon: '&#9733;', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', pct: '15%',
    kmName: 'គណនីពន្ធ', enName: 'TAX ACCOUNT',
    kmDesc: 'ទុកលុយសម្រាប់បង់ពន្ធជាមុន។ ពេលដល់ពេលបង់ពន្ធ អ្នកមានលុយរួចជាស្រេច មិនភ័យខ្លាចទៀតឡើយ។',
    enDesc: 'Set aside money for taxes first. When tax time comes, you already have the money ready. No more stress.',
    kmExample: 'ចំណូល $10,000 × 15% = $1,500/ខែ សម្រាប់ពន្ធ', enExample: 'Revenue $10,000 × 15% = $1,500/mo for taxes'
  },
  {
    icon: '&#9776;', color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', pct: '30%',
    kmName: 'គណនីប្រតិបត្តិការ', enName: 'OPERATING EXPENSES',
    kmDesc: 'នេះជាអ្វីដែលនៅសល់សម្រាប់ដំណើរការក្រុមហ៊ុន — ជួល, ឧបករណ៍, បុគ្គលិក, ទីផ្សារ។',
    enDesc: 'This is what\'s left to run the business — rent, equipment, employees, marketing. If it\'s not enough, cut costs.',
    kmExample: 'ចំណូល $10,000 × 30% = $3,000/ខែ សម្រាប់ដំណើរការ', enExample: 'Revenue $10,000 × 30% = $3,000/mo operating'
  },
]
</script>
