<!-- Stats Component Explorer -->
<script lang="ts">
	import Stats from '$lib/components/Stats';
	import ComponentPreview from '../ComponentPreview.svelte';

	type StatsLayout = 'grid' | 'row' | 'column';
	type StatsVariant = 'default' | 'cards' | 'minimal' | 'detailed';

	// Sample stats data
	const basicStats = [
		{
			id: 'users',
			label: 'Total Users',
			value: 12543,
			icon: '👥',
			color: 'blue' as const
		},
		{
			id: 'revenue',
			label: 'Revenue',
			value: 89231,
			prefix: '$',
			icon: '💰',
			color: 'green' as const
		},
		{
			id: 'orders',
			label: 'Orders',
			value: 1847,
			icon: '📦',
			color: 'purple' as const
		},
		{
			id: 'conversion',
			label: 'Conversion Rate',
			value: 3.42,
			suffix: '%',
			icon: '📈',
			color: 'yellow' as const
		}
	];

	const detailedStats = [
		{
			id: 'users',
			label: 'Active Users',
			value: 12543,
			icon: '👥',
			color: 'blue' as const,
			trend: {
				direction: 'up' as const,
				value: 12.5,
				period: 'vs last month'
			},
			description: 'Currently active monthly users'
		},
		{
			id: 'revenue',
			label: 'Monthly Revenue',
			value: 89231,
			prefix: '$',
			icon: '💰',
			color: 'green' as const,
			trend: {
				direction: 'up' as const,
				value: 8.3,
				period: 'vs last month'
			},
			description: 'Total revenue for this month'
		},
		{
			id: 'bounce',
			label: 'Bounce Rate',
			value: 42.1,
			suffix: '%',
			icon: '🔄',
			color: 'red' as const,
			trend: {
				direction: 'down' as const,
				value: 5.2,
				period: 'vs last month'
			},
			description: 'Percentage of single-page sessions'
		},
		{
			id: 'satisfaction',
			label: 'Customer Satisfaction',
			value: 94.7,
			suffix: '%',
			icon: '⭐',
			color: 'yellow' as const,
			trend: {
				direction: 'up' as const,
				value: 2.1,
				period: 'vs last month'
			},
			description: 'Based on customer feedback surveys'
		}
	];

	const performanceStats = [
		{
			id: 'pageviews',
			label: 'Page Views',
			value: 245678,
			icon: '👁️',
			color: 'blue' as const
		},
		{
			id: 'sessions',
			label: 'Sessions',
			value: 45231,
			icon: '🔗',
			color: 'purple' as const
		},
		{
			id: 'duration',
			label: 'Avg. Session Duration',
			value: 5.42,
			suffix: 'min',
			icon: '⏱️',
			color: 'green' as const
		}
	];

	// Stats layouts
	const layouts: { name: string; value: StatsLayout }[] = [
		{ name: 'Grid', value: 'grid' },
		{ name: 'Row', value: 'row' },
		{ name: 'Column', value: 'column' },
	];

	// Stats variants
	const variants: { name: string; value: StatsVariant }[] = [
		{ name: 'Default', value: 'default' },
		{ name: 'Cards', value: 'cards' },
		{ name: 'Minimal', value: 'minimal' },
		{ name: 'Detailed', value: 'detailed' },
	];
	// Code examples
	const fundamentalsExample = `<!-- Basic Stats -->
<Stats stats={[
  {
    id: 'users',
    label: 'Total Users',
    value: 12543,
    icon: '👥',
    color: 'blue'
  },
  {
    id: 'revenue',
    label: 'Revenue',
    value: 89231,
    prefix: '$',
    icon: '💰',
    color: 'green'
  }
]} />

<!-- Loading State -->
<Stats loading={true} stats={[]} />`;

	const layoutOrganizationExample = `<!-- Grid Layout -->
<Stats layout="grid" stats={stats} />

<!-- Row Layout -->
<Stats layout="row" stats={stats} />

<!-- Column Layout -->
<Stats layout="column" stats={stats} />`;

	const visualStylesExample = `<!-- Cards Variant -->
<Stats variant="cards" stats={stats} layout="grid" />

<!-- Minimal Variant -->
<Stats variant="minimal" stats={stats} layout="row" />

<!-- Custom Formatting -->
<Stats stats={[
  { label: "Revenue", value: 89231, prefix: "$" },
  { label: "Growth", value: 12.5, suffix: "%" },
  { label: "Users", value: 1234, suffix: "K" }
]} />`;

	const advancedAnalyticsExample = `<!-- Detailed Stats with Trends -->
<Stats 
  stats={[
    {
      id: 'revenue',
      label: 'Revenue',
      value: 89231,
      prefix: '$',
      trend: {
        direction: 'up',
        value: 8.3,
        period: 'vs last month'
      },
      description: 'Total revenue for this month'
    }
  ]}
  showTrends={true}
  variant="detailed"
  animated={true}
/>`;
</script>

