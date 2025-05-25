<!-- Modal Component Explorer -->
<script lang="ts">
	import { Modal } from '$lib/components/Modal';
	import { Button } from '$lib/components/Button';
	import ComponentPreview from '../ComponentPreview.svelte';

	type ModalVariant = 'standard' | 'fullscreen' | 'slide' | 'centered' | 'minimal' | 'glass' | 'modern' | 'neon' | 'floating';
	type ModalAnimation = 'fade' | 'fly' | 'scale' | 'slide' | 'bounce' | 'zoom';
	type ModalPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';
	type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | '3d' | 'gradient' | 'glass' | 'neon' | 'morphic' | 'animated' | 'outlined';

	// Modal variants
	const variants: { name: string; value: ModalVariant }[] = [
		{ name: 'Standard', value: 'standard' },
		{ name: 'Fullscreen', value: 'fullscreen' },
		{ name: 'Slide', value: 'slide' },
		{ name: 'Centered', value: 'centered' },
		{ name: 'Minimal', value: 'minimal' },
		{ name: 'Glass', value: 'glass' },
	];

	// Modal animations
	const animations: { name: string; value: ModalAnimation }[] = [
		{ name: 'Fade', value: 'fade' },
		{ name: 'Fly', value: 'fly' },
		{ name: 'Scale', value: 'scale' },
		{ name: 'Slide', value: 'slide' },
	];

	// Modal positions
	const positions: { name: string; value: ModalPosition }[] = [
		{ name: 'Center', value: 'center' },
		{ name: 'Top', value: 'top' },
		{ name: 'Right', value: 'right' },
		{ name: 'Bottom', value: 'bottom' },
		{ name: 'Left', value: 'left' },
	];

	// Modal state management
	let modalStates: Record<string, boolean> = {
		standard: false,
		fullscreen: false,
		slide: false,
		centered: false,
		minimal: false,
		glass: false,
		fadeAnimation: false,
		flyAnimation: false,
		scaleAnimation: false,
		slideAnimation: false,
		topPosition: false,
		rightPosition: false,
		bottomPosition: false,
		leftPosition: false,
		centerPosition: false,
		withForm: false,
		confirmation: false,
		gallery: false,
		settings: false,
	};

	// Sample form data
	let formData = {
		name: '',
		email: '',
		message: '',
	};

	// Function to open modal
	function openModal(type: string): void {
		modalStates[type] = true;
	}

	// Function to close modal
	function closeModal(type: string): void {
		modalStates[type] = false;
	}

	// Handle form submission
	function handleSubmit() {
		alert('Form submitted!');
		closeModal('withForm');
		formData = { name: '', email: '', message: '' };
	}

	// Handle confirmation
	function handleConfirm() {
		alert('Action confirmed!');
		closeModal('confirmation');
	}
</script>

