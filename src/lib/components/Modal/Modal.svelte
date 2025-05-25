<!-- Reusable Modal Component with multiple variants -->
<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';

	// TypeScript types
	type ModalVariant = 'standard' | 'fullscreen' | 'slide' | 'centered' | 'minimal' | 'glass' | 'modern' | 'neon' | 'floating';
	type ModalAnimation = 'fade' | 'fly' | 'scale' | 'slide' | 'bounce' | 'zoom';
	type ModalPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';
	type ModalRounded = 'sm' | 'md' | 'lg' | 'xl' | 'full';
	type ModalShadow = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';

	// Props with TypeScript types
	export let open: boolean = false;
	export let variant: ModalVariant = 'standard';
	export let title: string = '';
	export let closeButton: boolean = true;
	export let closeOnEsc: boolean = true;
	export let closeOnClickOutside: boolean = true;
	export let animation: ModalAnimation = 'fade';
	export let duration: number = 300;
	export let width: string = 'max-w-lg';
	export let height: string = '';
	export let position: ModalPosition = 'center';
	export let backdrop: boolean = true;
	export let backdropBlur: boolean = false;
	export let zIndex: string = 'z-50';
	export let rounded: ModalRounded = 'lg';
	export let shadow: ModalShadow = 'xl';

	// Internal state
	let modalElement: HTMLElement;
	let animationProps: any = {};

	// Event dispatcher
	const dispatch = createEventDispatcher();

	// Close modal function
	function close(): void {
		open = false;
		dispatch('close');
	}

	// Handle keydown events for escape key
	function handleKeydown(event: KeyboardEvent): void {
		if (open && closeOnEsc && event.key === 'Escape') {
			close();
		}
	}

	// Handle clicks outside the modal
	function handleOutsideClick(event: MouseEvent): void {
		if (closeOnClickOutside && modalElement && !modalElement.contains(event.target as Node)) {
			close();
		}
	}

	// Handle keyboard events on backdrop
	function handleBackdropKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (closeOnClickOutside) {
				close();
			}
		}
	}

	// Add event listeners
	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
	// Set animation properties based on selected animation and position
	$: {
		if (animation === 'fade') {
			animationProps = { duration };
		} else if (animation === 'scale') {
			animationProps = { duration, start: 0.8 };
		} else if (animation === 'bounce') {
			animationProps = { duration, start: 0.5 };
		} else if (animation === 'zoom') {
			animationProps = { duration, start: 1.1 };
		} else if (animation === 'fly') {
			const y = position === 'top' ? -50 : position === 'bottom' ? 50 : 0;
			const x = position === 'left' ? -50 : position === 'right' ? 50 : 0;
			animationProps = { duration, y, x };
		} else if (animation === 'slide') {
			animationProps = { duration };
		}
	}

	// Position classes
	$: positionClass =
		position === 'top'
			? 'items-start pt-20'
			: position === 'bottom'
				? 'items-end pb-20'
				: position === 'left'
					? 'items-center justify-start pl-20'
					: position === 'right'
						? 'items-center justify-end pr-20'
						: 'items-center justify-center'; // default center

	// Variant specific classes
	$: variantClass =
		variant === 'standard'
			? `bg-white dark:bg-gray-800 rounded-${rounded} shadow-${shadow}`
			: variant === 'minimal'
				? `bg-white dark:bg-gray-800 rounded-${rounded} shadow-${shadow} border border-gray-200 dark:border-gray-700`
				: variant === 'fullscreen'
					? 'bg-white dark:bg-gray-800 w-screen h-screen max-w-none'
					: variant === 'glass'
						? `backdrop-blur-lg bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-800/30 rounded-${rounded} shadow-${shadow}`
						: variant === 'modern'
							? `bg-white dark:bg-gray-800 rounded-${rounded} shadow-2xl border border-gray-100 dark:border-gray-700`
							: variant === 'neon'
								? `bg-gray-900 border-2 border-cyan-400 rounded-${rounded} shadow-lg shadow-cyan-400/25`
								: variant === 'floating'
									? `bg-white dark:bg-gray-800 rounded-${rounded} shadow-2xl transform hover:scale-105 transition-transform`
									: `bg-white dark:bg-gray-800 rounded-${rounded} shadow-${shadow}`; // default
</script>

