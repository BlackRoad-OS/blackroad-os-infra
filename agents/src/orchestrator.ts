/**
 * BlackRoad OS Agent Orchestrator
 * ================================
 * Central coordination system for all BlackRoad OS agents
 *
 * Features:
 * - Agent registration and discovery
 * - Task routing and load balancing
 * - Health monitoring
 * - Workflow execution
 * - Event broadcasting
 */

import { EventEmitter } from 'events';

// =============================================================================
// Types
// =============================================================================

interface Agent {
  id: string;
  name: string;
  type: AgentType;
  capabilities: string[];
  endpoints: string[];
  priority: Priority;
  status: AgentStatus;
  lastHeartbeat: Date;
  metadata?: Record<string, unknown>;
}

type AgentType = 'orchestrator' | 'worker' | 'specialist' | 'identity' | 'storage';
type Priority = 'critical' | 'high' | 'medium' | 'low';
type AgentStatus = 'online' | 'offline' | 'degraded' | 'maintenance';

interface Task {
  id: string;
  type: string;
  capability: string;
  payload: unknown;
  priority: Priority;
  timeout: number;
  retries: number;
  createdAt: Date;
  assignedTo?: string;
  status: TaskStatus;
  result?: unknown;
  error?: string;
}

type TaskStatus = 'pending' | 'assigned' | 'running' | 'completed' | 'failed' | 'timeout';

interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  currentStep: number;
  status: WorkflowStatus;
  context: Record<string, unknown>;
  startedAt: Date;
  completedAt?: Date;
}

interface WorkflowStep {
  agent: string;
  action: string;
  input?: unknown;
  output?: unknown;
  status: TaskStatus;
}

type WorkflowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

// =============================================================================
// Agent Registry
// =============================================================================

class AgentRegistry {
  private agents: Map<string, Agent> = new Map();
  private capabilityIndex: Map<string, Set<string>> = new Map();

  register(agent: Agent): void {
    this.agents.set(agent.id, agent);

    // Index by capability
    for (const capability of agent.capabilities) {
      if (!this.capabilityIndex.has(capability)) {
        this.capabilityIndex.set(capability, new Set());
      }
      this.capabilityIndex.get(capability)!.add(agent.id);
    }

    console.log(`[Registry] Registered agent: ${agent.name} (${agent.id})`);
  }

  unregister(agentId: string): void {
    const agent = this.agents.get(agentId);
    if (!agent) return;

    // Remove from capability index
    for (const capability of agent.capabilities) {
      this.capabilityIndex.get(capability)?.delete(agentId);
    }

    this.agents.delete(agentId);
    console.log(`[Registry] Unregistered agent: ${agent.name}`);
  }

  get(agentId: string): Agent | undefined {
    return this.agents.get(agentId);
  }

  getByCapability(capability: string): Agent[] {
    const agentIds = this.capabilityIndex.get(capability) || new Set();
    return Array.from(agentIds)
      .map(id => this.agents.get(id)!)
      .filter(agent => agent.status === 'online')
      .sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }

  getAll(): Agent[] {
    return Array.from(this.agents.values());
  }

  updateStatus(agentId: string, status: AgentStatus): void {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.status = status;
      agent.lastHeartbeat = new Date();
    }
  }
}

// =============================================================================
// Task Queue
// =============================================================================

class TaskQueue {
  private tasks: Map<string, Task> = new Map();
  private pendingQueue: Task[] = [];

  enqueue(task: Task): void {
    this.tasks.set(task.id, task);
    this.pendingQueue.push(task);
    this.pendingQueue.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    console.log(`[Queue] Enqueued task: ${task.id} (${task.capability})`);
  }

  dequeue(): Task | undefined {
    const task = this.pendingQueue.shift();
    if (task) {
      task.status = 'assigned';
    }
    return task;
  }

  get(taskId: string): Task | undefined {
    return this.tasks.get(taskId);
  }

  update(taskId: string, updates: Partial<Task>): void {
    const task = this.tasks.get(taskId);
    if (task) {
      Object.assign(task, updates);
    }
  }

