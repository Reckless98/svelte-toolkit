<script>
	import Stats from '$lib/components/Stats/Stats.svelte';
	import { onMount } from 'svelte';

	// Basic stats data
	let basicStats = [
		{ label: 'Total Users', value: 12543, trend: 8.2, trendDirection: 'up' },
		{ label: 'Revenue', value: 98765, format: 'currency', trend: 15.3, trendDirection: 'up' },
		{ label: 'Conversion Rate', value: 3.67, format: 'percentage', trend: -2.1, trendDirection: 'down' },
		{ label: 'Avg. Session', value: 245, format: 'duration', trend: 5.8, trendDirection: 'up' }
	];

	// Card layout stats
	let cardStats = [
		{
			label: 'Active Projects',
			value: 24,
			icon: '📊',
			color: 'blue',
			description: 'Currently in development'
		},
		{
			label: 'Team Members',
			value: 156,
			icon: '👥',
			color: 'green',
			description: 'Across all departments'
		},
		{
			label: 'Tasks Completed',
			value: 2847,
			icon: '✅',
			color: 'purple',
			description: 'This month'
		},
		{
			label: 'Client Satisfaction',
			value: 98.5,
			format: 'percentage',
			icon: '⭐',
			color: 'yellow',
			description: 'Based on reviews'
		}
	];

	// Detailed stats with multiple values
	let detailedStats = [
		{
			label: 'Website Traffic',
			primaryValue: 45782,
			secondaryValue: 8924,
			secondaryLabel: 'unique visitors',
			trend: 12.5,
			trendDirection: 'up',
			color: 'indigo'
		},
		{
			label: 'Sales Performance',
			primaryValue: 156780,
			format: 'currency',
			secondaryValue: 23,
			secondaryLabel: 'deals closed',
			trend: -3.2,
			trendDirection: 'down',
			color: 'emerald'
		},
		{
			label: 'Server Uptime',
			primaryValue: 99.97,
			format: 'percentage',
			secondaryValue: 2,
			secondaryLabel: 'incidents',
			trend: 0.1,
			trendDirection: 'up',
			color: 'red'
		}
	];

	// Real-time updating stats
	let liveStats = [
		{ label: 'Active Users', value: 1247, color: 'green' },
		{ label: 'API Calls', value: 89456, color: 'blue' },
		{ label: 'Error Rate', value: 0.23, format: 'percentage', color: 'red' },
		{ label: 'Response Time', value: 127, format: 'duration', color: 'yellow' }
	];

	let isUpdating = false;

	function simulateRealTimeUpdate() {
		if (isUpdating) return;
		
		isUpdating = true;
		const interval = setInterval(() => {
			liveStats = liveStats.map(stat => ({
				...stat,
				value: stat.value + (Math.random() - 0.5) * stat.value * 0.1
			}));
		}, 1000);

		setTimeout(() => {
			clearInterval(interval);
			isUpdating = false;
		}, 10000);
	}

	// Large numbers formatting examples
	let largeNumberStats = [
		{ label: 'Global Users', value: 2456789, format: 'number' },
		{ label: 'Annual Revenue', value: 45678900, format: 'currency' },
		{ label: 'Data Processed', value: 1234567890, format: 'bytes' },
		{ label: 'Success Rate', value: 99.999, format: 'percentage' }
	];
</script>

