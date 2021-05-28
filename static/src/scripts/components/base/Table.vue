<template>
  <table class="table is-bordered is-striped">
    <thead>
      <tr class="has-text-centered">
        <slot name="thead" />
      </tr>
    </thead>
    <tbody>
      <slot name="tbody" />
    </tbody>
  </table>
</template>

<style>
th, td {
  vertical-align: middle !important;
}
</style>