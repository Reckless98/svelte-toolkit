<script lang="ts">
  import { Avatar } from '$lib/components/Avatar';
  import { Button } from '$lib/components/Button';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  const examples = [
    {
      title: 'Basic Usage',
      description: 'Simple avatar with user initials',
      code: `<Avatar name="John Doe" />`
    },
    {
      title: 'With Image',
      description: 'Avatar displaying user profile image',
      code: `<Avatar 
  name="Jane Smith" 
  src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
/>`
    },
    {
      title: 'With Status',
      description: 'Avatar showing online/offline status indicator',
      code: `<Avatar 
  name="Alex Johnson" 
  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  status="online"
/>`
    },
    {
      title: 'With Badge',
      description: 'Avatar with notification badge',
      code: `<Avatar 
  name="Sarah Wilson" 
  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  badge="3"
/>`
    },
    {
      title: 'Clickable',
      description: 'Interactive avatar with click handler',
      code: `<Avatar 
  name="Mike Brown" 
  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  clickable
  on:click={() => alert('Avatar clicked!')}
/>`
    },
    {
      title: 'Fallback Behavior',
      description: 'Avatar with broken image showing initials fallback',
      code: `<Avatar 
  name="David Clark" 
  src="https://broken-image-url.jpg"
/>`
    }
  ];

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const variants = ['circular', 'rounded', 'square'];
  const statuses = ['online', 'offline', 'away', 'busy'];

  const teamMembers = [
    {
      name: 'Emma Thompson',
      src: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      status: 'online'
    },
    {
      name: 'James Rodriguez',
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'away'
    },
    {
      name: 'Sophia Chen',
      src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'busy'
    },
    {
      name: 'Marcus Johnson',
      src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'offline'
    }
  ];

  function handleAvatarClick(name) {
    alert(`Clicked on ${name}'s avatar!`);
  }
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Avatar Component</h1>
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      A flexible avatar component that displays user profile images with intelligent fallback to initials, status indicators, badges, and interactive features.
    </p>
  </div>

  <!-- Basic Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Examples</h2>
    
    {#each examples as example, index}
      <ComponentPreview
        title={example.title}
        description={example.description}
        code={example.code}
      >
        <div slot="preview" class="p-8 flex justify-center">
          {#if index === 0}
            <Avatar name="John Doe" />
          {:else if index === 1}
            <Avatar 
              name="Jane Smith" 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
            />
          {:else if index === 2}
            <Avatar 
              name="Alex Johnson" 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              status="online"
            />
          {:else if index === 3}
            <Avatar 
              name="Sarah Wilson" 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              badge="3"
            />
          {:else if index === 4}
            <Avatar 
              name="Mike Brown" 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              clickable
              on:click={() => handleAvatarClick('Mike Brown')}
            />
          {:else if index === 5}
            <Avatar 
              name="David Clark" 
              src="https://broken-image-url.jpg"
            />
          {/if}
        </div>
      </ComponentPreview>
    {/each}
  </section>

  <!-- Sizes -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Sizes</h2>
    
    <ComponentPreview
      title="Avatar Sizes"
      description="Available size options from extra small to 2xl"
      code={`<Avatar size="xs" name="User" />
<Avatar size="sm" name="User" />
<Avatar size="md" name="User" />
<Avatar size="lg" name="User" />
<Avatar size="xl" name="User" />
<Avatar size="2xl" name="User" />`}
    >
      <div slot="preview" class="p-8 flex items-center justify-center gap-4 flex-wrap">
        {#each sizes as size}
          <div class="flex flex-col items-center gap-2">
            <Avatar 
              {size}
              name="User Name"
              src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
            />
            <span class="text-xs text-gray-500">{size}</span>
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </section>

  <!-- Variants -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Variants</h2>
    
    <ComponentPreview
      title="Avatar Variants"
      description="Different shapes: circular, rounded, and square"
      code={`<Avatar variant="circular" name="User" />
<Avatar variant="rounded" name="User" />
<Avatar variant="square" name="User" />`}
    >
      <div slot="preview" class="p-8 flex items-center justify-center gap-6">
        {#each variants as variant}
          <div class="flex flex-col items-center gap-2">
            <Avatar 
              {variant}
              size="lg"
              name="User Name"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            />
            <span class="text-xs text-gray-500 capitalize">{variant}</span>
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </section>

  <!-- Status Indicators -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Status Indicators</h2>
    
    <ComponentPreview
      title="Status Types"
      description="Different status indicators: online, offline, away, busy"
      code={`<Avatar status="online" name="User" />
<Avatar status="offline" name="User" />
<Avatar status="away" name="User" />
<Avatar status="busy" name="User" />`}
    >
      <div slot="preview" class="p-8 flex items-center justify-center gap-6">
        {#each statuses as status}
          <div class="flex flex-col items-center gap-2">
            <Avatar 
              {status}
              size="lg"
              name="User Name"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
            />
            <span class="text-xs text-gray-500 capitalize">{status}</span>
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </section>

  <!-- Badge Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Badges</h2>
    
    <ComponentPreview
      title="Notification Badges"
      description="Display notification counts or indicators"
      code={`<Avatar badge="5" name="User" />
<Avatar badge="99+" name="User" />
<Avatar badge="•" name="User" />
<Avatar badge="" showBadge name="User" />`}
    >
      <div slot="preview" class="p-8 flex items-center justify-center gap-6">
        <div class="flex flex-col items-center gap-2">
          <Avatar 
            badge="5"
            size="lg"
            name="User Name"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          />
          <span class="text-xs text-gray-500">Count badge</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar 
            badge="99+"
            size="lg"
            name="User Name"
            src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
          />
          <span class="text-xs text-gray-500">High count</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar 
            badge="•"
            size="lg"
            name="User Name"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          />
          <span class="text-xs text-gray-500">Dot indicator</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar 
            badge=""
            showBadge
            size="lg"
            name="User Name"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          />
          <span class="text-xs text-gray-500">Empty badge</span>
        </div>
      </div>
    </ComponentPreview>
  </section>

  <!-- Initials Fallback -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Initials Fallback</h2>
    
    <ComponentPreview
      title="Generated Initials"
      description="Automatic initials generation from user names"
      code={`<Avatar name="John Doe" />
<Avatar name="Sarah Johnson Wilson" />
<Avatar name="Alex" />
<Avatar name="" />`}
    >
      <div slot="preview" class="p-8 flex items-center justify-center gap-6">
        <div class="flex flex-col items-center gap-2">
          <Avatar name="John Doe" size="lg" />
          <span class="text-xs text-gray-500">John Doe</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar name="Sarah Johnson Wilson" size="lg" />
          <span class="text-xs text-gray-500">Sarah Johnson Wilson</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar name="Alex" size="lg" />
          <span class="text-xs text-gray-500">Alex</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar name="" size="lg" />
          <span class="text-xs text-gray-500">No name</span>
        </div>
      </div>
    </ComponentPreview>
  </section>

  <!-- Team Example -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Real-world Example</h2>
    
    <ComponentPreview
      title="Team Members List"
      description="Example of avatars in a team member list with status and interaction"
      code={`{#each teamMembers as member}
  <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
    <Avatar 
      name={member.name}
      src={member.src}
      status={member.status}
      clickable
      on:click={() => handleMemberClick(member)}
    />
    <div>
      <p class="font-medium">{member.name}</p>
      <p class="text-sm text-gray-500 capitalize">{member.status}</p>
    </div>
  </div>
{/each}`}
    >
      <div slot="preview" class="p-6">
        <div class="max-w-md mx-auto space-y-2">
          {#each teamMembers as member}
            <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Avatar 
                name={member.name}
                src={member.src}
                status={member.status}
                clickable
                on:click={() => handleAvatarClick(member.name)}
              />
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{member.name}</p>
                <p class="text-sm text-gray-500 capitalize">{member.status}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </ComponentPreview>
  </section>
</div>