{#if open}
	<!-- Modal backdrop -->
	{#if backdrop}
		<button
			type="button"
			class="fixed inset-0 {zIndex} {backdropBlur ? 'backdrop-blur-sm' : ''} p-0 border-0 cursor-default"
			transition:fade={{ duration: duration / 2 }}
			aria-label="Close modal"
			on:click={handleOutsideClick}
			on:keydown={handleBackdropKeydown}
		>
			<div class="absolute inset-0 bg-black opacity-50"></div>
		</button>
	{/if}

	<!-- Modal container -->
	<div
		class="fixed inset-0 overflow-y-auto {zIndex} flex {positionClass} p-4"
		class:pointer-events-none={!backdrop}
	>
		<!-- Modal content -->
		<div
			bind:this={modalElement}
			class="pointer-events-auto {width} {height} {variantClass} overflow-hidden flex flex-col"
			class:w-screen={variant === 'fullscreen'}
			class:h-screen={variant === 'fullscreen'}
			class:max-w-none={variant === 'fullscreen'}
			class:h-auto={!height && variant !== 'fullscreen'}
			role="dialog"
			aria-modal="true"
			aria-labelledby={title ? 'modal-title' : undefined}
		>
			{#if animation === 'fade'}
				<div transition:fade={animationProps} class="w-full h-full flex flex-col">
					<slot name="modal-content">
						<!-- Modal header -->
						{#if title || closeButton}
							<div
								class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"
							>
								{#if title}
									<h3 class="text-lg font-semibold">{title}</h3>
								{:else}
									<div></div>
								{/if}

								{#if closeButton}
									<button
										type="button"
										class="text-gray-400 hover:text-gray-500 focus:outline-none"
										on:click={close}
										aria-label="Close"
									>
										<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								{/if}
							</div>
						{/if}

						<!-- Modal body -->
						<div class="relative flex-1 px-6 py-4 overflow-y-auto">
							<slot></slot>
						</div>

						<!-- Modal footer -->
						<slot name="footer">
							{#if $$slots.footer}
								<div
									class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
								>
									<slot name="footer"></slot>
								</div>
							{/if}
						</slot>
					</slot>
				</div>
			{:else if animation === 'scale'}
				<div transition:scale={animationProps} class="w-full h-full flex flex-col">
					<slot name="modal-content">
						<!-- Modal header -->
						{#if title || closeButton}
							<div
								class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"
							>
								{#if title}
									<h3 class="text-lg font-semibold">{title}</h3>
								{:else}
									<div></div>
								{/if}

								{#if closeButton}
									<button
										type="button"
										class="text-gray-400 hover:text-gray-500 focus:outline-none"
										on:click={close}
										aria-label="Close"
									>
										<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								{/if}
							</div>
						{/if}

						<!-- Modal body -->
						<div class="relative flex-1 px-6 py-4 overflow-y-auto">
							<slot></slot>
						</div>

						<!-- Modal footer -->
						<slot name="footer">
							{#if $$slots.footer}
								<div
									class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
								>
									<slot name="footer"></slot>
								</div>
							{/if}
						</slot>
					</slot>
				</div>
			{:else if animation === 'fly'}
				<div transition:fly={animationProps} class="w-full h-full flex flex-col">
					<slot name="modal-content">
						<!-- Modal header -->
						{#if title || closeButton}
							<div
								class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"
							>
								{#if title}
									<h3 class="text-lg font-semibold">{title}</h3>
								{:else}
									<div></div>
								{/if}

								{#if closeButton}
									<button
										type="button"
										class="text-gray-400 hover:text-gray-500 focus:outline-none"
										on:click={close}
										aria-label="Close"
									>
										<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								{/if}
							</div>
						{/if}

						<!-- Modal body -->
						<div class="relative flex-1 px-6 py-4 overflow-y-auto">
							<slot></slot>
						</div>

						<!-- Modal footer -->
						<slot name="footer">
							{#if $$slots.footer}
								<div
									class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
								>
									<slot name="footer"></slot>
								</div>
							{/if}
						</slot>
					</slot>
				</div>
			{:else if animation === 'slide'}
				<div transition:slide={animationProps} class="w-full h-full flex flex-col">
					<slot name="modal-content">
						<!-- Modal header -->
						{#if title || closeButton}
							<div
								class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"
							>
								{#if title}
									<h3 class="text-lg font-semibold">{title}</h3>
								{:else}
									<div></div>
								{/if}

								{#if closeButton}
									<button
										type="button"
										class="text-gray-400 hover:text-gray-500 focus:outline-none"
										on:click={close}
										aria-label="Close"
									>
										<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								{/if}
							</div>
						{/if}

						<!-- Modal body -->
						<div class="relative flex-1 px-6 py-4 overflow-y-auto">
							<slot></slot>
						</div>

						<!-- Modal footer -->
						<slot name="footer">
							{#if $$slots.footer}
								<div
									class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
								>
									<slot name="footer"></slot>
								</div>
							{/if}
						</slot>
					</slot>
				</div>
			{/if}
		</div>
	</div>
{/if}