<svelte:head>
	<title>Stats Component - Svelte UI Toolkit</title>
	<meta name="description" content="Statistical display component with animations, trends, multiple layouts, and formatting options." />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-12">
	<!-- Header -->
	<div class="text-center space-y-4">
		<h1 class="text-4xl font-bold text-gray-900 dark:text-white">Stats Component</h1>
		<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
			Powerful statistics display component with animations, trend indicators, multiple layouts, and flexible formatting.
		</p>
	</div>

	<!-- Basic Stats -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Basic Stats</h2>
			<p class="text-gray-600 dark:text-gray-300">Simple statistics with values, trends, and automatic animations.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Stats 
				items={basicStats}
				layout="row"
				animated={true}
				showTrends={true}
			/>
		</div>
		<details class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
			<summary class="cursor-pointer font-medium text-gray-900 dark:text-white">View Code</summary>
			<pre class="mt-2 text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`<script>
	import Stats from '$lib/components/Stats/Stats.svelte';
	
	let stats = [
		{ label: 'Total Users', value: 12543, trend: 8.2, trendDirection: 'up' },
		{ label: 'Revenue', value: 98765, format: 'currency', trend: 15.3, trendDirection: 'up' },
		{ label: 'Conversion Rate', value: 3.67, format: 'percentage', trend: -2.1, trendDirection: 'down' }
	];
</script>

<Stats 
	items={stats}
	layout="row"
	animated={true}
	showTrends={true}
