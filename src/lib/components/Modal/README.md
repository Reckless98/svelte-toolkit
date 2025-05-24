# Modal Component

A flexible modal dialog component with multiple variants, animations, and positioning options.

## Features

- **Multiple Variants**: Standard, Fullscreen, Slide, Centered, Minimal, Glass
- **Animation Effects**: Fade, Fly, Scale, Slide transitions
- **Positioning**: Center, Top, Right, Bottom, Left
- **Backdrop Options**: Custom backdrop with blur effects
- **Accessibility**: Focus trapping, ESC key handling, ARIA attributes
- **Mobile Responsive**: Optimized for all screen sizes
- **Event Handling**: Comprehensive event system

## Basic Usage

```svelte
<script>
	import { Modal } from '$lib/components/Modal';

	let showModal = false;
</script>

<button on:click={() => (showModal = true)}>Open Modal</button>

<Modal bind:open={showModal} title="My Modal">
	<p>Modal content goes here</p>
</Modal>
```

## Props

| Prop                  | Type      | Default      | Description               |
| --------------------- | --------- | ------------ | ------------------------- |
| `open`                | `boolean` | `false`      | Controls modal visibility |
| `variant`             | `string`  | `'standard'` | Modal style variant       |
| `title`               | `string`  | `''`         | Modal title               |
| `closeButton`         | `boolean` | `true`       | Show close button         |
| `closeOnEsc`          | `boolean` | `true`       | Close on ESC key          |
| `closeOnClickOutside` | `boolean` | `true`       | Close on backdrop click   |
| `animation`           | `string`  | `'fade'`     | Animation type            |
| `duration`            | `number`  | `300`        | Animation duration        |
| `width`               | `string`  | `'max-w-lg'` | Modal width class         |
| `height`              | `string`  | `''`         | Modal height class        |
| `position`            | `string`  | `'center'`   | Modal position            |
| `backdrop`            | `boolean` | `true`       | Show backdrop             |
| `backdropBlur`        | `boolean` | `false`      | Blur backdrop             |
| `zIndex`              | `string`  | `'z-50'`     | Z-index class             |

## Variants

### Standard Modal

```svelte
<Modal bind:open={showStandard} variant="standard" title="Standard Modal">
	<p>Standard modal content</p>
</Modal>
```

### Fullscreen Modal

```svelte
<Modal bind:open={showFullscreen} variant="fullscreen" title="Fullscreen Modal">
	<p>Fullscreen modal content</p>
</Modal>
```

### Slide Modal

```svelte
<Modal bind:open={showSlide} variant="slide" title="Slide Modal">
	<p>Slide modal content</p>
</Modal>
```

### Centered Modal

```svelte
<Modal bind:open={showCentered} variant="centered" title="Centered Modal">
	<p>Centered modal content</p>
</Modal>
```

### Minimal Modal

```svelte
<Modal bind:open={showMinimal} variant="minimal">
	<p>Minimal modal without decorations</p>
</Modal>
```

### Glass Modal

```svelte
<Modal bind:open={showGlass} variant="glass" title="Glass Modal">
	<p>Glass effect modal</p>
</Modal>
```

## Animations

```svelte
<Modal animation="fade" bind:open={showModal}>Fade animation</Modal>
<Modal animation="fly" bind:open={showModal}>Fly animation</Modal>
<Modal animation="scale" bind:open={showModal}>Scale animation</Modal>
<Modal animation="slide" bind:open={showModal}>Slide animation</Modal>
```

## Positioning

```svelte
<Modal position="center" bind:open={showModal}>Center</Modal>
<Modal position="top" bind:open={showModal}>Top</Modal>
<Modal position="right" bind:open={showModal}>Right</Modal>
<Modal position="bottom" bind:open={showModal}>Bottom</Modal>
<Modal position="left" bind:open={showModal}>Left</Modal>
```

## Events

The Modal component dispatches the following events:

- `open`: Fired when the modal opens
- `close`: Fired when the modal closes
- `escape`: Fired when ESC key is pressed
- `backdropClick`: Fired when backdrop is clicked

