<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">BOOK NOTES</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('សេចក្តីសង្ខេបសៀវភៅ', 'Complete Book Notes') }}
      </h2>
      <p class="text-sm mt-2" :style="{ color: 'var(--text-muted)' }">
        {{ t('រាល់គន្លឹ់សំខាន់ៗពីសៀវភៅ Profit First របស់ Mike Michalowicz', 'Every key insight from Mike Michalowicz\'s Profit First') }}
      </p>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('មាតិកា', 'TABLE OF CONTENTS') }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
        <button v-for="(sec, i) in sections" :key="i" @click="scrollTo(i)"
          class="text-left text-sm py-1.5 px-2 rounded transition cursor-pointer hover:opacity-80"
          :style="{ color: 'var(--accent)' }">
          {{ i + 1 }}. {{ t(sec.kmTitle, sec.enTitle) }}
        </button>
      </div>
    </div>

    <!-- SECTIONS -->
    <div v-for="(sec, i) in sections" :key="i" :ref="el => sectionRefs[i] = el" class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
          :style="{ background: 'var(--accent-light)', color: 'var(--accent)' }">{{ i + 1 }}</div>
        <h3 class="text-xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
          {{ t(sec.kmTitle, sec.enTitle) }}
        </h3>
      </div>

      <!-- Main idea -->
      <div class="border-l-4 pl-4 mb-4" :style="{ borderColor: 'var(--accent)' }">
        <p class="text-sm leading-relaxed italic" :style="{ color: 'var(--text-body)' }">
          "{{ t(sec.kmQuote, sec.enQuote) }}"
        </p>
      </div>

      <!-- Content -->
      <div class="border rounded-xl p-5 mb-4" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-sm leading-relaxed mb-4" :style="{ color: 'var(--text-body)' }">
          {{ t(sec.kmBody, sec.enBody) }}
        </p>

        <!-- Sub points -->
        <div v-if="sec.points" class="space-y-3">
          <div v-for="(pt, j) in sec.points" :key="j" class="flex items-start gap-2">
            <span class="mt-0.5 shrink-0" :style="{ color: 'var(--accent)' }">&#10003;</span>
            <p class="text-sm" :style="{ color: 'var(--text-muted)' }">{{ t(pt.km, pt.en) }}</p>
          </div>
        </div>

        <!-- Example -->
        <div v-if="sec.example" class="mt-4 border rounded-lg px-4 py-3" :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)' }">
          <p class="text-[10px] uppercase tracking-widest font-bold mb-1" :style="{ color: 'var(--accent)' }">
            {{ t('ឧទាហរណ៍ពិត', 'REAL EXAMPLE') }}
          </p>
          <p class="text-sm" :style="{ color: 'var(--text-body)' }">{{ t(sec.example.km, sec.example.en) }}</p>
        </div>

        <!-- Case study -->
        <div v-if="sec.caseStudy" class="mt-4 border-2 rounded-lg px-4 py-3" :style="{ borderColor: 'var(--blue)', background: 'rgba(59,130,246,0.04)' }">
          <p class="text-[10px] uppercase tracking-widest font-bold mb-1" :style="{ color: 'var(--blue)' }">
            {{ t('ករណីសិក្សា', 'CASE STUDY') }}
          </p>
          <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-body)' }">{{ t(sec.caseStudy.km, sec.caseStudy.en) }}</p>
        </div>

        <!-- Warning -->
        <div v-if="sec.warning" class="mt-4 border-2 border-dashed rounded-lg px-4 py-3" :style="{ borderColor: 'var(--red)' }">
          <p class="text-[10px] uppercase tracking-widest font-bold mb-1" :style="{ color: 'var(--red)' }">
            {{ t('កំហុសដែលគេធ្វើញឹកញាប់', 'COMMON MISTAKE') }}
          </p>
          <p class="text-sm" :style="{ color: 'var(--text-body)' }">{{ t(sec.warning.km, sec.warning.en) }}</p>
        </div>
      </div>
    </div>

    <!-- QUOTES SECTION -->
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
          :style="{ background: 'var(--accent-light)', color: 'var(--accent)' }">"</div>
        <h3 class="text-xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
          {{ t('ពាក្យសម្តីគន្លឹះ', 'Key Quotes') }}
        </h3>
      </div>
      <div class="space-y-3">
        <div v-for="(q, i) in quotes" :key="i" class="border-l-4 pl-4 py-2" :style="{ borderColor: 'var(--accent)' }">
          <p class="text-sm italic leading-relaxed" :style="{ color: 'var(--text-body)' }">"{{ t(q.km, q.en) }}"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const sectionRefs = ref([])

