<script>
import Icon from '../components/base/Icon';
import MTable from '../components/base/Table';
import { routes } from '../router';
import { getUserScores } from '../services/user';

export default {
  components: {
    Icon,
    MTable,
  },
  data() {
    return {
      headers: ['Time', 'Result'],
      results: [],
      routes,
    }
  },
  inject: ['user'],
  methods: {
    iconName(win) { return win ? 'heart' : 'heart-broken' },
  },
  async mounted() { this.results = await getUserScores(this.user.id) },
}
</script>
<template>
  <div class="container">
    <h4 class="has-text-centered is-size-4 mb-4">{{ user.name }}'s results</h4>
    <div class="columns is-centered">
      <div class="column is-narrow">
        <m-table>
          <template #thead>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </template>
          <template #tbody>
            <template v-if="results">
              <tr v-for="(row, i) in results" :key="i" class="has-text-centered">
                <td>{{ row.time }}</td>
                <td>
                  <icon :name="iconName(row.win)" size="medium" class="has-text-danger" />
                </td>
              </tr>
            </template>
            <tr v-else class="has-text-centered">
              <td colspan="2">
                <p>You haven't played any game yet</p>
                <router-link v-slot="{ href, navigate }" custom :to="routes[0].path">
                  <a :href="href" class="button is-primary mt-3" @click="navigate">Play now</a>
                </router-link>
              </td>
            </tr>
          </template>
        </m-table>
      </div>
    </div>
  </div>
</template>