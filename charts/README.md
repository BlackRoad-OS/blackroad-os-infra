# 📊 BlackRoad OS Chart Pack

Emoji-based visual charts for monitoring capacity, load, throughput, and queue metrics.

## Overview

This chart pack provides 5 types of emoji-based progress/status bars for visualizing system and team metrics in a human-readable, at-a-glance format.

## Chart Types

### 1. 👥 Capacity Bars (10 states)

Shows team/system capacity growth from empty to celebration.

```
State 0:  👥  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️  (Empty)
State 1:  👥  🟢⚪️⚪️⚪️⚪️⚪️⚪️  (Starting to fill)
State 2:  👥  🟢🟢⚪️⚪️⚪️⚪️⚪️
State 3:  👥  🟢🟢🟢⚪️⚪️⚪️⚪️
State 4:  👥  🟢🟢🟢🟢⚪️⚪️⚪️
State 5:  👥  🟢🟢🟢🟢🟢⚪️⚪️
State 6:  👥  🟢🟢🟢🟢🟢🟢⚪️
State 7:  👥  🟢🟢🟢🟢🟢🟢🟢  (Full)
State 8:  👥  ✅✅✅✅✅✅✅  (Completed)
State 9:  👥  🎉🎉🎉🎉🎉🎉🎉  (Celebration!)
```

**Use cases:**
- Team capacity planning
- Resource allocation visualization
- Hiring progress tracking
- Onboarding status

### 2. ⚙️ Load / Stress Bars (10 states)

Shows system load levels from idle to critical.

```
State 0:  ⚙️  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️  (Idle)
State 1:  ⚙️  🟦⚪️⚪️⚪️⚪️⚪️⚪️  (Low load)
State 2:  ⚙️  🟦🟦⚪️⚪️⚪️⚪️⚪️
State 3:  ⚙️  🟦🟦🟦⚪️⚪️⚪️⚪️
State 4:  ⚙️  🟦🟦🟦🟦⚪️⚪️⚪️  (Medium load)
State 5:  ⚙️  🟦🟦🟦🟦🟦⚪️⚪️
State 6:  ⚙️  🟦🟦🟦🟦🟦🟦⚪️
State 7:  ⚙️  🟦🟦🟦🟦🟦🟦🟦  (Full load)
State 8:  ⚙️  🟧🟧🟧🟧🟧🟧🟧  (Warning!)
State 9:  ⚙️  🟥🟥🟥🟥🟥🟥🟥  (Critical!)
```

**Use cases:**
- CPU/memory utilization
- API request load
- Database connection pools
- Worker process saturation

### 3. 🧯 Overload Warnings (10 states)

Shows overload conditions and recovery progression.

```
State 0:  🧯  🟦🟦🟦🟦🟦🟦🟦  (Normal)
State 1:  🧯  🟧🟧🟧🟧🟧🟧🟧  (Warning)
State 2:  🧯  🟥🟥🟥🟥🟥🟥🟥  (Overload!)
State 3:  🧯  🟥🟥🟥🟥🟥🟥⬜️  (Starting recovery)
State 4:  🧯  🟥🟥🟥🟥🟥⬜️⬜️
State 5:  🧯  🟥🟥🟥🟥⬜️⬜️⬜️
State 6:  🧯  🟥🟥🟥⬜️⬜️⬜️⬜️
State 7:  🧯  🟥🟥⬜️⬜️⬜️⬜️⬜️
State 8:  🧯  🟥⬜️⬜️⬜️⬜️⬜️⬜️
State 9:  🧯  ⛓️‍💥⛓️‍💥⛓️‍💥⛓️‍💥⛓️‍💥⛓️‍💥⛓️‍💥  (System break!)
```

**Use cases:**
- Circuit breaker status
- Rate limiter state
- Cascading failure detection
- Auto-scaling triggers

### 4. 📦 Throughput "Ship Rate" (10 states)

Shows delivery/shipping throughput rate.

```
State 0:  📦  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️  (Not shipping)
State 1:  📦  📦⚪️⚪️⚪️⚪️⚪️⚪️  (Starting)
State 2:  📦  📦📦⚪️⚪️⚪️⚪️⚪️
State 3:  📦  📦📦📦⚪️⚪️⚪️⚪️
State 4:  📦  📦📦📦📦⚪️⚪️⚪️  (Good pace)
State 5:  📦  📦📦📦📦📦⚪️⚪️
State 6:  📦  📦📦📦📦📦📦⚪️
State 7:  📦  📦📦📦📦📦📦📦  (Full throughput)
State 8:  📦  🚀🚀🚀🚀🚀🚀🚀  (Rocket speed!)
State 9:  📦  🏁🏁🏁🏁🏁🏁🏁  (Finished!)
```

**Use cases:**
- Deployment velocity
- CI/CD pipeline throughput
- Feature delivery rate
- Release cadence tracking

### 5. 🧺 Queue Size (10 states)

Shows queue depth and backlog status.

