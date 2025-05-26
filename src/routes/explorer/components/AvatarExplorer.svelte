<script lang="ts">
  import { Avatar } from '$lib/components/Avatar';
  import ComponentPreview from '../ComponentPreview.svelte';
  
  type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  type AvatarVariant = 'circular' | 'rounded' | 'square';
  type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';
  
  const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const variants: AvatarVariant[] = ['circular', 'rounded', 'square'];  
  const statuses: AvatarStatus[] = ['online', 'offline', 'away', 'busy'];

  const teamMembers: Array<{name: string, src: string, status: AvatarStatus}> = [
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
    },
    {
      name: 'Lisa Park',
      src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      status: 'online'
    }
  ];

  // Comprehensive code examples for each group
  const fundamentalsExample = `<!-- Basic Avatar Usage -->
<Avatar name="John Doe" />
<Avatar 
  name="Jane Smith" 
  src="profile-image.jpg"
/>

<!-- Different Sizes -->
<Avatar name="User" size="xs" />
<Avatar name="User" size="sm" />
<Avatar name="User" size="md" />
<Avatar name="User" size="lg" />
<Avatar name="User" size="xl" />
<Avatar name="User" size="2xl" />

<!-- Fallback to Initials -->
<Avatar 
  name="David Clark" 
  src="broken-url.jpg"
/>`;

  const visualStylesExample = `<!-- Different Variants -->
<Avatar name="User" variant="circular" />
<Avatar name="User" variant="rounded" />
<Avatar name="User" variant="square" />

<!-- Custom Styling -->
<Avatar 
  name="User" 
  class="ring-4 ring-blue-200 shadow-lg"
/>

<!-- Responsive Sizing -->
<Avatar 
  name="User" 
  size="md"
  class="md:size-lg lg:size-xl"
/>`;

  const advancedFeaturesExample = `<!-- Status Indicators -->
<Avatar name="User" status="online" />
<Avatar name="User" status="away" />
<Avatar name="User" status="busy" />
<Avatar name="User" status="offline" />

<!-- With Notification Badge -->
<Avatar 
  name="User" 
  badge="3"
  src="profile.jpg"
/>

<!-- Clickable Avatar -->
<Avatar 
  name="User" 
  clickable
  on:click={handleClick}
/>

<!-- Combined Features -->
<div class="hover:ring-4 hover:ring-green-200 rounded-full transition-all duration-200">
  <Avatar 
    name="User" 
    src="profile.jpg"
    status="online"
    badge="5"
    clickable
  />
</div>`;

  const realWorldExample = `<!-- Team Overview (Overlapping) -->
<div class="flex -space-x-3">
  {#each teamMembers as member}
    <Avatar 
      name={member.name} 
      src={member.src}
      status={member.status}
      class="ring-4 ring-white hover:z-10"
    />
  {/each}
  <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full ring-4 ring-white">
    +5
  </div>
</div>

<!-- Team Grid Layout -->
<div class="grid grid-cols-3 gap-4">
  {#each teamMembers as member}
    <div class="flex flex-col items-center space-y-2">
      <Avatar 
        name={member.name} 
        src={member.src}
        status={member.status}
        clickable
        on:click={() => viewProfile(member.name)}
      />
      <span class="text-xs">{member.name.split(' ')[0]}</span>
    </div>
  {/each}
</div>

<!-- User Profile Header -->
<div class="flex items-center space-x-4">
  <Avatar 
    name="Sarah Johnson" 
    src="profile.jpg"
    size="xl"
    status="online"
    clickable
  />
  <div>
    <h3 class="font-semibold">Sarah Johnson</h3>
    <p class="text-sm text-gray-500">Senior Developer</p>
  </div>
</div>`;

  function handleAvatarClick(name: string) {
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

  <!-- Avatar Fundamentals & Basic Usage -->
  <ComponentPreview
    title="Avatar Fundamentals & Basic Usage"
    description="Learn the core avatar functionality including sizes, image handling, and fallback behavior. Perfect for displaying user profiles across your application."
    codeSnippet={fundamentalsExample}
    complexity="Basic"
    features={["Image Display", "Initials Fallback", "Size Variants", "Responsive Design"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">All Sizes</h4>
        <div class="flex items-center justify-center gap-6 flex-wrap">
          {#each sizes as size}
            <div class="flex flex-col items-center space-y-2">
              <Avatar 
                {size}
                name="User Name"
                src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
              />
              <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">
                {size}
              </span>
            </div>
          {/each}
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Basic Usage</h4>
        <div class="flex items-center justify-center gap-8">
          <div class="flex flex-col items-center space-y-2">
            <Avatar name="John Doe" size="lg" />
            <span class="text-xs text-gray-500 dark:text-gray-400">Name Only</span>
          </div>
          
          <div class="flex flex-col items-center space-y-2">
            <Avatar 
              name="Jane Smith" 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              size="lg"
            />
            <span class="text-xs text-gray-500 dark:text-gray-400">With Image</span>
          </div>

          <div class="flex flex-col items-center space-y-2">
            <Avatar 
              name="David Clark" 
              src="https://broken-image-url.jpg"
              size="lg"
            />
            <span class="text-xs text-gray-500 dark:text-gray-400">Fallback Initials</span>
          </div>
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Visual Styles & Customization -->
  <ComponentPreview
    title="Visual Styles & Customization"
    description="Explore different visual variants and styling options to match your design system. Customize avatar appearance with shapes, borders, and responsive behavior."
    codeSnippet={visualStylesExample}
    complexity="Intermediate"
    features={["Shape Variants", "Custom Styling", "Border Effects", "Responsive Sizing"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Shape Variants</h4>
        <div class="flex items-center justify-center gap-8">
          {#each variants as variant}
            <div class="flex flex-col items-center space-y-3">
              <Avatar 
                {variant}
                size="lg"
                name="User Name"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              />
              <span class="text-xs text-gray-500 dark:text-gray-400 font-medium capitalize">
                {variant}
              </span>
            </div>
          {/each}
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Custom Styling</h4>        <div class="flex items-center justify-center gap-8">
          <div class="flex flex-col items-center space-y-2">
            <Avatar 
              name="User Name"
              src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
              size="lg"
            />
            <span class="text-xs text-gray-500 dark:text-gray-400">Blue Ring</span>
          </div>

          <div class="flex flex-col items-center space-y-2">
            <Avatar 
              name="User Name"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              size="lg"
            />
            <span class="text-xs text-gray-500 dark:text-gray-400">Purple Ring</span>
          </div>

          <div class="flex flex-col items-center space-y-2">
            <Avatar 
              name="User Name"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              size="lg"
            />
            <span class="text-xs text-gray-500 dark:text-gray-400">Green Ring</span>
          </div>
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Advanced Features & Interactions -->
  <ComponentPreview
    title="Advanced Features & Interactions"
    description="Discover powerful features including status indicators, notification badges, and click interactions. Build sophisticated user interfaces with enhanced avatar functionality."
    codeSnippet={advancedFeaturesExample}
    complexity="Advanced"
    features={["Status Indicators", "Notification Badges", "Click Interactions", "Feature Combinations"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Status Indicators</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          {#each statuses as status}
            <div class="flex flex-col items-center space-y-3">
              <Avatar 
                {status}
                size="lg"
                name="User Name"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              />
              <span class="text-xs text-gray-500 dark:text-gray-400 font-medium capitalize">
                {status}
              </span>
            </div>
          {/each}
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Advanced Features</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- With Badge -->
          <div class="flex flex-col items-center space-y-3">
            <Avatar 
              name="Sarah Wilson" 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              badge="3"
              size="lg"
            />
            <span class="text-xs text-gray-500 dark:text-gray-400 text-center">
              Notification Badge
            </span>
          </div>          <!-- Clickable -->
          <div class="flex flex-col items-center space-y-3">
            <Avatar 
              name="Mike Brown" 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              clickable
              size="lg"
              on:click={() => alert('Avatar clicked!')}
            />
            <span class="text-xs text-gray-500 dark:text-gray-400 text-center">
              Clickable
            </span>
          </div>

          <!-- Status + Badge -->
          <div class="flex flex-col items-center space-y-3">
            <Avatar 
              name="Alex Johnson" 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              status="online"
              badge="2"
              size="lg"
            />
            <span class="text-xs text-gray-500 dark:text-gray-400 text-center">
              Status + Badge
            </span>
          </div>

          <!-- All Features Combined -->          <div class="flex flex-col items-center space-y-3">
            <div class="hover:ring-4 hover:ring-green-200 dark:hover:ring-green-800 transition-all duration-200 rounded-full">
              <Avatar 
                name="Lisa Park" 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
                status="online"
                badge="5"
                clickable
                size="lg"
                on:click={() => handleAvatarClick('Lisa Park')}
              />
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400 text-center">
              All Features
            </span>
          </div>
        </div>
      </div>
    </div>
  </ComponentPreview>

  <!-- Real-World Applications & Examples -->
  <ComponentPreview
    title="Real-World Applications & Examples"
    description="See avatar components in action with practical examples including team displays, user profiles, and dashboard interfaces. Professional implementations ready for production use."
    codeSnippet={realWorldExample}
    complexity="Advanced"
    features={["Team Displays", "User Profiles", "Dashboard Interfaces", "Production Ready"]}
  >
    <div class="p-6 space-y-8">
      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Team Overview (Overlapping)</h4>
        <div class="flex flex-col items-center space-y-4">
          <div class="flex -space-x-3">
            {#each teamMembers.slice(0, 4) as member}              <div class="relative ring-4 ring-white dark:ring-gray-800 shadow-lg hover:z-10 hover:scale-110 transition-all duration-200 rounded-full">
                <Avatar 
                  name={member.name} 
                  src={member.src}
                  status={member.status}
                  size="lg"
                />
              </div>
            {/each}
            {#if teamMembers.length > 4}
              <div class="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full ring-4 ring-white dark:ring-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300">
                +{teamMembers.length - 4}
              </div>
            {/if}
          </div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Team of {teamMembers.length} members</span>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Team Grid Layout</h4>
        <div class="flex flex-col items-center space-y-4">
          <div class="grid grid-cols-3 gap-4">
            {#each teamMembers.slice(0, 6) as member}              <div class="flex flex-col items-center space-y-2">
                <div class="hover:scale-105 transition-transform duration-200 rounded-full">
                  <Avatar 
                    name={member.name} 
                    src={member.src}
                    status={member.status}
                    size="md"
                    clickable
                    on:click={() => handleAvatarClick(member.name)}
                  />
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {member.name.split(' ')[0]}
                </span>
              </div>
            {/each}
          </div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Interactive Team Grid</span>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">User Profile Header</h4>        <div class="flex justify-center">
          <div class="flex items-center space-x-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="hover:ring-4 hover:ring-blue-200 dark:hover:ring-blue-800 transition-all duration-200 rounded-full">
              <Avatar 
                name="Sarah Johnson" 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
                size="xl"
                status="online"
                clickable
              />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Sarah Johnson</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Senior Developer</p>
              <div class="flex items-center mt-2 space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <span class="text-xs text-gray-500 dark:text-gray-400">Active now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ComponentPreview>
</div>