  getPending(): Task[] {
    return this.pendingQueue.slice();
  }
}

// =============================================================================
// Orchestrator
// =============================================================================

export class Orchestrator extends EventEmitter {
  private registry: AgentRegistry;
  private taskQueue: TaskQueue;
  private workflows: Map<string, Workflow> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.registry = new AgentRegistry();
    this.taskQueue = new TaskQueue();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  start(): void {
    console.log('[Orchestrator] Starting BlackRoad OS Agent Orchestrator...');

    // Start heartbeat monitor
    this.heartbeatInterval = setInterval(() => {
      this.checkHeartbeats();
    }, 30000);

    // Start task processor
    this.processTaskQueue();

    this.emit('started');
    console.log('[Orchestrator] Ready');
  }

  stop(): void {
    console.log('[Orchestrator] Stopping...');

    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.emit('stopped');
  }

  // ---------------------------------------------------------------------------
  // Agent Management
  // ---------------------------------------------------------------------------

  registerAgent(agent: Omit<Agent, 'status' | 'lastHeartbeat'>): void {
    const fullAgent: Agent = {
      ...agent,
      status: 'online',
      lastHeartbeat: new Date(),
    };

    this.registry.register(fullAgent);
    this.emit('agent:registered', fullAgent);
  }

  unregisterAgent(agentId: string): void {
    this.registry.unregister(agentId);
    this.emit('agent:unregistered', agentId);
  }

  heartbeat(agentId: string): void {
    this.registry.updateStatus(agentId, 'online');
  }

  getAgents(): Agent[] {
    return this.registry.getAll();
  }

  // ---------------------------------------------------------------------------
  // Task Management
  // ---------------------------------------------------------------------------

  async submitTask(
    capability: string,
    payload: unknown,
    options: { priority?: Priority; timeout?: number } = {}
  ): Promise<string> {
    const task: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'task',
      capability,
      payload,
      priority: options.priority || 'medium',
      timeout: options.timeout || 300000,
      retries: 0,
      createdAt: new Date(),
      status: 'pending',
    };

    this.taskQueue.enqueue(task);
    this.emit('task:submitted', task);

