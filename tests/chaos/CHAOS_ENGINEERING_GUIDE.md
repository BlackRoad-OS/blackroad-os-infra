# 💥 Chaos Engineering Test Suite

**Break things on purpose to make them stronger!**

---

## 🎯 Overview

Chaos engineering tests system resilience by intentionally injecting failures and observing how the system responds and recovers.

### Chaos Testing Principles

1. **Hypothesis** - Define what you expect to happen
2. **Inject Failure** - Introduce controlled chaos
3. **Observe** - Monitor system behavior
4. **Learn** - Analyze results and improve
5. **Automate** - Make chaos testing continuous

---

## 💥 Chaos Scenarios

### 1. Network Chaos

#### Latency Injection
```typescript
test('should handle 500ms network latency', async () => {
  // Inject latency
  await injectLatency(500);

  const start = Date.now();
  const response = await api.get('/data');
  const duration = Date.now() - start;

  // Should still work, just slower
  expect(response.status).toBe(200);
  expect(duration).toBeGreaterThan(500);
  expect(duration).toBeLessThan(2000); // But not timeout
});

test('should handle variable latency (jitter)', async () => {
  // Random latency 100-1000ms
  await injectJitter(100, 1000);

  const promises = Array(10).fill(null).map(() =>
    api.get('/data')
  );

  const results = await Promise.allSettled(promises);
  const successful = results.filter(r => r.status === 'fulfilled');

  // Most should succeed despite jitter
  expect(successful.length).toBeGreaterThan(7);
});
```

#### Packet Loss
```typescript
test('should handle 10% packet loss', async () => {
  await injectPacketLoss(0.1);

  const results = await runTest(100);

  // Some requests may fail/retry, but most should succeed
  expect(results.successRate).toBeGreaterThan(0.9);
});

test('should handle 50% packet loss', async () => {
  await injectPacketLoss(0.5);

  // Should retry and eventually succeed
  await expect(api.get('/data', { retry: 5 }))
    .resolves.toBeDefined();
});
```

#### Network Partition
```typescript
test('should handle complete network partition', async () => {
  await networkPartition.enable();

  // All requests should fail
  await expect(api.get('/data'))
    .rejects.toThrow('Network error');

  await networkPartition.disable();

  // Should recover
  await expect(api.get('/data'))
    .resolves.toBeDefined();
});

test('should handle split-brain scenario', async () => {
  // Partition network into two groups
  await createNetworkPartition(['server1', 'server2'], ['server3', 'server4']);

  // Each group should maintain consistency
  // When partition heals, data should reconcile
});
```

#### DNS Failures
```typescript
test('should handle DNS resolution failure', async () => {
  await injectDNSFailure();

  await expect(api.get('https://api.example.com'))
    .rejects.toThrow('ENOTFOUND');

  // Should have fallback (cached IP, secondary DNS)
});
```

### 2. Service Failures

#### Random Pod Killing
```typescript
test('should survive random pod termination', async () => {
  // Kill random pods every 10 seconds
  const killer = startRandomPodKiller(10000);

  // System should remain available
  const results = await loadTest(60000); // 1 minute test

  expect(results.availability).toBeGreaterThan(0.99); // 99%+

  killer.stop();
});

test('should handle cascading failures', async () => {
  // Kill service A
  await killService('serviceA');

  // Service B depends on A - should gracefully degrade
  const response = await api.get('/serviceB/data');

  expect(response.status).toBe(200);
  expect(response.data.degraded).toBe(true);
});
```

#### CPU Throttling
```typescript
test('should handle CPU throttling', async () => {
  // Limit CPU to 10%
  await throttleCPU(0.1);

  // Operations should slow down but not fail
  const start = Date.now();
  await api.get('/cpu-intensive');
  const duration = Date.now() - start;

  expect(duration).toBeGreaterThan(1000); // Slower
  // But should eventually complete
});

test('should handle CPU spike', async () => {
  // CPU stress test
  await stressCPU(0.95); // 95% utilization

  // Critical operations should still work
  await expect(api.get('/health')).resolves.toBeDefined();
});
```

#### Memory Pressure
```typescript
test('should handle memory pressure', async () => {
  // Consume 80% of available memory
  await consumeMemory(0.8);

  // Should handle gracefully (swap, GC, etc)
  const response = await api.get('/data');
  expect(response.status).toBe(200);

  // Check for memory leaks
  const initialMemory = process.memoryUsage().heapUsed;
  await api.get('/data');
  const finalMemory = process.memoryUsage().heapUsed;

  expect(finalMemory - initialMemory).toBeLessThan(10 * 1024 * 1024);
});

test('should handle OOM situation', async () => {
  // Try to trigger Out Of Memory
  try {
    const huge = new Array(1000000000);
  } catch (error) {
    // Should catch and handle gracefully
    expect(error.message).toContain('memory');
  }
});
```

