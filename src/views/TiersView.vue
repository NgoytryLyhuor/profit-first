<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">REVENUE TIERS</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('ភាគរយតាមកម្រិតចំណូល', 'Percentages by Revenue') }}
      </h2>
      <p class="text-sm mt-2" :style="{ color: 'var(--text-muted)' }">
        {{ t('ភាគរយផ្សេងគ្នាសម្រាប់ទំហំក្រុមហ៊ុនខុសគ្នា', 'Different allocations based on your business size') }}
      </p>
    </div>

    <!-- Tier Table -->
    <div class="border rounded-xl overflow-hidden mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b" :style="{ borderColor: 'var(--border-main)' }">
              <th class="text-left px-4 py-3 text-[10px] uppercase tracking-widest font-medium" :style="{ color: 'var(--text-label)' }">
                {{ t('កម្រិតចំណូល', 'Revenue') }}
              </th>
              <th class="px-4 py-3 text-[10px] uppercase tracking-widest font-medium" :style="{ color: '#10b981' }">
                {{ t('ចំណេញ', 'Profit') }}
              </th>
              <th class="px-4 py-3 text-[10px] uppercase tracking-widest font-medium" :style="{ color: '#3b82f6' }">
                {{ t('ខ្លួនឯង', 'Owner') }}
              </th>
              <th class="px-4 py-3 text-[10px] uppercase tracking-widest font-medium" :style="{ color: '#f59e0b' }">
                {{ t('ពន្ធ', 'Tax') }}
              </th>
              <th class="px-4 py-3 text-[10px] uppercase tracking-widest font-medium" :style="{ color: '#94a3b8' }">
                {{ t('ប្រតិបត្តិការ', 'Operating') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tier, i) in tiers" :key="i"
              class="border-b transition"
              :style="{ borderColor: 'var(--border-main)', background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-hover)' }">
              <td class="px-4 py-3 font-bold" :style="{ color: 'var(--text-heading)' }">{{ tier.revenue }}</td>
              <td class="px-4 py-3 text-center font-bold" :style="{ color: '#10b981' }">{{ tier.profit }}%</td>
              <td class="px-4 py-3 text-center font-bold" :style="{ color: '#3b82f6' }">{{ tier.owner }}%</td>
              <td class="px-4 py-3 text-center font-bold" :style="{ color: '#f59e0b' }">{{ tier.tax }}%</td>
              <td class="px-4 py-3 text-center" :style="{ color: '#94a3b8' }">{{ tier.opex }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Visual Bars -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-5" :style="{ color: 'var(--text-label)' }">
        {{ t('ការប្រៀបធៀបការបែងចែក', 'ALLOCATION COMPARISON') }}
      </p>
      <div class="space-y-4">
        <div v-for="tier in tiers" :key="tier.revenue">
          <p class="text-xs font-bold mb-1" :style="{ color: 'var(--text-heading)' }">{{ tier.revenue }}</p>
          <div class="flex h-5 rounded-full overflow-hidden">
            <div class="rounded-l-full" :style="{ width: tier.profit + '%', background: '#10b981' }"></div>
            <div :style="{ width: tier.owner + '%', background: '#3b82f6' }"></div>
            <div :style="{ width: tier.tax + '%', background: '#f59e0b' }"></div>
            <div class="rounded-r-full" :style="{ width: tier.opex + '%', background: '#94a3b8' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Insight -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--accent-light)', borderColor: 'var(--accent)' }">
      <p class="text-sm font-bold mb-2" :style="{ color: 'var(--accent)' }">
        {{ t('💡 គន្លឹះសំខាន់', 'KEY INSIGHT') }}
      </p>
      <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-body)' }">
        {{ t('កាន់តែចំណូលខ្ពស់ កាន់តែប្រាក់ចំណេញច្រើន និង Operating តិច។ នេះជាអត្ថប្រយោជន៍នៃការរីកចម្រើន — ក្រុមហ៊ុនរីកធំ តែចំណាយស្មើភាគ។', 'Higher revenue = more profit and less operating %. This is the benefit of growth — bigger business, same efficiency.') }}
      </p>
    </div>

    <div class="flex justify-end">
      <router-link to="/rules" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ គោលការណ៍ ៥ →', 'Next: 5 Components →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const tiers = [
  { revenue: '$0 – $250K', profit: 5, owner: 50, tax: 15, opex: 30 },
  { revenue: '$250K – $1M', profit: 10, owner: 35, tax: 15, opex: 40 },
  { revenue: '$1M – $5M', profit: 15, owner: 20, tax: 15, opex: 50 },
  { revenue: '$5M – $10M', profit: 10, owner: 15, tax: 15, opex: 60 },
  { revenue: '$10M – $25M', profit: 15, owner: 10, tax: 15, opex: 60 },
]
</script>
