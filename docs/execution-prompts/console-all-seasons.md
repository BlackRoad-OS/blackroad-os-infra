# Console: All Seasons Execution Prompt

Paste this into Claude Code when in `blackroad-os-prism-console` to apply all seasons at once.

---

## Prompt

```
You are Claude Code, inside blackroad-os-prism-console.

Apply ALL of the following seasons to this repo to build out the complete admin UI.

---

## Season 3.5: Agent Runs v1

### API Routes for Agent Runs

Create `src/app/api/agents/[id]/run/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const agentsApiUrl = process.env.AGENTS_API_URL;
  if (!agentsApiUrl) {
    return NextResponse.json(
      { error: "AGENTS_API_URL not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const url = `${agentsApiUrl}/agents/${params.id}/run`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to trigger run" },
      { status: 502 }
    );
  }
}
```

Create `src/app/api/agent-runs/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const agentsApiUrl = process.env.AGENTS_API_URL;
  if (!agentsApiUrl) {
    return NextResponse.json(
      { error: "AGENTS_API_URL not configured" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get("agentId");
    const limit = searchParams.get("limit") || "50";
    const offset = searchParams.get("offset") || "0";

    let url = `${agentsApiUrl}/agent-runs?limit=${limit}&offset=${offset}`;
    if (agentId) {
      url += `&agentId=${agentId}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch runs" },
      { status: 502 }
    );
  }
}
```

### Update Agents Page UI

Update `src/app/agents/page.tsx` to add run trigger and run history:

```tsx
"use client";

import { useState, useEffect } from "react";

interface Agent {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

interface AgentRun {
  id: string;
  agentId: string;
  status: string;
  input?: string;
  output?: string;
  error?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [runs, setRuns] = useState<AgentRun[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [runInput, setRunInput] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState("");

  useEffect(() => {
    loadAgents();
    loadRuns();
  }, []);

  const loadAgents = async () => {
    try {
      const res = await fetch("/api/agents");
      const data = await res.json();
      setAgents(data.agents || []);
    } catch (err) {
      setError("Failed to load agents");
    }
  };

  const loadRuns = async () => {
    try {
      const res = await fetch("/api/agent-runs");
      const data = await res.json();
      setRuns(data.runs || []);
    } catch (err) {
      setError("Failed to load runs");
    }
  };

  const createAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, status }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create agent");
      }

      setSuccess("Agent created successfully!");
      setName("");
      setStatus("active");
      await loadAgents();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const triggerRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgentId) {
      setError("Please select an agent");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/agents/${selectedAgentId}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: runInput }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to trigger run");
      }

      const data = await res.json();
      setSuccess(`Run triggered! Run ID: ${data.runId}`);
      setRunInput("");
      await loadRuns();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      case "running":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Agents</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* Create Agent Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Agent</h2>
        <form onSubmit={createAgent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              maxLength={500}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Agent"}
          </button>
        </form>
      </div>

      {/* Trigger Run Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Trigger Agent Run</h2>
        <form onSubmit={triggerRun} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Agent</label>
            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select an agent...</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Input (optional)
            </label>
            <textarea
              value={runInput}
              onChange={(e) => setRunInput(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
              maxLength={10000}
            />
            <p className="text-sm text-gray-500 mt-1">
              {runInput.length} / 10,000 characters
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Triggering..." : "Trigger Run"}
          </button>
        </form>
      </div>

      {/* Agents List */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Agent List</h2>
          <button
            onClick={loadAgents}
            className="text-blue-600 hover:text-blue-800"
          >
            Refresh
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Created</th>
              <th className="text-left py-2">ID</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-b">
                <td className="py-2">{agent.name}</td>
                <td className="py-2">
                  <span className={getStatusColor(agent.status)}>
                    {agent.status}
                  </span>
                </td>
                <td className="py-2">
                  {new Date(agent.createdAt).toLocaleString()}
                </td>
                <td className="py-2 font-mono text-sm">{agent.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Run History */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Run History</h2>
          <button
            onClick={loadRuns}
            className="text-blue-600 hover:text-blue-800"
          >
            Refresh
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Agent</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Input</th>
              <th className="text-left py-2">Output</th>
              <th className="text-left py-2">Started</th>
              <th className="text-left py-2">Completed</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.id} className="border-b">
                <td className="py-2">
                  {agents.find((a) => a.id === run.agentId)?.name || run.agentId}
                </td>
                <td className="py-2">
                  <span className={getStatusColor(run.status)}>
                    {run.status}
                  </span>
                </td>
                <td className="py-2 max-w-xs truncate">
                  {run.input || "—"}
                </td>
                <td className="py-2 max-w-xs truncate">
                  {run.output || run.error || "—"}
                </td>
                <td className="py-2">
                  {run.startedAt
                    ? new Date(run.startedAt).toLocaleString()
                    : "—"}
                </td>
                <td className="py-2">
                  {run.completedAt
                    ? new Date(run.completedAt).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## Season 4: Hardening

### Error Mapping Utility

Create `src/lib/errorMapping.ts`:

```typescript
export function mapErrorToMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    agent_not_found: "Agent not found. Please refresh the page.",
    name_required: "Agent name is required and must be valid.",
    invalid_status: "Invalid status. Please select a valid option.",
    run_failed: "Failed to execute run. Please try again.",
    run_not_found: "Run not found.",
    task_not_found: "Task not found. Please refresh the page.",
    title_required: "Task title is required.",
    invalid_priority: "Invalid priority. Please select a valid option.",
    unauthorized: "You must be logged in to perform this action.",
    invalid_token: "Your session has expired. Please log in again.",
    invalid_credentials: "Invalid email or password.",
    user_exists: "An account with this email already exists.",
    email_and_password_required: "Email and password are required.",
  };

  return errorMessages[errorCode] || "An unexpected error occurred. Please try again.";
}
```

### Apply Error Mapping

Update `src/app/agents/page.tsx` to use error mapping:

```tsx
import { mapErrorToMessage } from "@/lib/errorMapping";

// In createAgent function:
if (!res.ok) {
  const data = await res.json();
  throw new Error(mapErrorToMessage(data.error));
}

// In triggerRun function:
if (!res.ok) {
  const data = await res.json();
  throw new Error(mapErrorToMessage(data.error));
}
```

### Client-Side Validation

Already implemented in Season 3.5:
- Agent name: required, max 500 chars
- Agent status: validated against allowed values
- Run input: max 10,000 chars with character counter

---

## Season 5: Telemetry

### Status Dashboard Component

Create `src/components/StatusCard.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";

interface Metrics {
  [key: string]: {
    count: number;
    lastUpdated: string;
  };
}

export default function StatusCard() {
  const [metrics, setMetrics] = useState<Metrics>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const loadMetrics = async () => {
    try {
      const res = await fetch("/api/metrics");
      const data = await res.json();
      setMetrics(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load metrics:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Loading metrics...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">System Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(metrics).map(([key, data]) => (
          <div key={key} className="border rounded p-4">
            <p className="text-sm text-gray-600">{key}</p>
            <p className="text-2xl font-bold">{data.count}</p>
            <p className="text-xs text-gray-400">
              Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

Create `src/app/api/metrics/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  const agentsApiUrl = process.env.AGENTS_API_URL;
  if (!agentsApiUrl) {
    return NextResponse.json({}, { status: 200 });
  }

  try {
    const response = await fetch(`${agentsApiUrl}/metrics/agents`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({}, { status: 200 });
  }
}
```

Add StatusCard to a dashboard page (create if doesn't exist):

Create `src/app/dashboard/page.tsx`:

```tsx
import StatusCard from "@/components/StatusCard";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <StatusCard />
    </div>
  );
}
```

Update navigation in `src/components/layout/AppShell.tsx`:

```tsx
<Link href="/dashboard">Dashboard</Link>
```

---

## Season 6: Task Registry v1

### API Routes for Tasks

Create `src/app/api/tasks/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const tasksApiUrl = process.env.TASKS_API_URL || process.env.AGENTS_API_URL;
  if (!tasksApiUrl) {
    return NextResponse.json(
      { error: "API URL not configured" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "50";
    const offset = searchParams.get("offset") || "0";

    const url = `${tasksApiUrl}/tasks?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  const tasksApiUrl = process.env.TASKS_API_URL || process.env.AGENTS_API_URL;
  if (!tasksApiUrl) {
    return NextResponse.json(
      { error: "API URL not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(`${tasksApiUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 502 }
    );
  }
}
```

Create `src/app/api/tasks/[id]/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tasksApiUrl = process.env.TASKS_API_URL || process.env.AGENTS_API_URL;

  try {
    const body = await request.json();
    const response = await fetch(`${tasksApiUrl}/tasks/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 502 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tasksApiUrl = process.env.TASKS_API_URL || process.env.AGENTS_API_URL;

  try {
    const response = await fetch(`${tasksApiUrl}/tasks/${params.id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 502 }
    );
  }
}
```

### Tasks Page UI

Create `src/app/tasks/page.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { mapErrorToMessage } from "@/lib/errorMapping";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assignee?: string;
  createdAt: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err) {
      setError("Failed to load tasks");
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status, priority, assignee }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(mapErrorToMessage(data.error));
      }

      setSuccess("Task created successfully!");
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("medium");
      setAssignee("");
      await loadTasks();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      await loadTasks();
      setSuccess("Task deleted successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in_progress":
        return "text-blue-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Tasks</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* Create Task Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>
        <form onSubmit={createTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Assignee (optional)
              </label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>

      {/* Tasks List */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Task List</h2>
          <button
            onClick={loadTasks}
            className="text-blue-600 hover:text-blue-800"
          >
            Refresh
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Title</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Priority</th>
              <th className="text-left py-2">Assignee</th>
              <th className="text-left py-2">Created</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b">
                <td className="py-2">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    {task.description && (
                      <div className="text-sm text-gray-500 truncate max-w-md">
                        {task.description}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-2">
                  <span className={getStatusColor(task.status)}>
                    {task.status.replace("_", " ")}
                  </span>
                </td>
                <td className="py-2">
                  <span className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </span>
                </td>
                <td className="py-2">{task.assignee || "—"}</td>
                <td className="py-2">
                  {new Date(task.createdAt).toLocaleString()}
                </td>
                <td className="py-2">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### Update Navigation

Update `src/components/layout/AppShell.tsx`:

```tsx
<Link href="/tasks">Tasks</Link>
```

---

## Season 7: Auth & RBAC

### Auth API Routes

Create `src/app/api/auth/register/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authApiUrl = process.env.AUTH_API_URL || process.env.AGENTS_API_URL;

  try {
    const body = await request.json();
    const response = await fetch(`${authApiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "registration_failed" },
      { status: 500 }
    );
  }
}
```

Create `src/app/api/auth/login/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authApiUrl = process.env.AUTH_API_URL || process.env.AGENTS_API_URL;

  try {
    const body = await request.json();
    const response = await fetch(`${authApiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "login_failed" },
      { status: 500 }
    );
  }
}
```

### Auth Context

Create `src/contexts/AuthContext.tsx`:

```tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "login_failed");
    }

    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const register = async (email: string, password: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "registration_failed");
    }

    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```

### Login Page

Create `src/app/login/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { mapErrorToMessage } from "@/lib/errorMapping";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(mapErrorToMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">
          {isLogin ? "Login" : "Register"}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-blue-600 hover:text-blue-800"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
```

### Protected Route Wrapper

Create `src/components/ProtectedRoute.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
```

### Update Root Layout

Update `src/app/layout.tsx`:

```tsx
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

Wrap protected pages with ProtectedRoute:

```tsx
// In src/app/agents/page.tsx, src/app/tasks/page.tsx, etc.
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AgentsPage() {
  return (
    <ProtectedRoute>
      {/* existing page content */}
    </ProtectedRoute>
  );
}
```

### Update AppShell

Add logout button to `src/components/layout/AppShell.tsx`:

```tsx
import { useAuth } from "@/contexts/AuthContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/agents">Agents</Link>
            <Link href="/tasks">Tasks</Link>
          </div>
          <div className="flex items-center gap-4">
            <span>{user?.email}</span>
            <button onClick={logout} className="hover:text-gray-300">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
```

---

## Season 8: Tests & CI

### Jest Config

Create `jest.config.js`:

```javascript
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/__tests__/**/*.test.tsx", "**/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["/node_modules/", "/.next/"],
};

module.exports = createJestConfig(customJestConfig);
```

Create `jest.setup.js`:

```javascript
import "@testing-library/jest-dom";
```

### Component Tests

Create `src/__tests__/agents.test.tsx`:

```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AgentsPage from "@/app/agents/page";

global.fetch = jest.fn();

describe("Agents Page", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders agent list", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        agents: [{ id: "1", name: "Test Agent", status: "active", createdAt: new Date().toISOString() }],
      }),
    });

    render(<AgentsPage />);

    await waitFor(() => {
      expect(screen.getByText("Test Agent")).toBeInTheDocument();
    });
  });

  it("creates a new agent", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ agents: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          agent: { id: "2", name: "New Agent", status: "active" },
        }),
      });

    render(<AgentsPage />);

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole("button", { name: /create agent/i });

    fireEvent.change(nameInput, { target: { value: "New Agent" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/agent created successfully/i)).toBeInTheDocument();
    });
  });
});
```

### GitHub Actions

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
```

### Update package.json

```json
{
  "scripts": {
    "test": "jest --coverage",
    "test:watch": "jest --watch"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/react": "^14.0.0",
    "@types/jest": "^29.5.0",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0"
  }
}
```

---

## Your Tasks

After I apply all these changes:

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Update .env.local:**
   ```bash
   AGENTS_API_URL=http://localhost:8080
   # or production URL
   ```
3. **Run dev server:**
   ```bash
   npm run dev
   ```
4. **Test in browser:**
   - Visit http://localhost:3000/login
   - Register a new account
   - Explore /dashboard, /agents, /tasks
5. **Run tests:**
   ```bash
   npm test
   ```

Tell me when you're ready and I'll apply all of these changes using the Edit and Write tools.
```
