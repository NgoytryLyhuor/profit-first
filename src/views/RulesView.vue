<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">5 CORE COMPONENTS</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('គោលការណ៍ស្នូល ៥', 'The 5 Core Components') }}
      </h2>
    </div>

    <div class="space-y-4 mb-6">
      <div v-for="(rule, i) in rules" :key="i" class="border rounded-xl overflow-hidden"
        :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <button @click="toggle(i)"
          class="w-full flex items-center justify-between p-5 text-left cursor-pointer"
          :style="{ background: 'var(--bg-card)' }">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
              :style="{ background: rule.bg, color: rule.color }">{{ rule.icon }}</div>
            <div>
              <p class="text-sm font-bold" :style="{ color: 'var(--text-heading)' }">
                {{ t(rule.kmTitle, rule.enTitle) }}
              </p>
              <p class="text-[10px] mt-0.5" :style="{ color: 'var(--text-label)' }">
                {{ t(rule.kmSub, rule.enSub) }}
              </p>
            </div>
          </div>
          <span class="text-lg transition-transform duration-300 shrink-0" :style="{ color: 'var(--text-muted)', transform: open[i] ? 'rotate(180deg)' : 'rotate(0deg)' }">&#9662;</span>
        </button>
        <div class="overflow-hidden transition-all duration-300 px-5" :style="{ maxHeight: open[i] ? '300px' : '0px', paddingBottom: open[i] ? '20px' : '0px' }">
          <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-muted)' }">
            {{ t(rule.kmDesc, rule.enDesc) }}
          </p>
          <div class="mt-3 border rounded-lg px-3 py-2" :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)' }">
            <p class="text-xs font-medium" :style="{ color: rule.color }">
              {{ t(rule.kmTip, rule.enTip) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8">
      <router-link to="/track" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ តាមដានចំណាយ →', 'Next: Expense Tracker →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const open = reactive([true, false, false, false, false])

const toggle = (i) => { open[i] = !open[i] }

const rules = [
  {
    icon: '&#8800;', color: '#10b981', bg: 'rgba(16,185,129,0.08)',
    kmTitle: '១. ភាគរយត្រឹមត្រូវ', enTitle: '1. RIGHT PERCENTAGE',
    kmSub: 'ដាក់ភាគរយដែលសមស្រប', enSub: 'Allocations that fit your business',
    kmDesc: 'ភាគរយមិនមែនជាអត្រានៃការកាត់ពន្ធទេ។ វាជាភាគរយនៃចំណូលសរុបដែលអ្នកដាក់ទៅគណនីនីមួយៗ។ ចាប់ផ្តើមតូច រួចបង្កើនបន្តិចម្តងៗ។',
    enDesc: 'Percentages are not tax deductions — they\'re how you split your revenue into the 4 accounts. Start small, then increase gradually every quarter.',
    kmTip: '💡 ចាប់ផ្តើមជាមួយ Profit 1% រួចបង្កើន 1% រៀងរាល់ត្រីមាស', enTip: '💡 Start with Profit 1% and increase 1% every quarter'
  },
  {
    icon: '&#10003;', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)',
    kmTitle: '២. ទម្លាប់ត្រឹមត្រូវ', enTitle: '2. RIGHT HABIT',
    kmSub: 'បំណែកចែក ២ ដងក្នុងខែ', enSub: 'Allocation twice a month',
    kmDesc: 'នៅថ្ងៃទី ១ និងថ្ងៃទី ១៥ នៃខែ — ធ្វើការបែងចែកចំណូលទៅគណនីទាំង ៤ ។ នេះបង្កើតទម្លាប់ដែលអ្នកមិនអាចភ្លេចបាន។',
    enDesc: 'On the 1st and 15th of each month — allocate revenue to the 4 accounts. This creates an unbreakable habit that ensures your profit is always taken first.',
    kmTip: '💡 កំណត់រំលឹកទូរស័ព្ទសម្រាប់ថ្ងៃទី ១ និង ១៥', enTip: '💡 Set phone reminders for the 1st and 15th'
  },
  {
    icon: '&#9200;', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',
    kmTitle: '៣. ចង្វាក់ត្រឹមត្រូវ', enTitle: '3. RIGHT RHYTHM',
    kmSub: 'ប្រើប្រាស់គណនីដូចជា "អាងស្តុក"', enSub: 'Use accounts like a "reservoir"',
    kmDesc: 'គណនី Profit និង Tax — ទុកដូចជាអាងស្តុកទឹក។ កុំប្រើវារហូត។ ទុកវាដូចជាលុយសម្រាប់ពេលអាសន្ន ឬពេលដែលអ្នកពិតជាត្រូវការ។',
    enDesc: 'Profit and Tax accounts are reservoirs — don\'t drain them. Save them for emergencies or year-end bonuses. The more you resist touching them, the more they grow.',
    kmTip: '💡 កុំប៉ះគណនី Profit រហូតដល់ចុងឆ្នាំ', enTip: '💡 Don\'t touch the Profit account until year-end'
  },
  {
    icon: '&#9670;', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)',
    kmTitle: '៤. គណនីត្រឹមត្រូវ', enTitle: '4. RIGHT ACCOUNT',
    kmSub: 'ប្រើធនាគារផ្សេងគ្នា', enSub: 'Use different banks',
    kmDesc: 'បើកគណនីនីមួយៗនៅធនាគារផ្សេងគ្នា។ ប្រសិនបើធនាគារនៅជិតគ្នាអស់ — ប្រើធនាគារអនឡាញផ្សេង។ គោលបំណងគឺធ្វើឱ្យការដកលុយពីគណនី Profit ពិបាកបន្តិច។',
    enDesc: 'Open each account at a different bank. If nearby banks are all used — try online banks. The goal is to make withdrawing from Profit account slightly inconvenient.',
    kmTip: '💡 ប្រើធនាគារអនឡាញដែលមាន fee សម្រាប់ការដកប្រាក់', enTip: '💡 Use an online bank with withdrawal fees for Profit'
  },
  {
    icon: '&#10004;', color: '#ef4444', bg: 'rgba(239,68,68,0.08)',
    kmTitle: '៥. ការបញ្ចូលត្រឹមត្រូវ', enTitle: '5. RIGHT INJECTION',
    kmSub: 'បន្ថែមចំណូលពីក្រៅ', enSub: 'Inject revenue from outside',
    kmDesc: 'ប្រសិនបើ Operating មិនគ្រប់គ្រាន់ — កុំយកពី Profit ។ វិធីសាស្រ្ត៖ កាត់បន្ថយចំណាយ ឬរកចំណូលបន្ថែម។ នេះជាគន្លឹះនៃ Profit First។',
    enDesc: 'If Operating expenses aren\'t enough — never steal from Profit. Instead: cut costs or find additional revenue. This is the heart of Profit First: force yourself to be resourceful.',
    kmTip: '💡 កុំព្រងព្រៀងថាចំណាយគ្រប់ — រកវិធីកាត់បន្ថយ', enTip: '💡 Don\'t assume expenses are fixed — find ways to cut them'
  },
]
</script>
