<script lang="ts">
	import toast from '@stores/toast';
	import type ToastPosition from '@/types/toast/toast_position';

	export let where: ToastPosition = 'top';

	toast.set(where);
</script>

<div
	id="toaster"
	data-where={where}
	class={`group fixed flex flex-col z-[10000] p-3 
            ${where.startsWith('bottom') ? 'flex-col-reverse space-y-reverse' : ''}
            ${where === 'top' ? 'top-0 left-1/2 -translate-x-1/2' : ''}
            ${where === 'bottom' ? 'bottom-0 left-1/2 -translate-x-1/2' : ''}
            ${where === 'right' ? 'right-0 top-1/2 -translate-y-1/2' : ''}
            ${where === 'left' ? 'left-0 top-1/2 -translate-y-1/2' : ''}
            ${where === 'top_right' ? 'top-0 right-0' : ''}
            ${where === 'top_left' ? 'top-0 left-0' : ''}
            ${where === 'bottom_right' ? 'bottom-0 right-0' : ''}
            ${where === 'bottom_left' ? 'bottom-0 left-0' : ''}`}
></div>
