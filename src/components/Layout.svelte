<script lang="ts">
	import { page } from '$app/stores';
	import { center_layout, fullscreen_layout } from '@stores/layout';

	const center_routes: Array<string> = ['/(dashboard)/(close)/profile'];

	function changePageStyle(pageId: string | null) {
		if (center_routes.findIndex((v) => v === pageId) !== -1) center_layout();
		else fullscreen_layout();
	}

	$: changePageStyle($page.route?.id);
</script>
