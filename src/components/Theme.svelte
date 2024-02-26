<script lang="ts">
	import theme from '@stores/theme';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/{$theme}-theme.css" />
</svelte:head>

<div class="fixed left-0 bottom-0 z-10">
	<ThemeSwitcher class="w-7 h-7 !p-0 m-5 drop-shadow-3xl" />
</div>