<section>
	<div class="max-w-6xl mx-auto">
		<div class="mb-6">
			<h1 class="text-2xl font-bold mb-2">Stats Component</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Display statistical data and metrics with various layouts, trends, and visual styles.
			</p>
		</div>
		<!-- Stats Fundamentals & Basic Display -->
		<ComponentPreview
			title="Stats Fundamentals & Basic Display"
			description="Core statistics functionality with basic display options and loading states for essential data visualization."
			codeSnippet={fundamentalsExample}
			complexity="Basic"
			features={["basic-stats", "loading-states", "icons", "colors"]}
		>
			<div class="space-y-6">
				<!-- Basic Stats -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Basic Statistics</h4>
					<Stats stats={basicStats} />
				</div>

				<!-- Loading State -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Loading State</h4>
					<Stats loading={true} stats={[]} />
				</div>
			</div>
		</ComponentPreview>

		<!-- Layout & Organization -->
		<ComponentPreview
			title="Layout & Organization"
			description="Different layout patterns for organizing statistics across various screen sizes and content structures."
			codeSnippet={layoutOrganizationExample}
			complexity="Intermediate"
			features={["layouts", "grid", "responsive", "organization"]}
		>
			<div class="space-y-6">
				{#each layouts as layout}
					<div class="space-y-4">
						<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">{layout.name} Layout</h4>
						<Stats layout={layout.value} stats={performanceStats} />
					</div>
				{/each}

				<!-- Column Layout Demonstration -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Column Layout (Constrained Width)</h4>
					<div class="max-w-md">
						<Stats 
							layout="column" 
							stats={basicStats.slice(0, 3)} 
							variant="cards"
						/>
					</div>
				</div>
			</div>
		</ComponentPreview>

		<!-- Visual Styles & Variants -->
		<ComponentPreview
			title="Visual Styles & Variants"
			description="Various visual presentation styles including cards, minimal designs, and custom formatting options."
			codeSnippet={visualStylesExample}
			complexity="Intermediate"
			features={["visual-styles", "cards", "minimal", "formatting"]}
		>
			<div class="space-y-6">
				<!-- Visual Variants -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Visual Variants</h4>
					<div class="space-y-6">
						{#each variants as variant}
							<div>
								<h5 class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-3">{variant.name}</h5>
								<Stats variant={variant.value} stats={basicStats} />
							</div>
						{/each}
					</div>
				</div>

				<!-- Custom Formatted Stats -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Custom Formatting</h4>
					<Stats stats={[
						{
							id: 'revenue',
							label: 'Total Revenue',
							value: 89231,
							prefix: '$',
							icon: '💰',
							color: 'green'
						},
						{
							id: 'growth',
							label: 'Growth Rate',
							value: 12.5,
							suffix: '%',
							icon: '📈',
							color: 'blue'
						},
						{
							id: 'customers',
							label: 'Customers',
							value: 1234,
							suffix: 'K',
							icon: '👥',
							color: 'purple'
						},
						{
							id: 'efficiency',
							label: 'Efficiency',
							value: 98.7,
							suffix: '%',
							icon: '⚡',
							color: 'yellow'
						}
					]} variant="cards" />
				</div>
			</div>
		</ComponentPreview>

		<!-- Advanced Features & Analytics -->
		<ComponentPreview
			title="Advanced Features & Analytics"
			description="Rich analytics displays with trend indicators, performance metrics, and business intelligence features."
			codeSnippet={advancedAnalyticsExample}
			complexity="Advanced"
			features={["trends", "analytics", "business-intelligence", "animations"]}
		>
			<div class="space-y-6">
				<!-- Detailed Stats with Trends -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Analytics Dashboard</h4>
					<Stats 
						stats={detailedStats}
						variant="detailed"
						showTrends={true}
						animated={true}
					/>
				</div>

				<!-- Performance Metrics -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Performance Metrics</h4>
					<Stats 
						variant="cards" 
						stats={[
							{
								id: 'performance',
								label: 'Site Performance',
								value: 95.2,
								suffix: '%',
								icon: '⚡',
								color: 'green',
								trend: {
									direction: 'up',
									value: 3.1,
									period: 'vs last week'
								},
								description: 'Overall website performance score'
							},
							{
								id: 'uptime',
								label: 'Uptime',
								value: 99.98,
								suffix: '%',
								icon: '🟢',
								color: 'green',
								trend: {
									direction: 'up',
									value: 0.02,
									period: 'vs last month'
								},
								description: 'Service availability percentage'
							},
							{
								id: 'response',
								label: 'Avg Response Time',
								value: 145,
								suffix: 'ms',
								icon: '⏱️',
								color: 'blue',
								trend: {
									direction: 'down',
									value: 12,
									period: 'vs last week'
								},
								description: 'Average API response time'
							}
						]}
						layout="grid"
						showTrends={true}
						animated={true}
					/>
				</div>
			</div>
		</ComponentPreview>
	</div>
</section>
