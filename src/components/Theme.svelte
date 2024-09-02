<script lang="ts">
	import theme from '@stores/theme';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/{$theme}-theme.css" />
</svelte:head>