    return task.id;
  }

  getTask(taskId: string): Task | undefined {
    return this.taskQueue.get(taskId);
  }

  private async processTaskQueue(): Promise<void> {
    while (true) {
      const task = this.taskQueue.dequeue();

      if (!task) {
        await this.sleep(100);
        continue;
      }

      // Find available agent
      const agents = this.registry.getByCapability(task.capability);

      if (agents.length === 0) {
        console.log(`[Orchestrator] No agents available for: ${task.capability}`);
        task.status = 'pending';
        this.taskQueue.enqueue(task);
        await this.sleep(1000);
        continue;
      }

      // Assign to first available agent
      const agent = agents[0];
      task.assignedTo = agent.id;
      task.status = 'running';

      this.emit('task:assigned', { task, agent });

      // Execute task (simulated)
      try {
        const result = await this.executeTask(task, agent);
        task.status = 'completed';
        task.result = result;
        this.emit('task:completed', task);
      } catch (error: any) {
        task.status = 'failed';
        task.error = error.message;
        this.emit('task:failed', task);

        // Retry if possible
        if (task.retries < 3) {
          task.retries++;
          task.status = 'pending';
          this.taskQueue.enqueue(task);
        }
      }
    }
  }

  private async executeTask(task: Task, agent: Agent): Promise<unknown> {
    // In production, this would make an HTTP/gRPC call to the agent
    console.log(`[Orchestrator] Executing task ${task.id} on ${agent.name}`);

    // Simulate execution
    await this.sleep(Math.random() * 1000 + 500);

    return { success: true, executedBy: agent.id };
  }

  // ---------------------------------------------------------------------------
  // Workflow Management
  // ---------------------------------------------------------------------------

  async startWorkflow(name: string, steps: WorkflowStep[], context: Record<string, unknown> = {}): Promise<string> {
    const workflow: Workflow = {
      id: `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      steps,
      currentStep: 0,
      status: 'running',
      context,
      startedAt: new Date(),
    };

    this.workflows.set(workflow.id, workflow);
    this.emit('workflow:started', workflow);

    // Execute workflow steps
    this.executeWorkflow(workflow);

    return workflow.id;
  }

  private async executeWorkflow(workflow: Workflow): Promise<void> {
    for (let i = workflow.currentStep; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      workflow.currentStep = i;

      try {
        // Submit task for this step
        const taskId = await this.submitTask(step.action, {
          workflowId: workflow.id,
          stepIndex: i,
          input: step.input || workflow.context,
        });

        // Wait for completion (simplified)
        await this.waitForTask(taskId);

        const task = this.getTask(taskId);
        step.output = task?.result;
        step.status = task?.status || 'failed';

        if (step.status === 'failed') {
          throw new Error(`Step ${i} failed`);
        }

        // Update context with output
        if (step.output) {
          Object.assign(workflow.context, step.output);
        }

      } catch (error: any) {
        workflow.status = 'failed';
        this.emit('workflow:failed', { workflow, error: error.message });
        return;
      }
    }

    workflow.status = 'completed';
    workflow.completedAt = new Date();
    this.emit('workflow:completed', workflow);
  }

  private async waitForTask(taskId: string, timeout = 60000): Promise<void> {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const task = this.getTask(taskId);

      if (!task) {
        throw new Error('Task not found');
      }

      if (task.status === 'completed' || task.status === 'failed') {
        return;
      }

      await this.sleep(100);
    }

    throw new Error('Task timeout');
  }

  getWorkflow(workflowId: string): Workflow | undefined {
    return this.workflows.get(workflowId);
  }

  // ---------------------------------------------------------------------------
  // Health Monitoring
  // ---------------------------------------------------------------------------

  private checkHeartbeats(): void {
    const now = Date.now();
    const timeout = 60000; // 1 minute

    for (const agent of this.registry.getAll()) {
      const lastSeen = agent.lastHeartbeat.getTime();

      if (now - lastSeen > timeout && agent.status === 'online') {
        this.registry.updateStatus(agent.id, 'offline');
        this.emit('agent:offline', agent);
        console.log(`[Orchestrator] Agent offline: ${agent.name}`);
      }
    }
  }

  getSystemStatus(): {
    agents: { total: number; online: number; offline: number };
    tasks: { pending: number; running: number; completed: number };
    workflows: { active: number };
  } {
    const agents = this.registry.getAll();
    const tasks = this.taskQueue.getPending();

    return {
      agents: {
        total: agents.length,
        online: agents.filter(a => a.status === 'online').length,
        offline: agents.filter(a => a.status === 'offline').length,
      },
      tasks: {
        pending: tasks.filter(t => t.status === 'pending').length,
        running: tasks.filter(t => t.status === 'running').length,
        completed: tasks.filter(t => t.status === 'completed').length,
      },
      workflows: {
        active: Array.from(this.workflows.values()).filter(w => w.status === 'running').length,
      },
    };
  }

  // ---------------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------------

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// =============================================================================
// Default Export
// =============================================================================

export default Orchestrator;

// =============================================================================
// Example Usage
// =============================================================================

if (require.main === module) {
  const orchestrator = new Orchestrator();

  // Register agents
  orchestrator.registerAgent({
    id: 'cece-001',
    name: 'Cece',
    type: 'orchestrator',
    capabilities: ['infrastructure_management', 'deployment_orchestration'],
    endpoints: ['agents.blackroad.systems'],
    priority: 'critical',
  });

  orchestrator.registerAgent({
    id: 'operator-001',
    name: 'Operator',
    type: 'worker',
    capabilities: ['job_scheduling', 'task_execution'],
    endpoints: ['operator.blackroad.systems'],
    priority: 'high',
  });

  // Start orchestrator
  orchestrator.start();

  // Submit a task
  orchestrator.submitTask('deployment_orchestration', {
    service: 'blackroad-os-api',
    environment: 'production',
  });

  // Listen for events
  orchestrator.on('task:completed', (task) => {
    console.log(`Task completed: ${task.id}`);
  });
}