<div class="space-y-8">
	<div>
		<h2 class="text-2xl font-bold mb-4">Modal Components</h2>
		<p class="text-gray-600 dark:text-gray-400 mb-6">
			Flexible modal dialogs with multiple variants, animations, and positioning options.
		</p>
	</div>

	<!-- Modal Variants Section -->
	<ComponentPreview title="Modal Variants">
		<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
			{#each variants as variant}
				<Button variant="secondary" on:click={() => openModal(variant.value)}>
					{variant.name} Modal
				</Button>

				<Modal
					bind:open={modalStates[variant.value]}
					variant={variant.value}
					title="{variant.name} Modal"
					on:close={() => closeModal(variant.value)}
				>
					<div class="p-4">
						<p class="text-gray-600 dark:text-gray-400 mb-4">
							This is a {variant.name.toLowerCase()} modal example. You can customize the content, styling,
							and behavior according to your needs.
						</p>
						<div class="flex justify-end space-x-2">
							<Button variant="ghost" on:click={() => closeModal(variant.value)}>Cancel</Button>
							<Button on:click={() => closeModal(variant.value)}>Confirm</Button>
						</div>
					</div>
				</Modal>
			{/each}
		</div>
	</ComponentPreview>

	<!-- Modal Animations Section -->
	<ComponentPreview title="Modal Animations">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			{#each animations as animation}
				<Button variant="secondary" on:click={() => openModal(animation.value + 'Animation')}>
					{animation.name} Animation
				</Button>

				<Modal
					bind:open={modalStates[animation.value + 'Animation']}
					animation={animation.value}
					title="{animation.name} Animation"
					on:close={() => closeModal(animation.value + 'Animation')}
				>
					<div class="p-4">
						<p class="text-gray-600 dark:text-gray-400 mb-4">
							This modal uses the {animation.name.toLowerCase()} animation effect.
						</p>
						<div class="flex justify-end">
							<Button on:click={() => closeModal(animation.value + 'Animation')}>Close</Button>
						</div>
					</div>
				</Modal>
			{/each}
		</div>
	</ComponentPreview>

	<!-- Modal Positions Section -->
	<ComponentPreview title="Modal Positions">
		<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
			{#each positions as position}
				<Button variant="secondary" on:click={() => openModal(position.value + 'Position')}>
					{position.name} Position
				</Button>

				<Modal
					bind:open={modalStates[position.value + 'Position']}
					position={position.value}
					title="{position.name} Positioned Modal"
					on:close={() => closeModal(position.value + 'Position')}
				>
					<div class="p-4">
						<p class="text-gray-600 dark:text-gray-400 mb-4">
							This modal is positioned at the {position.name.toLowerCase()} of the screen.
						</p>
						<div class="flex justify-end">
							<Button on:click={() => closeModal(position.value + 'Position')}>Close</Button>
						</div>
					</div>
				</Modal>
			{/each}
		</div>
	</ComponentPreview>

	<!-- Practical Examples Section -->
	<ComponentPreview title="Practical Examples">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<!-- Form Modal -->
			<Button variant="primary" on:click={() => openModal('withForm')}>Contact Form</Button>

			<!-- Confirmation Modal -->
			<Button variant="primary" on:click={() => openModal('confirmation')}>
				Confirmation Dialog
			</Button>

			<!-- Gallery Modal -->
			<Button variant="secondary" on:click={() => openModal('gallery')}>Image Gallery</Button>

			<!-- Settings Modal -->
			<Button variant="ghost" on:click={() => openModal('settings')}>Settings Panel</Button>
		</div>

		<!-- Contact Form Modal -->
		<Modal
			bind:open={modalStates.withForm}
			title="Contact Us"
			width="max-w-md"
			on:close={() => closeModal('withForm')}
		>
			<form on:submit|preventDefault={handleSubmit} class="p-4 space-y-4">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Full Name
					</label>
					<input
						id="name"
						type="text"
						bind:value={formData.name}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
						required
					/>
				</div>

				<div>
					<label
						for="email"
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>
						Email Address
					</label>
					<input
						id="email"
						type="email"
						bind:value={formData.email}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
						required
					/>
				</div>

				<div>
					<label
						for="message"
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>
						Message
					</label>
					<textarea
						id="message"
						bind:value={formData.message}
						rows="4"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
						required
					></textarea>
				</div>

				<div class="flex justify-end space-x-2 pt-4">
					<Button variant="ghost" on:click={() => closeModal('withForm')}>Cancel</Button>
					<Button type="submit">Send Message</Button>
				</div>
			</form>
		</Modal>

		<!-- Confirmation Modal -->
		<Modal
			bind:open={modalStates.confirmation}
			title="Confirm Action"
			width="max-w-sm"
			on:close={() => closeModal('confirmation')}
		>
			<div class="p-4 text-center">
				<div class="mb-4">
					<div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
						<svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
					</div>
				</div>
				<h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Delete Item</h3>
				<p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
					Are you sure you want to delete this item? This action cannot be undone.
				</p>
				<div class="flex justify-center space-x-2">
					<Button variant="ghost" on:click={() => closeModal('confirmation')}>Cancel</Button>
					<Button variant="primary" on:click={handleConfirm}>Delete</Button>
				</div>
			</div>
		</Modal>

		<!-- Gallery Modal -->
		<Modal
			bind:open={modalStates.gallery}
			title="Image Gallery"
			variant="fullscreen"
			on:close={() => closeModal('gallery')}
		>
			<div class="p-4">
				<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{#each Array(12) as _, i}
						<div
							class="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center"
						>
							<span class="text-gray-500 font-medium">Image {i + 1}</span>
						</div>
					{/each}
				</div>
			</div>
		</Modal>

		<!-- Settings Modal -->
		<Modal
			bind:open={modalStates.settings}
			title="Settings"
			width="max-w-lg"
			on:close={() => closeModal('settings')}
		>
			<div class="p-4 space-y-6">
				<div>
					<h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Preferences</h3>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<span class="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
							<button
								class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
							>
								<span
									class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"
								></span>
							</button>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm text-gray-700 dark:text-gray-300">Notifications</span>
							<button
								class="relative inline-flex h-6 w-11 items-center rounded-full bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
							>
								<span
									class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"
								></span>
							</button>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm text-gray-700 dark:text-gray-300">Auto-save</span>
							<button
								class="relative inline-flex h-6 w-11 items-center rounded-full bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
							>
								<span
									class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"
								></span>
							</button>
						</div>
					</div>
				</div>

				<div class="flex justify-end space-x-2 pt-4 border-t">
					<Button variant="ghost" on:click={() => closeModal('settings')}>Cancel</Button>
					<Button on:click={() => closeModal('settings')}>Save Changes</Button>
				</div>
			</div>
		</Modal>
	</ComponentPreview>

	<!-- Code Examples Section -->
	<ComponentPreview title="Code Examples">
		<div class="space-y-4">
			<div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
				<pre><code
						>{`<!-- Basic Modal -->
<Modal bind:open={showModal} title="Basic Modal">
  <p>Modal content goes here</p>
</Modal>

<!-- Modal with custom styling -->
<Modal
  bind:open={showModal}
  variant="glass"
  animation="scale"
  position="center"
  width="max-w-lg"
  title="Styled Modal"
  on:close={handleClose}
>
  <div class="p-4">
    <p>Custom modal content</p>
    <Button on:click={() => showModal = false}>Close</Button>
  </div>
</Modal>

<!-- Confirmation Dialog -->
<Modal
  bind:open={showConfirm}
  title="Confirm Action"
  width="max-w-sm"
  closeOnClickOutside={false}
>
  <div class="p-4 text-center">
    <p>Are you sure?</p>
    <div class="flex justify-center space-x-2 mt-4">
      <Button variant="ghost" on:click={cancel}>Cancel</Button>
      <Button on:click={confirm}>Confirm</Button>
    </div>
  </div>
</Modal>`}</code
					></pre>
			</div>
		</div>
	</ComponentPreview>
</div>