/>`}</code></pre>
		</details>
	</section>

	<!-- Card Layout -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Card Layout</h2>
			<p class="text-gray-600 dark:text-gray-300">Stats displayed as individual cards with icons and descriptions.</p>
		</div>
		<div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
			<Stats 
				items={cardStats}
				layout="cards"
				animated={true}
				showIcons={true}
			/>
		</div>
	</section>

	<!-- Grid Layout -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Grid Layout</h2>
			<p class="text-gray-600 dark:text-gray-300">Responsive grid layout for better space utilization.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Stats 
				items={cardStats}
				layout="grid"
				columns={2}
				animated={true}
				showIcons={true}
			/>
		</div>
	</section>

	<!-- Detailed Stats -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Detailed Stats</h2>
			<p class="text-gray-600 dark:text-gray-300">Stats with primary and secondary values for more context.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Stats 
				items={detailedStats}
				layout="detailed"
				animated={true}
				showTrends={true}
			/>
		</div>
	</section>

	<!-- Real-time Updates -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Real-time Updates</h2>
			<p class="text-gray-600 dark:text-gray-300">Live updating statistics with smooth animations.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="mb-6">
				<button 
					class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
					on:click={simulateRealTimeUpdate}
					disabled={isUpdating}
				>
					{isUpdating ? 'Updating...' : 'Start Live Updates'}
				</button>
			</div>
			<Stats 
				items={liveStats}
				layout="cards"
				animated={true}
				realTime={true}
			/>
		</div>
	</section>

	<!-- Large Numbers -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Large Numbers</h2>
			<p class="text-gray-600 dark:text-gray-300">Automatic formatting for large numbers with appropriate units.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Stats 
				items={largeNumberStats}
				layout="row"
				animated={true}
				compactNumbers={true}
			/>
		</div>
	</section>

	<!-- Different Sizes -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Size Variants</h2>
			<p class="text-gray-600 dark:text-gray-300">Different sizes for various use cases and layouts.</p>
		</div>
		<div class="space-y-6">
			<!-- Small -->
			<div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
				<h3 class="mb-4 font-medium text-gray-900 dark:text-white">Small</h3>
				<Stats 
					items={basicStats.slice(0, 3)}
					layout="row"
					size="sm"
					animated={true}
				/>
			</div>
			
			<!-- Medium (Default) -->
			<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
				<h3 class="mb-4 font-medium text-gray-900 dark:text-white">Medium (Default)</h3>
				<Stats 
					items={basicStats.slice(0, 3)}
					layout="row"
					animated={true}
				/>
			</div>
			
			<!-- Large -->
			<div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
				<h3 class="mb-6 font-medium text-gray-900 dark:text-white">Large</h3>
				<Stats 
					items={basicStats.slice(0, 3)}
					layout="row"
					size="lg"
					animated={true}
				/>
			</div>
		</div>
	</section>

	<!-- No Animation -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Without Animation</h2>
			<p class="text-gray-600 dark:text-gray-300">Static stats without animations for reduced motion preferences.</p>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<Stats 
				items={basicStats}
				layout="row"
				animated={false}
				showTrends={true}
			/>
		</div>
	</section>

	<!-- Props Documentation -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Props</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-gray-200 dark:border-gray-700">
						<th class="text-left py-2 font-medium text-gray-900 dark:text-white">Prop</th>
						<th class="text-left py-2 font-medium text-gray-900 dark:text-white">Type</th>
						<th class="text-left py-2 font-medium text-gray-900 dark:text-white">Default</th>
						<th class="text-left py-2 font-medium text-gray-900 dark:text-white">Description</th>
					</tr>
				</thead>
				<tbody class="text-gray-600 dark:text-gray-300">
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">items</td>
						<td class="py-2">Array</td>
						<td class="py-2">[]</td>
						<td class="py-2">Array of stat objects to display</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">layout</td>
						<td class="py-2">'row' | 'cards' | 'grid' | 'detailed'</td>
						<td class="py-2">'row'</td>
						<td class="py-2">Layout style for displaying stats</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">size</td>
						<td class="py-2">'sm' | 'md' | 'lg'</td>
						<td class="py-2">'md'</td>
						<td class="py-2">Size of the stats display</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">animated</td>
						<td class="py-2">boolean</td>
						<td class="py-2">true</td>
						<td class="py-2">Enable count-up animations</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">showTrends</td>
						<td class="py-2">boolean</td>
						<td class="py-2">true</td>
						<td class="py-2">Show trend indicators</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">showIcons</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Show icons in card layout</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">columns</td>
						<td class="py-2">number</td>
						<td class="py-2">3</td>
						<td class="py-2">Number of columns in grid layout</td>
					</tr>
					<tr class="border-b border-gray-100 dark:border-gray-700">
						<td class="py-2 font-mono">compactNumbers</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Format large numbers compactly (1.2K, 1.5M)</td>
					</tr>
					<tr>
						<td class="py-2 font-mono">realTime</td>
						<td class="py-2">boolean</td>
						<td class="py-2">false</td>
						<td class="py-2">Enable real-time update mode</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Item Structure -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Item Structure</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<pre class="text-sm bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto"><code>{`interface StatItem {
  label: string;                    // Display label
  value: number;                    // Primary value
  format?: 'number' | 'currency' | 'percentage' | 'duration' | 'bytes';
  trend?: number;                   // Trend percentage
  trendDirection?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo' | 'emerald';
  icon?: string;                    // Icon for card layout
  description?: string;             // Additional description
  primaryValue?: number;            // For detailed layout
  secondaryValue?: number;          // Secondary metric
  secondaryLabel?: string;          // Secondary metric label
}`}</code></pre>
		</div>
	</section>

	<!-- Format Types -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Format Types</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="space-y-4">
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">number</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Standard number formatting with thousand separators (1,234)</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">currency</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Currency formatting with dollar sign ($1,234.56)</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">percentage</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Percentage formatting with % symbol (12.34%)</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">duration</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Time duration in seconds with 's' suffix (123s)</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">bytes</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Byte formatting with appropriate units (1.2 GB)</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Best Practices -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Best Practices</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
			<div class="space-y-4 text-gray-600 dark:text-gray-300">
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Performance</h3>
					<p class="text-sm">Use appropriate animation settings and consider disabling animations for large datasets or users with reduced motion preferences.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Layout Choice</h3>
					<p class="text-sm">Choose layouts based on data importance: row for dashboards, cards for highlights, detailed for comprehensive metrics.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Trends</h3>
					<p class="text-sm">Use consistent color coding for trends: green for positive, red for negative, gray for neutral changes.</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900 dark:text-white">Real-time Updates</h3>
					<p class="text-sm">Implement proper data fetching strategies and consider the impact on user experience when updates are frequent.</p>
				</div>
			</div>
		</div>
	</section>
</div>