```svelte
<Modal
	bind:open={showModal}
	on:open={handleOpen}
	on:close={handleClose}
	on:escape={handleEscape}
	on:backdropClick={handleBackdropClick}
>
	Modal content
</Modal>
```

## Custom Width and Height

```svelte
<Modal bind:open={showModal} width="max-w-4xl" height="h-96" title="Large Modal">
	Large modal content
</Modal>
```

## Backdrop Options

```svelte
<!-- With blur effect -->
<Modal bind:open={showModal} backdropBlur={true}>Content with blurred backdrop</Modal>

<!-- No backdrop -->
<Modal bind:open={showModal} backdrop={false}>Content without backdrop</Modal>
```

## Practical Examples

### Confirmation Dialog

```svelte
<script>
	let showConfirm = false;

	function handleConfirm() {
		// Handle confirmation
		showConfirm = false;
	}
</script>

<Modal bind:open={showConfirm} title="Confirm Action" width="max-w-sm" closeOnClickOutside={false}>
	<div class="text-center p-4">
		<p>Are you sure you want to delete this item?</p>
		<div class="mt-4 space-x-2">
			<button on:click={() => (showConfirm = false)}>Cancel</button>
			<button on:click={handleConfirm}>Delete</button>
		</div>
	</div>
</Modal>
```

### Form Modal

```svelte
<script>
	let showForm = false;
	let formData = { name: '', email: '' };

	function handleSubmit() {
		// Handle form submission
		showForm = false;
	}
</script>

<Modal bind:open={showForm} title="Contact Form" width="max-w-md">
	<form on:submit|preventDefault={handleSubmit} class="p-4 space-y-4">
		<input bind:value={formData.name} placeholder="Your Name" required />
		<input type="email" bind:value={formData.email} placeholder="Your Email" required />
		<div class="flex justify-end space-x-2">
			<button type="button" on:click={() => (showForm = false)}> Cancel </button>
			<button type="submit">Submit</button>
		</div>
	</form>
</Modal>
```

### Image Gallery Modal

```svelte
<Modal bind:open={showGallery} variant="fullscreen" title="Image Gallery">
	<div class="grid grid-cols-3 gap-4 p-4">
		{#each images as image}
			<img src={image.src} alt={image.alt} class="rounded" />
		{/each}
	</div>
</Modal>
```

### Settings Modal

```svelte
<Modal bind:open={showSettings} title="Settings" width="max-w-2xl">
	<div class="p-4">
		<!-- Settings content -->
		<div class="space-y-4">
			<label class="flex items-center">
				<input type="checkbox" bind:checked={settings.notifications} />
				<span class="ml-2">Enable notifications</span>
			</label>

			<label class="flex items-center">
				<input type="checkbox" bind:checked={settings.darkMode} />
				<span class="ml-2">Dark mode</span>
			</label>
		</div>

		<div class="flex justify-end mt-6 space-x-2">
			<button on:click={() => (showSettings = false)}>Cancel</button>
			<button on:click={saveSettings}>Save</button>
		</div>
	</div>
</Modal>
```

## Accessibility

The Modal component includes:

- Focus trapping within the modal
- ESC key handling
- Proper ARIA attributes (`role="dialog"`, `aria-modal="true"`)
- Focus restoration when closed
- Screen reader announcements

## Advanced Usage

### Nested Modals

```svelte
<Modal bind:open={showFirst} title="First Modal">
	<p>First modal content</p>
	<button on:click={() => (showSecond = true)}>Open Second Modal</button>

	<Modal bind:open={showSecond} title="Second Modal" zIndex="z-60">
		<p>Second modal content</p>
	</Modal>
</Modal>
```

### Programmatic Control

```svelte
<script>
	import { Modal } from '$lib/components/Modal';

	let modalRef;

	function openModal() {
		modalRef.open();
	}

	function closeModal() {
		modalRef.close();
	}
</script>

<Modal bind:this={modalRef} title="Programmatic Modal">
	<p>Controlled programmatically</p>
</Modal>
```

## Customization

Override CSS custom properties:

```css
.modal {
	--modal-backdrop-color: rgba(0, 0, 0, 0.5);
	--modal-background: white;
	--modal-border-radius: 8px;
	--modal-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```