#### Disk Failures
```typescript
test('should handle disk full', async () => {
  await fillDisk(0.99); // Fill to 99%

  // Writes should fail gracefully
  await expect(writeFile('/data/log.txt', 'data'))
    .rejects.toThrow('ENOSPC');

  // But reads should still work
  await expect(readFile('/data/existing.txt'))
    .resolves.toBeDefined();
});

test('should handle disk corruption', async () => {
  // Simulate corrupted data
  await corruptFile('/data/config.json');

  // Should detect corruption and use backup
  const config = await loadConfig();
  expect(config).toBeDefined();
});

test('should handle slow disk I/O', async () => {
  await slowDiskIO(10); // 10x slower

  // Operations should timeout appropriately
  await expect(readFileWithTimeout('/data/large.bin', 1000))
    .rejects.toThrow('Timeout');
});
```

### 3. Database Chaos

#### Connection Pool Exhaustion
```typescript
test('should handle connection pool exhaustion', async () => {
  // Exhaust all connections
  const connections = await exhaustConnectionPool();

  // New queries should queue
  const promise = db.query('SELECT 1');

  // Release one connection
  await connections[0].release();

  // Queued query should complete
  await expect(promise).resolves.toBeDefined();
});

test('should handle connection failures', async () => {
  // Kill database connections
  await killDBConnections();

  // Should reconnect automatically
  await wait(1000);

  const result = await db.query('SELECT 1');
  expect(result.rows[0]).toEqual({ '?column?': 1 });
});
```

#### Query Timeout
```typescript
test('should timeout slow queries', async () => {
  // Run extremely slow query
  await expect(
    db.query('SELECT pg_sleep(10)', { timeout: 1000 })
  ).rejects.toThrow('Timeout');
});

test('should kill long-running queries', async () => {
  const query = db.query('SELECT pg_sleep(60)');

  // Kill after 5 seconds
  setTimeout(() => db.killQuery(query.pid), 5000);

  await expect(query).rejects.toThrow('Query cancelled');
});
```

#### Database Replication Lag
```typescript
test('should handle replication lag', async () => {
  // Write to primary
  await primary.query('INSERT INTO users (name) VALUES (?)', ['Alice']);

  // Read from replica (might be stale)
  const user = await replica.query('SELECT * FROM users WHERE name = ?', ['Alice']);

  // Should either:
  // 1. Return stale data
  // 2. Read from primary if consistency required
  // 3. Wait for replication to catch up
});
```

### 4. Application-Level Chaos

#### Random Exception Injection
```typescript
test('should handle random exceptions', async () => {
  // 10% of operations throw random errors
  enableRandomExceptions(0.1);

  const results = await runOperations(100);

  // Should handle errors gracefully
  expect(results.errors).toBeGreaterThan(5);
  expect(results.errors).toBeLessThan(15);

  // System should remain stable
  expect(results.systemStable).toBe(true);
});
```

#### Time Travel
```typescript
test('should handle time going backwards', async () => {
  // Simulate NTP correction
  await setSystemTime(Date.now() - 60000); // 1 minute back

  // Should handle gracefully
  const now = Date.now();
  expect(now).toBeGreaterThan(0);

  // Reset
  await setSystemTime(Date.now());
});

test('should handle clock drift', async () => {
  // Simulate gradual clock drift
  await enableClockDrift(0.1); // 10% faster

  await wait(10000);

  // Timers should be resilient
});
```

#### Cache Invalidation
```typescript
test('should handle cache flush', async () => {
  // Warm cache
  await api.get('/data');

  // Flush cache
  await cache.flushAll();

  // Should fallback to database
  const response = await api.get('/data');
  expect(response.status).toBe(200);
});

test('should handle stale cache data', async () => {
  // Cache data
  await cache.set('key', 'old-value');

  // Update database
  await db.update('key', 'new-value');

  // Should invalidate cache
  const value = await getData('key');
  expect(value).toBe('new-value');
});
```

### 5. External Service Chaos

#### API Rate Limiting
```typescript
test('should handle rate limit errors', async () => {
  // Mock 429 responses
  nock('https://api.external.com')
    .get('/data')
    .times(5)
    .reply(429, { error: 'Rate limit exceeded' });

  // Should retry with backoff
  const result = await callExternalAPI();

  // Eventually succeeds or fails gracefully
  expect(result).toBeDefined();
});
```

#### Slow API Responses
```typescript
test('should timeout slow external APIs', async () => {
  // Mock slow API
  nock('https://api.external.com')
    .get('/data')
    .delay(10000)
    .reply(200, { data: 'test' });

  await expect(
    callExternalAPI({ timeout: 2000 })
  ).rejects.toThrow('Timeout');
});
```

#### Intermittent Failures
```typescript
test('should handle flaky external service', async () => {
  let attempts = 0;

  nock('https://api.external.com')
    .get('/data')
    .times(10)
    .reply(() => {
      attempts++;
      return attempts % 3 === 0 ? [200, { data: 'ok' }] : [500, { error: 'Flaky' }];
    });

  // Should retry and eventually succeed
  const result = await callExternalAPIWithRetry();
  expect(result.data).toBe('ok');
});
```

---

## 🧪 Chaos Testing Patterns