```
State 0:  🧺  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️  (Empty queue)
State 1:  🧺  🧺⚪️⚪️⚪️⚪️⚪️⚪️  (Few items)
State 2:  🧺  🧺🧺⚪️⚪️⚪️⚪️⚪️
State 3:  🧺  🧺🧺🧺⚪️⚪️⚪️⚪️
State 4:  🧺  🧺🧺🧺🧺⚪️⚪️⚪️  (Moderate)
State 5:  🧺  🧺🧺🧺🧺🧺⚪️⚪️
State 6:  🧺  🧺🧺🧺🧺🧺🧺⚪️
State 7:  🧺  🧺🧺🧺🧺🧺🧺🧺  (Full queue)
State 8:  🧺  📬📬📬📬📬📬📬  (Inbox overflow!)
State 9:  🧺  📪📪📪📪📪📪📪  (All cleared!)
```

**Use cases:**
- Message queue depth
- Task backlog size
- Work item tracking
- Event buffer status

## Usage

### TypeScript/JavaScript

```typescript
import { capacityChart, loadChart, overloadChart, throughputChart, queueChart } from './charts';

// Generate individual charts
console.log(capacityChart(5));  // 👥  🟢🟢🟢🟢🟢⚪️⚪️
console.log(loadChart(8));      // ⚙️  🟧🟧🟧🟧🟧🟧🟧
console.log(throughputChart(9)); // 📦  🏁🏁🏁🏁🏁🏁🏁

// Generate all states for a chart type
import { generateAllStates } from './charts';

const capacityStates = generateAllStates('capacity');
capacityStates.forEach((state, i) => {
  console.log(`State ${i}: ${state}`);
});

// Generate complete chart pack
import { generateChartPack } from './charts';

const allCharts = generateChartPack();
console.log(allCharts.capacity);
console.log(allCharts.load);
```

### Custom Bar Count

All charts support custom bar counts (default is 7):

```typescript
capacityChart(5, 10);  // 10 bars instead of 7
loadChart(3, 5);       // 5 bars instead of 7
```

## Integration Examples

### In Monitoring Dashboards

```typescript
// Display current system load
const cpuUsage = 0.85; // 85% CPU
const loadState = Math.min(9, Math.floor(cpuUsage * 10));
console.log(`CPU: ${loadChart(loadState)}`);

// Display queue depth
const queueDepth = 42;
const maxQueue = 100;
const queueState = Math.min(9, Math.floor((queueDepth / maxQueue) * 10));
console.log(`Queue: ${queueChart(queueState)}`);
```

### In Status Reports

```typescript
// Weekly deployment velocity
const deploysThisWeek = 8;
const deployTarget = 10;
const throughputState = Math.min(9, Math.floor((deploysThisWeek / deployTarget) * 10));
console.log(`Deployments: ${throughputChart(throughputState)}`);
```

### In Slack/Discord Bots

```typescript
// Send capacity update
const teamSize = 5;
const teamCapacity = 8;
const capacityState = Math.floor((teamSize / teamCapacity) * 7);
await slack.postMessage({
  channel: '#engineering',
  text: `Team Capacity: ${capacityChart(capacityState)}`
});
```

## API Reference

### Functions

#### `capacityChart(state: number, barCount?: number): string`

Generates a capacity chart bar.

- **state**: 0-9 (capacity level)
- **barCount**: Optional, defaults to 7
- **Returns**: Emoji chart string

#### `loadChart(state: number, barCount?: number): string`

Generates a load/stress chart bar.

- **state**: 0-9 (load level)
- **barCount**: Optional, defaults to 7
- **Returns**: Emoji chart string

#### `overloadChart(state: number, barCount?: number): string`

Generates an overload warning chart bar.

- **state**: 0-9 (overload state)
- **barCount**: Optional, defaults to 7
- **Returns**: Emoji chart string

#### `throughputChart(state: number, barCount?: number): string`

Generates a throughput chart bar.

- **state**: 0-9 (throughput level)
- **barCount**: Optional, defaults to 7
- **Returns**: Emoji chart string

#### `queueChart(state: number, barCount?: number): string`

Generates a queue size chart bar.

- **state**: 0-9 (queue depth)
- **barCount**: Optional, defaults to 7
- **Returns**: Emoji chart string

#### `generateAllStates(chartType, barCount?: number): string[]`

Generates all 10 states for a specific chart type.

- **chartType**: 'capacity' | 'load' | 'overload' | 'throughput' | 'queue'
- **barCount**: Optional, defaults to 7
- **Returns**: Array of 10 chart strings

#### `generateChartPack(barCount?: number): Record<string, string[]>`

Generates all states for all chart types.

- **barCount**: Optional, defaults to 7
- **Returns**: Object with all chart types and their states

## Design Philosophy

These charts follow BlackRoad OS design principles:

1. **Visual First**: Instant understanding without reading text
2. **Emoji Native**: Works in Slack, Discord, terminals, docs, everywhere
3. **State-Based**: Clear progression through defined states
4. **Color Coded**: Intuitive color meanings (green=good, red=bad, etc.)
5. **Contextual Icons**: Each chart has a distinct leading icon for quick identification

## Contributing

When adding new chart types, follow these guidelines:

1. Use 10 states (0-9) for consistency
2. Choose a clear, contextual leading emoji
3. Use intuitive color progression
4. Document all states clearly
5. Add usage examples
6. Include error handling

## License

Part of BlackRoad OS Infrastructure