const scrollTo = (i) => {
  sectionRefs.value[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const sections = [
  {
    kmTitle: 'បញ្ហា៖ អាជីវកម្មខាតប្រាក់',
    enTitle: 'The Problem: Businesses Are Dying',
    kmQuote: '៩៥% នៃអាជីវកម្មតូច និងមធ្យម មិនមានប្រាក់ចំណេញទេ។',
    enQuote: '95% of small and medium businesses are not profitable.',
    kmBody: 'Mike Michalowicz បានសិក្សាអាជីវកម្មជាច្រើន ហើយរកឃើញថា អាជីវកម្មភាគច្រើន "ខាត" ប្រាក់ — សូម្បីតែអ្នកដែលមានចំណូលច្រើន។ បញ្ហាមិនមែនជាចំណូលទេ។ បញ្ហាគឺរបៀបដែលយើង "គ្រប់គ្រង" លុយ។ យើងតែងតែដាក់ "ចំណូល ដំបូង រួចចំណាយ រួចមើលថានៅសល់អី" — ហើយគ្មានអ្វីនៅសល់ទេ។',
    enBody: 'Mike Michalowicz studied thousands of businesses and found that most "fail" financially — even those with high revenue. The problem isn\'t revenue. It\'s how we "manage" money. We always put "revenue first, spend, then see what\'s left" — and nothing is ever left.',
    points: [
      { km: '៨៣% នៃអាជីវកម្មអាមេរិក "ខាត" លុយ — មិនមែនដោយសារចំណូលទេ ដោយសាររបៀបគ្រប់គ្រង', en: '83% of American businesses "lose" money — not because of revenue, but because of management' },
      { km: 'អាជីវកម្មដែលមានចំណូល $25 លាន អាចខាតប្រាក់ ចំណែកអ្នកលក់ផ្កាអាចរកប្រាក់បាន', en: 'A $25M business can lose money while a flower seller can be profitable' },
      { km: 'បញ្ហាគឺ "ច្បាប់ Parkinson របស់អាជីវកម្ម" — ចំណាយកើនឡើងតាមចំណូល', en: 'The problem is "business Parkinson\'s Law" — expenses grow to match revenue' },
    ],
    example: {
      km: 'អ្នកលក់ផ្កា Mary មានចំណូល $300,000/ឆ្នាំ តែរកប្រាក់បានច្រើនជាង CEO ក្រុមហ៊ុនដែលមានចំណូល $25 លាន។ ហេតុអី? Mary ប្រើរូបមន្ត Profit First។',
      en: 'Flower seller Mary has $300K/yr revenue but makes more profit than a $25M company CEO. Why? Mary uses Profit First.'
    },
  },
  {
    kmTitle: 'ច្បាប់ Parkinson សម្រាប់លុយ',
    enTitle: 'Parkinson\'s Law Applied to Money',
    kmQuote: 'ចំណាយកើនឡើងរហូតទាល់តែចំណូលអស់។',
    enQuote: 'Expenses rise to consume all available revenue.',
    kmBody: 'ច្បាប់ Parkinson ដើមឡើយនិយាយថា "កិច្ចការកើនឡើងរហូតទាល់តែពេលវេលាអស់"។ Mike បកស្រាយថា លុយដែលមាននៅក្នុងគណនីក៏ដូចគ្នាដែរ — យើងចំណាយវារហូតទាល់តែអស់។ ប្រសិនបើអ្នកមាន $10,000 ក្នុងគណនី អ្នកនឹងរកវិធីចំណាយ $10,000។ ប្រសិនបើអ្នកមាន $100,000 អ្នកនឹងរកវិធីចំណាយ $100,000។',
    enBody: 'Parkinson\'s Law originally states that "work expands to fill available time." Mike applies it to money — the money in your account expands to consume everything. If you have $10,000 in your account, you\'ll find ways to spend $10,000. If you have $100,000, you\'ll find ways to spend $100,000.',
    points: [
      { km: 'នៅពេលអ្នកមាន $1,000 ក្នុងគណនី — អ្នក "ត្រូវការ"ឧបករណ៍ថ្មី $950', en: 'When you have $1,000 in your account — you "need" a $950 new tool' },
      { km: 'នៅពេលអ្នកមាន $100 ក្នុងគណនី — អ្នករកវិធីធ្វើជាមួយ $100', en: 'When you have $100 in your account — you figure out how to work with $100' },
      { km: 'នេះជាមូលហេតុដែល Profit First ដាក់ប្រាក់ចំណេញ "ជាមុន" — ដើម្បីកាត់បន្ថយលុយដែលនៅសល់សម្រាប់ចំណាយ', en: 'This is why Profit First takes profit "first" — to reduce what\'s available for spending' },
    ],
    example: {
      km: 'Tom មានចំណូល $20,000/ខែ។ គាត់ "ត្រូវការ" Office ថ្មី $3,000/ខែ ព្រោះគាត់មានលុយគ្រប់។ ប្រសិនបើ Tom ដាក់ $1,000 ទៅ Profit Account មុន — គាត់នឹងឃើញថាគាត់អាចធ្វើការពីផ្ទះបាន ឬជួលកន្លែងតូចជាង។',
      en: 'Tom has $20K/mo revenue. He "needs" a $3K/mo office because he has the money. If Tom puts $1,000 to Profit first — he\'d realize he can work from home or rent a smaller space.'
    },
    warning: {
      km: 'កំហុស: គិតថាចំណាយទាំងអស់ "ចាំបាច់" — ព្រោះអ្នកមានលុយ។ Profit First បង្ខំអ្នកមើលថាអ្នកពិតជាត្រូវការអ្វី។',
      en: 'Mistake: Thinking all expenses are "necessary" — because you have the money. Profit First forces you to see what you actually need.'
    },
  },
  {
    kmTitle: 'រូបមន្ត Profit First',
    enTitle: 'The Profit First Formula',
    kmQuote: 'Revenue − Profit = Expenses (មិនមែន Revenue − Expenses = Profit)',
    enQuote: 'Revenue − Profit = Expenses (NOT Revenue − Expenses = Profit)',
    kmBody: 'រូបមន្តបែបបុរាណគឺ Revenue − Expenses = Profit ដែលមានន័យថា "យើងចំណាយអ្វីដែលនៅសល់" — ហើយគ្មានអ្វីនៅសល់ទេ។ Profit First បញ្ច្រាសរូបមន្ត៖ ដាក់ប្រាក់ចំណេញសិន រួចដំណើរការជាមួយអ្វីដែលនៅសល់។',
    enBody: 'The traditional formula is Revenue − Expenses = Profit, meaning "we spend what\'s left" — and nothing is left. Profit First flips it: take profit first, then operate on what\'s remaining.',
    points: [
      { km: 'ភាគរយដែលអ្នកកំណត់សម្រាប់ Profit គឺ "ចំណូលសរុប" មិនមែន "ប្រាក់ចំណេញសុទ្ធទេ"', en: 'Your Profit percentage is of "gross revenue," not "net profit"' },
      { km: 'ចាប់ផ្តើមតូច — សូម្បីតែ 1% — រួចបង្កើនរៀងរាល់ត្រីមាស', en: 'Start small — even 1% — and increase every quarter' },
      { km: 'ភាគរយចាប់ផ្តើម (Actual Allocation Percentages) សម្រាប់អាជីវកម្មថ្មី៖ Profit 5%, Owner Pay 50%, Tax 15%, Operating 30%', en: 'Starting percentages: Profit 5%, Owner Pay 50%, Tax 15%, Operating 30%' },
    ],
    example: {
      km: 'ចំណូល $10,000/ខែ → Profit: $500 (5%), Owner: $5,000 (50%), Tax: $1,500 (15%), Operating: $3,000 (30%)។ នៅចុងឆ្នាំ អ្នកមាន $6,000 ប្រាក់ចំណេញសុទ្ធ។',
      en: 'Revenue $10,000/mo → Profit: $500 (5%), Owner: $5,000 (50%), Tax: $1,500 (15%), Operating: $3,000 (30%). At year-end you have $6,000 pure profit.'
    },
  },
  {
    kmTitle: '៤ គណនីធនាគារ',
    enTitle: 'The 4 Bank Accounts',
    kmQuote: 'កុំប្រើគណនីតែមួយសម្រាប់អស់ — អ្នកនឹងចំណាយអស់។',
    enQuote: 'Don\'t use one account for everything — you\'ll spend everything.',
    kmBody: 'Mike ណែនាំបើកគណនី ៤ នៅធនាគារផ្សេងគ្នា។ ហេតុផ្សេងគ្នា? ព្រោះប្រសិនបើគណនីទាំងអស់នៅធនាគារតែមួយ — អ្នកនឹងដឹងថាលុយនៅ "ងាយស្រួលដក" ហើយនឹងប៉ះវា។ ធនាគារផ្សេងគ្នាធ្វើឱ្យការដកលុយពី Profit Account "ពិបាកបន្តិច"។',
    enBody: 'Mike recommends opening 4 accounts at different banks. Why different? Because if all accounts are at the same bank — you\'ll know the money is "easy to access" and you\'ll touch it. Different banks make withdrawing from Profit slightly inconvenient.',
    points: [
      { km: 'Profit Account — ទុកសម្រាប់ប្រាក់ចំណេញ មិនចំណាយរហូតដល់ចុងឆ្នាំ', en: 'Profit Account — keep for profit, don\'t spend until year-end' },
      { km: 'Owner\'s Pay Account — បើកប្រាក់ខែឱ្យខ្លួនឯងដូចជាបុគ្គលិក', en: 'Owner\'s Pay Account — pay yourself salary like an employee' },
      { km: 'Tax Account — ទុកលុយសម្រាប់បង់ពន្ធ ពេលដល់ពេលបង់ លុយរួចជាស្រេច', en: 'Tax Account — set aside for taxes, money ready when due' },
      { km: 'Operating Expenses — អ្វីដែលនៅសល់សម្រាប់ដំណើរការ', en: 'Operating Expenses — what\'s left for running the business' },
    ],
    example: {
      km: 'David មានគណនីធនាគារ ៤ នៅធនាគារ ៤ ផ្សេងគ្នា។ ពេលគាត់ "ត្រូវការ" លុយពី Profit Account — គាត់ត្រូវជិះឡានទៅធនាគារ ២០ នាទី។ គាត់តែងតែគិតថា "តើខ្ញុំពិតជាត្រូវការវាទេ?" — ហើយជារឿយៗ គាត់មិនត្រូវការទេ។',
      en: 'David has 4 accounts at 4 different banks. When he "needs" money from Profit — he has to drive 20 minutes. He always asks "do I really need this?" — and usually, he doesn\'t.'
    },
  },
  {
    kmTitle: 'ភាគរយត្រឹមត្រូវ',
    enTitle: 'The Right Percentages',
    kmQuote: 'ភាគរយមិនមែនជាអត្រានៃការកាត់ពន្ធទេ — វាជារបៀបដែលអ្នកបែងចែកចំណូល។',
    enQuote: 'Percentages aren\'t tax deductions — they\'re how you split revenue.',
    kmBody: 'ភាគរយនៃការបែងចែកផ្លាស់ប្តូរតាមទំហំអាជីវកម្ម។ អាជីវកម្មតូចមាន Operating តិច ព្រោះមានបុគ្គលិកតិច ជួលតិច។ អាជីវកម្មធំមាន Operating ច្រើន ព្រោះត្រូវការបុគ្គលិកច្រើន។',
    enBody: 'Allocation percentages change by business size. Small businesses have lower Operating because fewer employees, less rent. Larger businesses have higher Operating because more staff, more overhead.',
    points: [
      { km: '$0-250K: Profit 5%, Owner 50%, Tax 15%, Operating 30%', en: '$0-250K: Profit 5%, Owner 50%, Tax 15%, Operating 30%' },
      { km: '$250K-1M: Profit 10%, Owner 35%, Tax 15%, Operating 40%', en: '$250K-1M: Profit 10%, Owner 35%, Tax 15%, Operating 40%' },
      { km: '$1M-5M: Profit 15%, Owner 20%, Tax 15%, Operating 50%', en: '$1M-5M: Profit 15%, Owner 20%, Tax 15%, Operating 50%' },
      { km: '$5M-10M: Profit 10-15%, Owner 10-15%, Tax 15%, Operating 55-65%', en: '$5M-10M: Profit 10-15%, Owner 10-15%, Tax 15%, Operating 55-65%' },
    ],
    example: {
      km: 'អាជីវកម្ម $400K/ឆ្នាំ: Profit $40K (10%), Owner $140K (35%), Tax $60K (15%), Operating $160K (40%)។ ប្រៀបធៀបជាមួយអ្នកដែល "ចំណាយអស់" — ពួកគេគ្មាន $40K ប្រាក់ចំណេញទេ។',
      en: '$400K/yr business: Profit $40K (10%), Owner $140K (35%), Tax $60K (15%), Operating $160K (40%). Compare to someone who "spends everything" — they have $0 profit.'
    },
  },
  {
    kmTitle: 'ទម្លាប់៖ បំណែកចែក ២ ដងក្នុងខែ',
    enTitle: 'The Habit: Allocate Twice a Month',
    kmQuote: 'នៅថ្ងៃទី ១ និងថ្ងៃទី ១៥ — ធ្វើការបែងចែក។ នេះគឺទម្លាប់ដែលមិនអាចបំបែកបាន។',
    enQuote: 'On the 1st and 15th — allocate. This is an unbreakable habit.',
    kmBody: 'Mike ណែនាំធ្វើការបំណែកចែកនៅថ្ងៃទី ១ និងថ្ងៃទី ១៥ នៃខែ។ នេះមិនមែនជាជម្រើសទេ — វាជាច្បាប់។ នៅពេលអ្នកមានទម្លាប់នេះ អ្នកនឹងមើលឃើញថាអ្នកអាចរស់បានជាមួយ Operating តិចជាងដែលអ្នកគិត។',
    enBody: 'Mike recommends allocating on the 1st and 15th of each month. This isn\'t optional — it\'s law. When you build this habit, you\'ll realize you can survive on less Operating than you thought.',
    points: [
      { km: 'កំណត់រំលឹកទូរស័ព្ទសម្រាប់ថ្ងៃទី ១ និង ១៥', en: 'Set phone reminders for the 1st and 15th' },
      { km: 'ធ្វើការបំណែកចែកមុនពេលបើកប្រាក់ខែបុគ្គលិក', en: 'Allocate before paying employee salaries' },
      { km: 'កុំខកថ្ងៃណាមួយ — នេះជាឈាមជីវិតនៃអាជីវកម្ម', en: 'Never miss a day — this is the lifeline of your business' },
    ],
  },
  {
    kmTitle: 'ទម្លាប់ចំណាយ (Business Parkinson\'s Law)',
    enTitle: 'Business Parkinson\'s Law',
    kmQuote: 'នៅពេលអ្នក "ត្រូវការ" លុយ — អ្នកនឹងរកវិធីរកលុយបាន។',
    enQuote: 'When you "need" money — you find a way to get it.',
    kmBody: 'Mike ពន្យល់ថា អាជីវកម្មដែល "ខាត" លុយ ជារឿយៗមានចំណូលច្រើន — តែចំណាយកើនតាមចំណូល។ នេះជា "ច្បាប់ Parkinson សម្រាប់អាជីវកម្ម"។ នៅពេលអ្នកមាន $50,000 ក្នុងគណនី — អ្នក "ត្រូវការ" ឧបករណ៍ $45,000។ នៅពេលអ្នកមាន $500 — អ្នក "ត្រូវការ" អ្វីមួយក្នុងតម្លៃ $450។',
    enBody: 'Mike explains that money-losing businesses often have high revenue — but expenses grow to match. This is "Business Parkinson\'s Law." When you have $50,000 in your account — you "need" a $45,000 tool. When you have $500 — you "need" something for $450.',
    points: [
      { km: 'Profit First ប្រើច្បាប់ Parkinson ជា "វិធីសាស្រ្តដ៏មានប្រសិទ្ធភាព" — កាត់បន្ថយលុយដែលនៅសល់ ដើម្បីកាត់បន្ថយចំណាយ', en: 'Profit First uses Parkinson\'s Law as a "powerful weapon" — reduce available money to reduce spending' },
      { km: 'នៅពេល Operating Account តិច — អ្នកនឹងរកវិធីកាត់បន្ថយចំណាយដែលអ្នកមិនដែលគិតថាអាចកាត់បន្ថយបាន', en: 'When Operating is less — you find cuts you never thought possible' },
      { km: 'នេះជាមូលហេតុដែល Profit Account ត្រូវនៅធនាគារផ្សេង — ដើម្បីធ្វើឱ្យការដកលុយពិបាក', en: 'This is why Profit must be at a different bank — to make access inconvenient' },
    ],
  },
  {
    kmTitle: 'ការបញ្ចូល (Right Injection)',
    enTitle: 'The Right Injection',
    kmQuote: 'ប្រសិនបើ Operating មិនគ្រប់គ្រាន់ — កុំយកពី Profit។ រកវិធីផ្សេង។',
    enQuote: 'If Operating isn\'t enough — never steal from Profit. Find another way.',
    kmBody: 'នេះជាគន្លឹះដ៏សំខាន់បំផុតនៃ Profit First៖ នៅពេលអ្នកមានអារម្មណ៍ថាលុយមិនគ្រប់ — អ្នកមិនអាចយកពី Profit Account បានទេ។ ជំនួសមកវិញ អ្នកត្រូវ: (១) កាត់បន្ថយចំណាយ ឬ (២) រកចំណូលបន្ថែម។ នេះបង្ខំអ្នកឱ្យ "ច្នៃប្រឌិត" និង "ប្រើប្រាស់ធនធានឱ្យបានត្រឹមត្រូវ"។',
    enBody: 'This is the most critical point of Profit First: when you feel money is tight — you cannot touch Profit Account. Instead: (1) cut expenses or (2) find more revenue. This forces you to be "creative" and "resourceful."',
    points: [
      { km: 'នេះជាអ្វីដែលធ្វើឱ្យ Profit First ខុសគ្នាពី "គណនេយ្យបែបបុរាណ" — វាបង្ខំអ្នកឱ្យផ្លាស់ប្តូរ', en: 'This is what makes Profit First different from "traditional accounting" — it forces change' },
      { km: 'នៅពេល Operating Account អស់ — អ្នកនឹងរកឃើញវិធីកាត់បន្ថយចំណាយដែលអ្នកមិនដែលគិតថាអាចធ្វើបាន', en: 'When Operating runs out — you find cuts you never thought possible' },
      { km: 'នេះជាមូលហេតុដែលអាជីវកម្មដែលប្រើ Profit First ក្លាយជា "សន្សំសំចៃ" និង "ប្រើប្រាស់ធនធានបានល្អ"។', en: 'This is why Profit First businesses become "thrifty" and "resourceful"' },
    ],
    warning: {
      km: 'កំហុសធំបំផុត៖ គិតថា "ខ្ញុំនឹងយកពី Profit Account សិន ហើយនឹងដាក់ត្រឡប់មកវិញនៅខែក្រោយ" — អ្នកនឹងមិនដែលដាក់ត្រឡប់មកវិញទេ។',
      en: 'Biggest mistake: thinking "I\'ll borrow from Profit and put it back next month" — you never will.'
    },
  },
  {
    kmTitle: 'របៀបចាប់ផ្តើមនៅពេលអ្នកក្រោយ',
    enTitle: 'How to Start When You\'re Behind',
    kmQuote: 'ប្រសិនបើអ្នក "ខាត" លុយ — ចាប់ផ្តើមជាមួយ Profit 1%។',
    enQuote: 'If you\'re "losing" money — start with Profit at just 1%.',
    kmBody: 'Mike ពន្យល់ថា ប្រសិនបើអ្នកមានអាជីវកម្មដែល "ខាត" លុយ — អ្នកមិនអាចចាប់ផ្តើមជាមួយ Profit 5% បានទេ។ ចាប់ផ្តើមជាមួយ 1% សិន។ នៅពេលអ្នក "ដាក់ 1% ទៅ Profit" អ្នកនឹង "បាត់បង់" 1% ពី Operating — ហើយអ្នកនឹងរកវិធីរស់បានជាមួយ 99%។ បន្ទាប់មកបង្កើនទៅ 2%, 3%, និង 5%។',
    enBody: 'Mike explains that if you\'re "losing" money — you can\'t start at Profit 5%. Start at 1%. When you "put 1% to Profit" you "lose" 1% from Operating — and you\'ll figure out how to live on 99%. Then increase to 2%, 3%, and 5%.',
    points: [
      { km: 'ចាប់ផ្តើមជាមួយ Profit 1% — បង្កើន 1% រៀងរាល់ត្រីមាស', en: 'Start with Profit 1% — increase 1% every quarter' },
      { km: 'នៅពេលអ្នកដល់ 15-20% — អ្នកជា "អាជីវកម្មដែលមានប្រាក់ចំណេញ"។', en: 'When you reach 15-20% — you\'re a "profitable business"' },
      { km: 'កុំខកថ្ងៃបំណែកចែក — ទោះបីជាអ្នក "ខាត" លុយក៏ដោយ។ នេះជាអ្វីដែលធ្វើឱ្យអ្នក "រស់"។', en: 'Never miss allocation day — even if you\'re "losing" money. This is what makes you "survive".' },
    ],
  },
  {
    kmTitle: 'ការបែងចែកប្រាក់ចំណេញ (Profit Distribution)',
    enTitle: 'Profit Distribution: The Reward',
    kmQuote: 'នៅចុងឆ្នាំ — បែងចែកប្រាក់ចំណេញជាប្រាក់រង្វាន់សម្រាប់ខ្លួនឯង។',
    enQuote: 'At year-end — distribute profit as a bonus to yourself.',
    kmBody: 'នៅចុងឆ្នាំ (ខែធ្នូ) អ្នក "បែងចែក" ប្រាក់ដែលនៅក្នុង Profit Account ជាប្រាក់រង្វាន់សម្រាប់ខ្លួនឯង។ នេះមិនមែនជាលុយ "សម្រាប់ចំណាយ" ទេ — វាជាលុយ "សម្រាប់រង្វាន់"។ Mike ណែនាំបែងចែក 50% ជាប្រាក់រង្វាន់ និង 50% ទុកក្នុង Profit Account (ឬបង្កើនភាគរយ)។',
    enBody: 'At year-end (December), "distribute" the money in your Profit Account as a bonus to yourself. This isn\'t "spending" money — it\'s "reward" money. Mike recommends 50% as bonus, 50% back into Profit (or increase your percentage).',
    points: [
      { km: 'បែងចែក 50% ជាប្រាក់រង្វាន់ 50% ទុកក្នុង Profit Account', en: 'Distribute 50% as bonus, 50% back into Profit' },
      { km: 'ប្រើប្រាស់ប្រាក់រង្វាន់សម្រាប់អ្វីដែលអ្នក "ចង់បាន" — មិនមែន "ត្រូវការ" ទេ', en: 'Use bonus for what you "want" — not what you "need"' },
      { km: 'នេះជារង្វាន់សម្រាប់ការដែលអ្នក "ដាក់ប្រាក់ចំណេញជាមុន" អស់រយៈពេល ១ ឆ្នាំ', en: 'This is the reward for taking profit first all year' },
    ],
  },
]

const quotes = [
  { km: 'ប្រាក់ចំណេញមិនមែនជារឿងមួយនោះទេ — វាជាទម្លាប់។', en: 'Profit is not an event — it is a habit.' },
  { km: 'លុយដែលអ្នកមិនឃើញ គឺជាលុយដែលអ្នកមិនចំណាយ។', en: 'The money you don\'t see is the money you don\'t spend.' },
  { km: 'អាជីវកម្មបរាជ័យព្រោះវាត្រូវបានបំប៉នច្រើនពេក មិនមែនតិចពេកទេ។', en: 'Businesses fail because they are overfed, not underfed.' },
  { km: 'នៅពេលអ្នកយកប្រាក់ចំណេញជាមុន លុយដែលនៅសល់មិនគ្រប់គ្រាន់សម្រាប់ចំណាយឥតប្រយោជន៍ — ដូច្នេះការចំណាយឥតប្រយោជន៍ក៏បាត់។', en: 'When you take profit first, the remaining money is not enough to fund waste — so waste goes away.' },
  { km: 'គោលបំណងមិនមែនស្លាប់ជាមួយលុយច្រើនបំផុតទេ — គោលបំណងគឺរស់នៅឱ្យបានល្អបំផុតក្នុងពេលរកលុយ។', en: 'The goal is not to die with the most money — the goal is to live the most while making money.' },
  { km: 'ប្រសិនបើអ្នករង់ចាំលុយ "បន្ថែម" ដើម្បីសន្សំ អ្នកនឹងរង់ចាំរហូត។', en: 'If you wait for "extra" money to save, you will wait forever.' },
]
</script>
