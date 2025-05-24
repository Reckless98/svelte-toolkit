<!-- Stats Component Explorer -->
<script lang="ts">
	import { Stats } from '$lib/components/Stats';
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
	const basicExample = `<Stats stats={[
  {
    id: 'users',
    label: 'Total Users',
    value: 12543,
    icon: '👥',
    color: 'blue'
  }
]} />`;

	const layoutsExample = `<Stats layout="grid" stats={stats} />
<Stats layout="row" stats={stats} />
<Stats layout="column" stats={stats} />`;

	const variantsExample = `<Stats variant="default" stats={stats} />
<Stats variant="cards" stats={stats} />
<Stats variant="minimal" stats={stats} />
<Stats variant="detailed" stats={stats} />`;

	const trendsExample = `<Stats 
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
      }
    }
  ]}
  showTrends={true}
  variant="detailed"
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

		<!-- Basic Example -->
		<ComponentPreview
			title="Basic Stats"
			description="Simple statistics display with icons and colors."
			codeSnippet={basicExample}
		>
			<div class="space-y-4">
				<Stats stats={basicStats} />
			</div>
		</ComponentPreview>

		<!-- Stats Layouts -->
		<ComponentPreview
			title="Stats Layouts"
			description="Different layout options for organizing statistics."
			codeSnippet={layoutsExample}
		>
			<div class="space-y-8">
				{#each layouts as layout}
					<div>
						<h3 class="font-medium mb-4 text-gray-700 dark:text-gray-300">{layout.name} Layout</h3>
						<Stats layout={layout.value} stats={performanceStats} />
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Stats Variants -->
		<ComponentPreview
			title="Stats Variants"
			description="Different visual styles for displaying statistics."
			codeSnippet={variantsExample}
		>
			<div class="space-y-8">
				{#each variants as variant}
					<div>
						<h3 class="font-medium mb-4 text-gray-700 dark:text-gray-300">{variant.name} Variant</h3>
						<Stats variant={variant.value} stats={basicStats} />
					</div>
				{/each}
			</div>
		</ComponentPreview>

		<!-- Detailed Stats with Trends -->
		<ComponentPreview
			title="Detailed Stats with Trends"
			description="Rich statistics with trend indicators and descriptions."
			codeSnippet={trendsExample}
		>
			<div class="space-y-4">
				<Stats 
					stats={detailedStats}
					variant="detailed"
					showTrends={true}
					animated={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Cards Variant -->
		<ComponentPreview
			title="Cards Variant"
			description="Statistics displayed as individual cards."
			codeSnippet='<Stats variant="cards" stats={stats} layout="grid" />'
		>
			<div class="space-y-4">
				<Stats 
					variant="cards" 
					stats={basicStats} 
					layout="grid"
					animated={true}
				/>
			</div>
		</ComponentPreview>

		<!-- Minimal Variant -->
		<ComponentPreview
			title="Minimal Variant"
			description="Clean, minimal design for statistics."
			codeSnippet='<Stats variant="minimal" stats={stats} layout="row" />'
		>
			<div class="space-y-4">
				<Stats 
					variant="minimal" 
					stats={performanceStats} 
					layout="row"
				/>
			</div>
		</ComponentPreview>

		<!-- Column Layout -->
		<ComponentPreview
			title="Column Layout"
			description="Vertical stacking of statistics."
			codeSnippet='<Stats layout="column" stats={stats} variant="cards" />'
		>
			<div class="space-y-4">
				<div class="max-w-md">
					<Stats 
						layout="column" 
						stats={basicStats.slice(0, 3)} 
						variant="cards"
					/>
				</div>
			</div>
		</ComponentPreview>

		<!-- Custom Formatted Stats -->
		<ComponentPreview
			title="Custom Formatted Stats"
			description="Statistics with custom prefixes, suffixes, and formatting."
			codeSnippet='<Stats stats={[
  { label: "Revenue", value: 89231, prefix: "$" },
  { label: "Growth", value: 12.5, suffix: "%" },
  { label: "Users", value: 1234, suffix: "K" }
]} />'
		>
			<div class="space-y-4">
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
		</ComponentPreview>

		<!-- Loading State -->
		<ComponentPreview
			title="Loading State"
			description="Statistics component in loading state."
			codeSnippet='<Stats loading={true} stats={[]} />'
		>
			<div class="space-y-4">
				<Stats loading={true} stats={[]} />
			</div>
		</ComponentPreview>
	</div>
</section>