### Circuit Breaker Testing
```typescript
test('should open circuit after failures', async () => {
  // Fail service 10 times
  for (let i = 0; i < 10; i++) {
    try {
      await unreliableService();
    } catch (error) {
      // Expected
    }
  }

  // Circuit should be open
  expect(circuitBreaker.state).toBe('open');

  // Requests should fail fast
  const start = Date.now();
  try {
    await unreliableService();
  } catch (error) {
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(10); // Fails immediately
  }
});

test('should half-open circuit after timeout', async () => {
  // Open circuit
  circuitBreaker.open();

  // Wait for half-open timeout
  await wait(CIRCUIT_BREAKER_TIMEOUT);

  expect(circuitBreaker.state).toBe('half-open');

  // Test request
  await unreliableService();

  // If successful, circuit closes
  expect(circuitBreaker.state).toBe('closed');
});
```

### Retry Logic Testing
```typescript
test('should retry with exponential backoff', async () => {
  const attempts = [];

  const flaky = () => {
    attempts.push(Date.now());
    if (attempts.length < 3) throw new Error('Fail');
    return 'success';
  };

  await retryWithBackoff(flaky);

  // Verify backoff intervals
  expect(attempts[1] - attempts[0]).toBeGreaterThan(100);
  expect(attempts[2] - attempts[1]).toBeGreaterThan(200);
});

test('should respect max retries', async () => {
  let attempts = 0;

  const alwaysFails = () => {
    attempts++;
    throw new Error('Always fails');
  };

  await expect(
    retryWithBackoff(alwaysFails, { maxRetries: 3 })
  ).rejects.toThrow();

  expect(attempts).toBe(4); // Initial + 3 retries
});
```

### Graceful Degradation
```typescript
test('should degrade gracefully when dependencies fail', async () => {
  // Kill recommendation service
  await killService('recommendations');

  // Main service should still work
  const response = await api.get('/products');

  expect(response.status).toBe(200);
  expect(response.data.products).toBeDefined();
  // But recommendations missing
  expect(response.data.recommendations).toBeUndefined();
});
```

---

## 📊 Chaos Metrics

### What to Measure

1. **Availability** - % of successful requests
2. **Latency** - Response time distribution
3. **Error Rate** - % of failed requests
4. **Recovery Time** - Time to recover from failure
5. **Data Loss** - Any data corrupted/lost

### Example Metrics Collection
```typescript
class ChaosMetrics {
  private requests = 0;
  private successes = 0;
  private failures = 0;
  private latencies: number[] = [];
  private errors: Error[] = [];

  recordRequest(success: boolean, latency: number, error?: Error) {
    this.requests++;
    if (success) {
      this.successes++;
    } else {
      this.failures++;
      if (error) this.errors.push(error);
    }
    this.latencies.push(latency);
  }

  getReport() {
    return {
      totalRequests: this.requests,
      successRate: this.successes / this.requests,
      errorRate: this.failures / this.requests,
      avgLatency: this.latencies.reduce((a, b) => a + b) / this.latencies.length,
      p50: this.percentile(50),
      p95: this.percentile(95),
      p99: this.percentile(99),
      errors: this.errors.map(e => e.message),
    };
  }

  percentile(p: number) {
    const sorted = this.latencies.sort((a, b) => a - b);
    const index = Math.floor(sorted.length * (p / 100));
    return sorted[index];
  }
}
```

---

## 🎯 Chaos Engineering Best Practices

### 1. Start Small
```
Begin with:
- Low blast radius (test environment)
- Low failure probability (10%)
- Short duration (1 minute)

Gradually increase as confidence grows
```

### 2. Have Hypotheses
```
Before: "I think the system can handle 50% packet loss"
During: Inject 50% packet loss
After: "The system degraded but remained available (95% success rate)"
```

### 3. Monitor Everything
```
- Application metrics
- System metrics
- User experience metrics
- Business metrics
```

### 4. Blast Radius Limit
```
- Use feature flags to limit scope
- Start with canary deployments
- Have kill switches ready
- Define rollback criteria
```

### 5. Automate
```
- Schedule regular chaos tests
- Integrate with CI/CD
- Automated analysis of results
- Automated rollback if needed
```

---

## 🚀 Chaos Testing Schedule

### Daily
- Random pod restarts (low probability)
- Minor network latency
- CPU/Memory stress tests

### Weekly
- Service failure tests
- Database chaos tests
- External API failure tests

### Monthly
- Full disaster recovery test
- Multi-region failure
- Data center outage simulation

### Quarterly
- Game days (manual chaos engineering)
- Cross-team chaos experiments
- Business continuity tests

---

## 📚 Chaos Tools

### Open Source
- **Chaos Monkey** - Random instance termination
- **Gremlin** - Comprehensive chaos platform
- **Litmus** - Kubernetes chaos engineering
- **Chaos Mesh** - Cloud-native chaos testing
- **Pumba** - Docker chaos testing
- **Toxiproxy** - Network chaos proxy

### Cloud Provider Tools
- **AWS Fault Injection Simulator**
- **Azure Chaos Studio**
- **GCP Chaos Engineering**

---

**Remember:** The goal of chaos engineering is not to cause problems, but to discover them before they cause real outages!

**Chaos Engineering Mantra:**
1. Break things on purpose
2. Learn from failures
3. Build resilience
4. Sleep better at night
