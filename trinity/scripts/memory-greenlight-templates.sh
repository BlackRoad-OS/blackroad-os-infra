#!/bin/bash
# GreenLight Memory Templates
# Standardized logging with emoji tags for BlackRoad memory system

set -e

MEMORY_SYSTEM="$HOME/memory-system.sh"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Helper to log with GreenLight tags
gl_log() {
    local gl_tags="$1"
    local action="$2"
    local entity="$3"
    local details="$4"

    # Prepend GreenLight tags to details
    local full_details="[${gl_tags}] ${details}"

    $MEMORY_SYSTEM log "$action" "$entity" "$full_details"
}

# Template: Announce work with GreenLight
gl_announce() {
    local agent_name="$1"
    local project="$2"
    local tasks="$3"
    local goal="$4"
    local scale="${5:-👉}"  # default micro
    local domain="${6:-🛣️}"  # default platform
    local priority="${7:-📌}"  # default medium

    gl_log "🎯${scale}${domain}${priority}📣" \
        "announce" \
        "$agent_name" \
        "Working on: ${project}. Tasks: ${tasks}. Goal: ${goal}. Checking memory every 60s!"
}

# Template: Progress update
gl_progress() {
    local agent_name="$1"
    local completed="$2"
    local next="$3"
    local scale="${4:-👉}"
    local domain="${5:-🛣️}"

    gl_log "✅${scale}${domain}" \
        "progress" \
        "$agent_name" \
        "Completed: ${completed}. Next: ${next}"
}

# Template: Coordination request
gl_coordinate() {
    local from_agent="$1"
    local to_agent="$2"
    local message="$3"
    local priority="${4:-📌}"

    gl_log "🤝${priority}💬" \
        "coordinate" \
        "$from_agent" \
        "@${to_agent}: ${message}"
}

# Template: Blocked
gl_blocked() {
    local agent_name="$1"
    local reason="$2"
    local needs="$3"
    local priority="${4:-🚨}"

    gl_log "🔒${priority}⛔" \
        "blocked" \
        "$agent_name" \
        "Stuck: ${reason}. Needs: ${needs}"
}

# Template: Deployment
gl_deploy() {
    local service="$1"
    local url="$2"
    local details="$3"
    local scale="${4:-👉}"
    local domain="${5:-🔧}"

    gl_log "🚀${scale}${domain}✅" \
        "deployed" \
        "$service" \
        "URL: ${url}. ${details}"
}

# Template: Decision
gl_decide() {
    local topic="$1"
    local decision="$2"
    local rationale="$3"
    local scale="${4:-🎢}"

    gl_log "⚖️${scale}📝" \
        "decided" \
        "$topic" \
        "Decision: ${decision}. Rationale: ${rationale}"
}

# Template: Bug report
gl_bug() {
    local component="$1"
    local description="$2"
    local priority="${3:-📌}"
    local scale="${4:-👉}"

    gl_log "🐛${scale}${priority}🔴" \
        "bug" \
        "$component" \
        "$description"
}

# Template: Feature request
gl_feature() {
    local feature="$1"
    local description="$2"
    local effort="${3:-🥄}"
    local priority="${4:-📌}"

    gl_log "✨${effort}${priority}💡" \
        "feature" \
        "$feature" \
        "$description"
}

# Template: Start phase
gl_phase_start() {
    local phase="$1"  # discovery, planning, implementation, testing, deployment
    local project="$2"
    local details="$3"
    local scale="${4:-🎢}"

    local phase_emoji=""
    case "$phase" in
        discovery) phase_emoji="🌱" ;;
        planning) phase_emoji="📐" ;;
        implementation) phase_emoji="🔨" ;;
        testing) phase_emoji="🧪" ;;
        deployment) phase_emoji="🚀" ;;
        monitoring) phase_emoji="📊" ;;
        iteration) phase_emoji="🔄" ;;
        *) phase_emoji="🎯" ;;
    esac

    gl_log "🚧${phase_emoji}${scale}⏰" \
        "phase_start" \
        "$project" \
        "Starting ${phase} phase. ${details}"
}

# Template: Complete phase
gl_phase_done() {
    local phase="$1"
    local project="$2"
    local summary="$3"
    local scale="${4:-🎢}"

    local phase_emoji=""
    case "$phase" in
        discovery) phase_emoji="🌱" ;;
        planning) phase_emoji="📐" ;;
        implementation) phase_emoji="🔨" ;;
        testing) phase_emoji="🧪" ;;
        deployment) phase_emoji="🚀" ;;
        monitoring) phase_emoji="📊" ;;
        iteration) phase_emoji="🔄" ;;
        *) phase_emoji="🎯" ;;
    esac

    gl_log "✅${phase_emoji}${scale}🎉" \
        "phase_done" \
        "$project" \
        "Completed ${phase} phase. ${summary}"
}

# Template: WIP update
gl_wip() {
    local task="$1"
    local status="$2"
    local agent="${3:-🌸}"  # default Cece
    local scale="${4:-👉}"

    gl_log "🚧${scale}${agent}⚡" \
        "wip" \
        "$task" \
        "$status"
}

# Template: Dependency
gl_depends() {
    local task="$1"
    local depends_on="$2"
    local reason="$3"

    gl_log "🔄⛔👉" \
        "depends" \
        "$task" \
        "Depends on: ${depends_on}. Reason: ${reason}"
}

# Template: Workflow trigger
gl_workflow_trigger() {
    local repo="$1"
    local trigger="$2"  # push, pr, manual

    gl_log "⚡👉🔧📌" \
        "triggered" \
        "$repo" \
        "Workflow triggered by: ${trigger}"
}

# Template: Workflow step
gl_workflow_step() {
    local repo="$1"
    local step="$2"  # lint, test, build, deploy
    local result="$3"  # passed, failed

    local step_emoji=""
    case "$step" in
        lint) step_emoji="🔍" ;;
        test) step_emoji="🧪" ;;
        build) step_emoji="🏗️" ;;
        deploy) step_emoji="🚀" ;;
        *) step_emoji="⚙️" ;;
    esac

    local status_emoji="✅"
    [ "$result" = "failed" ] && status_emoji="❌"

    gl_log "${step_emoji}${status_emoji}👉🔧" \
        "$step" \
        "$repo" \
        "Step $step $result"
}

# Template: Workflow complete
gl_workflow_done() {
    local repo="$1"
    local result="$2"  # passed, failed
    local duration="$3"

    local status_emoji="✅"
    [ "$result" = "failed" ] && status_emoji="❌"

    gl_log "${status_emoji}🎢🔧📣" \
        "workflow_${result}" \
        "$repo" \
        "Pipeline $result in $duration"
}

# Template: Worker deployment
gl_worker_deploy() {
    local worker="$1"
    local env="$2"  # staging, production
    local version="$3"

    local env_emoji="🧪"
    [ "$env" = "production" ] && env_emoji="🚀"

    gl_log "${env_emoji}⚙️🌐✅" \
        "deployed" \
        "$worker" \
        "Worker deployed to $env v$version"
}

# Template: D1 migration
gl_d1_migrate() {
    local database="$1"
    local migration="$2"

    gl_log "🔄💾👉📌" \
        "migrated" \
        "$database" \
        "Applied migration: ${migration}"
}

# Template: KV namespace operation
gl_kv_update() {
    local namespace="$1"
    local operation="$2"  # created, updated, deleted

    gl_log "✅🗂️👉📌" \
        "$operation" \
        "$namespace" \
        "KV namespace $operation"
}

# Template: R2 bucket operation
gl_r2_operation() {
    local bucket="$1"
    local operation="$2"
    local size="$3"

    gl_log "📦👉💾" \
        "$operation" \
        "$bucket" \
        "R2 $operation ($size)"
}

# ═══════════════════════════════════════════════════════
# BILLING TEMPLATES (Stripe Integration)
# ═══════════════════════════════════════════════════════

# Template: Webhook received
gl_webhook_received() {
    local event_type="$1"
    local event_id="$2"

    gl_log "⚡📥💳👉" \
        "webhook_received" \
        "$event_type" \
        "Stripe webhook: $event_id"
}

# Template: Checkout complete
gl_checkout_complete() {
    local customer_email="$1"
    local tier="$2"
    local amount="$3"

    local tier_emoji=""
    case "$tier" in
        individual) tier_emoji="👤" ;;
        pro) tier_emoji="💼" ;;
        team) tier_emoji="👥" ;;
        enterprise) tier_emoji="🏢" ;;
        founder) tier_emoji="🌟" ;;
        *) tier_emoji="🎯" ;;
    esac

    gl_log "✅💳${tier_emoji}🎢" \
        "checkout_complete" \
        "$customer_email" \
        "Checkout complete: $tier plan, \$$amount"
}

# Template: Subscription created
gl_subscription_created() {
    local customer="$1"
    local tier="$2"
    local subscription_id="$3"

    local tier_emoji=""
    case "$tier" in
        individual) tier_emoji="👤" ;;
        pro) tier_emoji="💼" ;;
        team) tier_emoji="👥" ;;
        enterprise) tier_emoji="🏢" ;;
        founder) tier_emoji="🌟" ;;
        *) tier_emoji="🎯" ;;
    esac

    gl_log "🆕⚙️${tier_emoji}✅" \
        "subscription_created" \
        "$customer" \
        "Subscription created: $tier ($subscription_id)"
}

# Template: Subscription updated
gl_subscription_updated() {
    local customer="$1"
    local old_tier="$2"
    local new_tier="$3"

    gl_log "🔄🎯💼📌" \
        "subscription_updated" \
        "$customer" \
        "Plan change: $old_tier → $new_tier"
}

# Template: Subscription canceled
gl_subscription_canceled() {
    local customer="$1"
    local tier="$2"
    local reason="${3:-not specified}"

    gl_log "🚫⚠️💼🔥" \
        "subscription_canceled" \
        "$customer" \
        "Canceled $tier plan. Reason: $reason"
}

# Template: Invoice paid
gl_invoice_paid() {
    local customer="$1"
    local amount="$2"
    local currency="${3:-usd}"

    gl_log "💰✅🎢🌍" \
        "invoice_paid" \
        "$customer" \
        "Payment successful: \$$amount $currency"
}

# Template: Invoice payment failed
gl_invoice_failed() {
    local customer="$1"
    local amount="$2"
    local error="${3:-declined}"

    gl_log "❌🚨💳🔥" \
        "invoice_failed" \
        "$customer" \
        "Payment failed: \$$amount ($error)"
}

# Template: Payment retry
gl_payment_retry() {
    local customer="$1"
    local attempt="$2"

    gl_log "🔁💳⚡⭐" \
        "payment_retry" \
        "$customer" \
        "Payment retry attempt #$attempt"
}

# Template: Coupon applied
gl_coupon_applied() {
    local customer="$1"
    local coupon_code="$2"
    local discount="$3"

    gl_log "🎁💳✅📌" \
        "coupon_applied" \
        "$customer" \
        "Coupon $coupon_code applied: $discount"
}

# Template: Trial started
gl_trial_started() {
    local customer="$1"
    local tier="$2"
    local trial_days="$3"

    gl_log "🎟️🆕👤📌" \
        "trial_started" \
        "$customer" \
        "Trial started: $tier plan, $trial_days days"
}

# Template: Customer created
gl_customer_created() {
    local email="$1"
    local customer_id="$2"

    gl_log "📝👤✅👉" \
        "customer_created" \
        "$email" \
        "Stripe customer: $customer_id"
}

# Template: Payment method attached
gl_payment_method_attached() {
    local customer="$1"
    local pm_type="$2"
    local last4="${3:-****}"

    gl_log "🔍💳✅📌" \
        "payment_method" \
        "$customer" \
        "Payment method added: $pm_type ending in $last4"
}

# Template: Subscription past due
gl_subscription_past_due() {
    local customer="$1"
    local days_overdue="$2"

    gl_log "⚠️🚨💼🔥" \
        "past_due" \
        "$customer" \
        "Subscription past due: $days_overdue days"
}

# Template: Cancel scheduled
gl_cancel_scheduled() {
    local customer="$1"
    local tier="$2"
    local cancel_date="$3"

    gl_log "📅⚠️💼⭐" \
        "cancel_scheduled" \
        "$customer" \
        "$tier subscription ends on $cancel_date - retention opportunity!"
}

# ═══════════════════════════════════════════════════════
# AI TEMPLATES (HuggingFace Integration)
# ═══════════════════════════════════════════════════════

# Template: Model loading
gl_model_loading() {
    local model_name="$1"
    local size="${2:-unknown}"

    gl_log "🤗📥👉📌" \
        "model_loading" \
        "$model_name" \
        "Loading model: $size"
}

# Template: Model ready
gl_model_ready() {
    local model_name="$1"
    local vram="${2:-unknown}"

    gl_log "🧠✅🎢⭐" \
        "model_ready" \
        "$model_name" \
        "Model loaded, VRAM: $vram"
}

# Template: Inference started
gl_inference_start() {
    local task_type="$1"
    local model="$2"
    local request_id="${3:-unknown}"

    local task_emoji=""
    case "$task_type" in
        chat) task_emoji="💬" ;;
        text_gen) task_emoji="💬" ;;
        image_gen) task_emoji="🎨" ;;
        embeddings) task_emoji="🔤" ;;
        ocr) task_emoji="🔍" ;;
        tts) task_emoji="🎙️" ;;
        video_gen) task_emoji="🎥" ;;
        *) task_emoji="🤖" ;;
    esac

    gl_log "⚡${task_emoji}👉📌" \
        "inference_start" \
        "$model" \
        "$task_type inference started: $request_id"
}

# Template: Inference complete
gl_inference_complete() {
    local task_type="$1"
    local model="$2"
    local duration="${3:-unknown}"

    local task_emoji=""
    case "$task_type" in
        chat) task_emoji="💬" ;;
        text_gen) task_emoji="💬" ;;
        image_gen) task_emoji="🎨" ;;
        embeddings) task_emoji="🔤" ;;
        ocr) task_emoji="🔍" ;;
        *) task_emoji="🤖" ;;
    esac

    gl_log "✅${task_emoji}🎢🎉" \
        "inference_complete" \
        "$model" \
        "$task_type complete in $duration"
}

# Template: Inference failed
gl_inference_failed() {
    local task_type="$1"
    local model="$2"
    local error="${3:-unknown error}"

    gl_log "❌⚡🤖🔥" \
        "inference_failed" \
        "$model" \
        "$task_type failed: $error"
}

# Template: Endpoint created
gl_endpoint_created() {
    local endpoint_name="$1"
    local model="$2"
    local instance_type="${3:-unknown}"

    local instance_emoji=""
    case "$instance_type" in
        *t4*) instance_emoji="🟢" ;;
        *l4*) instance_emoji="🔵" ;;
        *a10g*) instance_emoji="🟡" ;;
        *a100*) instance_emoji="🟠" ;;
        *h100*) instance_emoji="🔴" ;;
        *) instance_emoji="🖥️" ;;
    esac

    gl_log "🚀🌐${instance_emoji}✅" \
        "endpoint_created" \
        "$endpoint_name" \
        "Endpoint created: $model on $instance_type"
}

# Template: Endpoint paused
gl_endpoint_paused() {
    local endpoint_name="$1"

    gl_log "⏸️🌐👉📌" \
        "endpoint_paused" \
        "$endpoint_name" \
        "Endpoint paused (cost savings)"
}

# Template: Endpoint resumed
gl_endpoint_resumed() {
    local endpoint_name="$1"

    gl_log "▶️🌐👉📌" \
        "endpoint_resumed" \
        "$endpoint_name" \
        "Endpoint resumed"
}

# Template: Space deployed
gl_space_deployed() {
    local space_name="$1"
    local url="$2"

    gl_log "🚀🤗🌐✅" \
        "space_deployed" \
        "$space_name" \
        "Space deployed: $url"
}

# ═══════════════════════════════════════════════════════
# LINEAR TEMPLATES (Project Management Integration)
# ═══════════════════════════════════════════════════════

# Template: Issue created
gl_issue_created() {
    local identifier="$1"
    local title="$2"
    local label="${3:-feature}"

    local label_emoji=""
    case "$label" in
        feature) label_emoji="✨" ;;
        bug) label_emoji="🐛" ;;
        improvement) label_emoji="🔧" ;;
        security) label_emoji="🔒" ;;
        performance) label_emoji="⚡" ;;
        *) label_emoji="📋" ;;
    esac

    gl_log "⚡${label_emoji}👉📌" \
        "issue_created" \
        "$identifier" \
        "$title"
}

# Template: Issue state changed
gl_issue_state_changed() {
    local identifier="$1"
    local old_state="$2"
    local new_state="$3"

    local state_emoji=""
    case "$new_state" in
        "Todo") state_emoji="📥📝" ;;
        "In Progress") state_emoji="⚙️🔄" ;;
        "In Review") state_emoji="✔️👀" ;;
        "Done") state_emoji="🎉✅" ;;
        "Canceled") state_emoji="📦❌" ;;
        *) state_emoji="📋" ;;
    esac

    gl_log "${state_emoji}👉📌" \
        "state_changed" \
        "$identifier" \
        "$old_state → $new_state"
}

# Template: Issue completed
gl_issue_completed() {
    local identifier="$1"
    local title="$2"
    local duration="${3:-unknown}"

    gl_log "🎉✅🎢🌍" \
        "issue_completed" \
        "$identifier" \
        "$title (completed in $duration)"
}

# Template: Issue blocked
gl_issue_blocked() {
    local identifier="$1"
    local reason="$2"

    gl_log "🔒⚠️👉🔥" \
        "issue_blocked" \
        "$identifier" \
        "Blocked: $reason"
}

# Template: PR linked
gl_pr_linked() {
    local identifier="$1"
    local pr_url="$2"

    gl_log "🔗📋🎢📌" \
        "pr_linked" \
        "$identifier" \
        "PR: $pr_url"
}

# Template: PR merged
gl_pr_merged() {
    local identifier="$1"
    local pr_number="$2"

    gl_log "✅🔗🎢🎉" \
        "pr_merged" \
        "$identifier" \
        "PR #$pr_number merged, issue completed"
}

# ═══════════════════════════════════════════════════════
# SLACK TEMPLATES (Team Communication Integration)
# ═══════════════════════════════════════════════════════

# Template: Slash command executed
gl_slack_command() {
    local command="$1"
    local user="$2"
    local args="${3:-}"

    gl_log "💬⚡👉📌" \
        "slack_command" \
        "$command" \
        "Executed by: $user, args: $args"
}

# Template: Message sent to channel
gl_slack_message_sent() {
    local channel="$1"
    local message_type="${2:-notification}"

    gl_log "💬📤👉📌" \
        "message_sent" \
        "$channel" \
        "Type: $message_type"
}

# Template: Mention received
gl_slack_mention() {
    local user="$1"
    local channel="$2"

    gl_log "🔔💬👉⭐" \
        "mention_received" \
        "$user" \
        "In channel: $channel"
}

# Template: Alert sent to Slack
gl_slack_alert() {
    local severity="$1"  # critical, warning, info
    local title="$2"
    local channel="${3:-ops-alerts}"

    local severity_emoji=""
    case "$severity" in
        critical) severity_emoji="🚨" ;;
        warning) severity_emoji="⚠️" ;;
        info) severity_emoji="ℹ️" ;;
        *) severity_emoji="📢" ;;
    esac

    gl_log "${severity_emoji}💬🎢🔥" \
        "slack_alert" \
        "$title" \
        "Severity: $severity, Channel: #$channel"
}

# Template: Deployment notification sent
gl_slack_deployment_notification() {
    local status="$1"  # started, success, failed
    local service="$2"
    local environment="$3"

    local status_emoji=""
    case "$status" in
        started) status_emoji="🚀" ;;
        success) status_emoji="✅" ;;
        failed) status_emoji="❌" ;;
        *) status_emoji="⚙️" ;;
    esac

    gl_log "${status_emoji}💬🎢📌" \
        "slack_deployment" \
        "$service" \
        "Status: $status, Env: $environment"
}

# Template: GreenLight update posted
gl_slack_greenlight_update() {
    local item_id="$1"
    local from_state="$2"
    local to_state="$3"

    gl_log "🚦💬👉📌" \
        "slack_greenlight" \
        "$item_id" \
        "$from_state → $to_state"
}

# Template: Linear notification sent
gl_slack_linear_notification() {
    local action="$1"  # created, updated, completed
    local identifier="$2"

    local action_emoji=""
    case "$action" in
        created) action_emoji="🆕" ;;
        updated) action_emoji="📝" ;;
        completed) action_emoji="✅" ;;
        *) action_emoji="📋" ;;
    esac

    gl_log "${action_emoji}💬👉📌" \
        "slack_linear" \
        "$identifier" \
        "Action: $action"
}

# Template: GitHub notification sent
gl_slack_github_notification() {
    local type="$1"  # pr_opened, pr_merged, push, issue
    local repo="$2"
    local title="${3:-}"

    local type_emoji=""
    case "$type" in
        pr_opened) type_emoji="🔀" ;;
        pr_merged) type_emoji="🎉" ;;
        push) type_emoji="📤" ;;
        issue) type_emoji="🐛" ;;
        *) type_emoji="🐙" ;;
    esac

    gl_log "${type_emoji}💬👉📌" \
        "slack_github" \
        "$repo" \
        "Type: $type, $title"
}

# Template: Stripe notification sent
gl_slack_stripe_notification() {
    local event="$1"  # payment_success, payment_failed, subscription_created, etc.
    local customer="$2"
    local amount="${3:-}"

    local event_emoji=""
    case "$event" in
        payment_success) event_emoji="💰" ;;
        payment_failed) event_emoji="❌" ;;
        subscription_created) event_emoji="🎉" ;;
        subscription_canceled) event_emoji="👋" ;;
        *) event_emoji="💳" ;;
    esac

    gl_log "${event_emoji}💬👉📌" \
        "slack_stripe" \
        "$customer" \
        "Event: $event, Amount: $amount"
}

# Template: Approval request sent
gl_slack_approval_request() {
    local type="$1"  # deployment, access, expense, other
    local requester="$2"
    local title="${3:-}"

    gl_log "🔔💬👉⭐" \
        "approval_request" \
        "$requester" \
        "Type: $type, $title"
}

# Template: Approval decision
gl_slack_approval_decision() {
    local decision="$1"  # approved, rejected
    local approver="$2"
    local request_id="$3"

    local decision_emoji=""
    case "$decision" in
        approved) decision_emoji="✅" ;;
        rejected) decision_emoji="❌" ;;
        *) decision_emoji="💬" ;;
    esac

    gl_log "${decision_emoji}💬👉📌" \
        "approval_decision" \
        "$request_id" \
        "Decision: $decision by $approver"
}

# Template: Reaction added
gl_slack_reaction() {
    local emoji="$1"
    local message_id="$2"
    local user="$3"

    gl_log "👍💬👉📌" \
        "reaction_added" \
        "$message_id" \
        "Emoji: $emoji by $user"
}

# Template: Standup posted
gl_slack_standup() {
    local user="$1"
    local date="$2"

    gl_log "☀️💬👉📌" \
        "standup_posted" \
        "$user" \
        "Date: $date"
}

# Template: Modal opened
gl_slack_modal_opened() {
    local modal_type="$1"
    local user="$2"

    gl_log "📋💬👉📌" \
        "modal_opened" \
        "$modal_type" \
        "User: $user"
}

# ═══════════════════════════════════════════════════════
# NOTION TEMPLATES (Knowledge Management Integration)
# ═══════════════════════════════════════════════════════

# Template: Page created
gl_notion_page_created() {
    local page_title="$1"
    local database="$2"
    local creator="${3:-unknown}"

    gl_log "⚡📄👉📌" \
        "page_created" \
        "$page_title" \
        "Database: $database, Creator: $creator"
}

# Template: Page updated
gl_notion_page_updated() {
    local page_title="$1"
    local update_type="${2:-content}"

    local update_emoji=""
    case "$update_type" in
        content) update_emoji="✏️" ;;
        properties) update_emoji="🔢" ;;
        title) update_emoji="📝" ;;
        *) update_emoji="⚙️" ;;
    esac

    gl_log "${update_emoji}📄👉📌" \
        "page_updated" \
        "$page_title" \
        "Type: $update_type"
}

# Template: Page published
gl_notion_page_published() {
    local page_title="$1"
    local public_url="$2"

    gl_log "🎉📰🎢🌍" \
        "page_published" \
        "$page_title" \
        "Public URL: $public_url"
}

# Template: Database item added
gl_notion_db_item_added() {
    local database_name="$1"
    local item_title="$2"

    gl_log "📊📥👉📌" \
        "db_item_added" \
        "$database_name" \
        "$item_title"
}

# Template: Status changed
gl_notion_status_changed() {
    local item_title="$1"
    local old_status="$2"
    local new_status="$3"

    local status_emoji=""
    case "$new_status" in
        "Not started") status_emoji="⚪" ;;
        "In progress") status_emoji="🔵" ;;
        "Done") status_emoji="✅" ;;
        "Blocked") status_emoji="🔴" ;;
        *) status_emoji="🚦" ;;
    esac

    gl_log "${status_emoji}🚦👉📌" \
        "status_changed" \
        "$item_title" \
        "$old_status → $new_status"
}

# Template: Task completed
gl_notion_task_completed() {
    local task_title="$1"
    local assignee="$2"
    local duration="${3:-unknown}"

    gl_log "☑️✅🎢📌" \
        "task_completed" \
        "$task_title" \
        "By: $assignee, Duration: $duration"
}

# Template: Comment added
gl_notion_comment_added() {
    local page_title="$1"
    local commenter="$2"
    local preview="${3:0:50}"

    gl_log "💬📝👉⭐" \
        "comment_added" \
        "$page_title" \
        "$commenter: $preview..."
}

# Template: Notion sync completed
gl_notion_sync_completed() {
    local sync_type="$1"
    local items_synced="$2"
    local duration="$3"

    gl_log "✅🔄🎢📌" \
        "sync_completed" \
        "$sync_type" \
        "$items_synced items synced in $duration"
}

# ═══════════════════════════════════════════════════════
# CANVA TEMPLATES (Design Workflow Integration)
# ═══════════════════════════════════════════════════════

# Template: Design created
gl_canva_design_created() {
    local design_title="$1"
    local design_type="$2"
    local creator="${3:-unknown}"

    local type_emoji=""
    case "$design_type" in
        social_post|instagram|facebook|twitter) type_emoji="📱" ;;
        presentation|slides) type_emoji="📄" ;;
        document|report) type_emoji="📰" ;;
        video|animation) type_emoji="🎬" ;;
        graphic|logo|icon) type_emoji="🖼️" ;;
        email|newsletter) type_emoji="📧" ;;
        infographic|chart) type_emoji="📊" ;;
        *) type_emoji="🎨" ;;
    esac

    gl_log "⚡${type_emoji}👉📌" \
        "design_created" \
        "$design_title" \
        "Type: $design_type, Creator: $creator"
}

# Template: Design edited
gl_canva_design_edited() {
    local design_title="$1"
    local edit_type="${2:-content}"

    local edit_emoji=""
    case "$edit_type" in
        content) edit_emoji="✏️" ;;
        layout) edit_emoji="⊞" ;;
        style) edit_emoji="🎨" ;;
        text) edit_emoji="📝" ;;
        *) edit_emoji="⚙️" ;;
    esac

    gl_log "${edit_emoji}🎨👉📌" \
        "design_edited" \
        "$design_title" \
        "Edit type: $edit_type"
}

# Template: Design published
gl_canva_design_published() {
    local design_title="$1"
    local platform="${2:-web}"
    local url="${3:-}"

    local platform_emoji=""
    case "$platform" in
        web) platform_emoji="🌐" ;;
        instagram) platform_emoji="📱" ;;
        facebook) platform_emoji="📘" ;;
        twitter) platform_emoji="🐦" ;;
        linkedin) platform_emoji="💼" ;;
        *) platform_emoji="🎨" ;;
    esac

    gl_log "🎉${platform_emoji}🎢🌍" \
        "design_published" \
        "$design_title" \
        "Platform: $platform, URL: $url"
}

# Template: Asset uploaded
gl_canva_asset_uploaded() {
    local asset_type="$1"
    local asset_name="$2"
    local size="${3:-unknown}"

    local asset_emoji=""
    case "$asset_type" in
        image|photo) asset_emoji="🖼️" ;;
        video|clip) asset_emoji="🎬" ;;
        audio|sound) asset_emoji="🎵" ;;
        *) asset_emoji="📤" ;;
    esac

    gl_log "📤${asset_emoji}👉📌" \
        "asset_uploaded" \
        "$asset_name" \
        "Type: $asset_type, Size: $size"
}

# Template: Export completed
gl_canva_export_completed() {
    local design_title="$1"
    local format="$2"
    local file_size="$3"
    local duration="${4:-unknown}"

    local format_emoji=""
    case "$format" in
        PNG|JPG|JPEG) format_emoji="🖼️" ;;
        PDF) format_emoji="📄" ;;
        MP4|MOV) format_emoji="🎬" ;;
        GIF) format_emoji="🎞️" ;;
        SVG) format_emoji="🎨" ;;
        *) format_emoji="📦" ;;
    esac

    gl_log "✅${format_emoji}🎢📌" \
        "export_completed" \
        "$design_title" \
        "Format: $format, Size: $file_size, Duration: $duration"
}

# Template: Approval granted
gl_canva_approval_granted() {
    local design_title="$1"
    local approver="$2"
    local feedback="${3:-approved}"

    gl_log "✅👍🎢📌" \
        "approval_granted" \
        "$design_title" \
        "By: $approver, Feedback: $feedback"
}

# Template: Comment added
gl_canva_comment_added() {
    local design_title="$1"
    local commenter="$2"
    local preview="${3:0:50}"

    gl_log "💬🎨👉⭐" \
        "comment_added" \
        "$design_title" \
        "$commenter: $preview..."
}

# Template: Brand kit updated
gl_canva_brand_kit_updated() {
    local brand_name="$1"
    local update_type="$2"
    local details="$3"

    local update_emoji=""
    case "$update_type" in
        logo) update_emoji="🏷️" ;;
        colors) update_emoji="🎨" ;;
        fonts) update_emoji="🔤" ;;
        templates) update_emoji="🖼️" ;;
        *) update_emoji="🎯" ;;
    esac

    gl_log "${update_emoji}🎯🎢📌" \
        "brand_kit_updated" \
        "$brand_name" \
        "Updated: $update_type - $details"
}

# Show help
show_help() {
    cat <<'EOF'
GreenLight Memory Templates

USAGE:
    source memory-greenlight-templates.sh
    gl_<template> [args...]

CORE TEMPLATES:

    gl_announce <agent> <project> <tasks> <goal> [scale] [domain] [priority]
        Announce work with GreenLight tags

    gl_progress <agent> <completed> <next> [scale] [domain]
        Update progress on work

    gl_coordinate <from> <to> <message> [priority]
        Request coordination with another Claude

    gl_blocked <agent> <reason> <needs> [priority]
        Report being blocked

    gl_deploy <service> <url> <details> [scale] [domain]
        Log deployment

    gl_decide <topic> <decision> <rationale> [scale]
        Log architectural decision

    gl_bug <component> <description> [priority] [scale]
        Report a bug

    gl_feature <name> <description> [effort] [priority]
        Request a feature

    gl_phase_start <phase> <project> <details> [scale]
        Start project phase (discovery/planning/implementation/testing/deployment)

    gl_phase_done <phase> <project> <summary> [scale]
        Complete project phase

    gl_wip <task> <status> [agent] [scale]
        Update work in progress

    gl_depends <task> <depends_on> <reason>
        Log dependency

CI/CD TEMPLATES:

    gl_workflow_trigger <repo> <trigger>
        Workflow triggered (push/pr/manual)

    gl_workflow_step <repo> <step> <status>
        Workflow step complete (lint/test/build/deploy, passed/failed)

    gl_workflow_done <repo> <status> <duration>
        Workflow complete (passed/failed, duration)

CLOUDFLARE TEMPLATES:

    gl_worker_deploy <worker> <env> <version>
        Worker deployed (staging/production)

    gl_d1_migrate <database> <migration>
        D1 database migration

    gl_kv_update <namespace> <operation>
        KV namespace operation (created/updated/deleted)

    gl_r2_operation <bucket> <operation> <size>
        R2 bucket operation

BILLING TEMPLATES (Stripe):

    gl_webhook_received <event_type> <event_id>
        Stripe webhook received

    gl_checkout_complete <email> <tier> <amount>
        Checkout session completed

    gl_subscription_created <customer> <tier> <sub_id>
        New subscription created

    gl_subscription_updated <customer> <old_tier> <new_tier>
        Subscription plan changed

    gl_subscription_canceled <customer> <tier> [reason]
        Subscription canceled

    gl_invoice_paid <customer> <amount> [currency]
        Invoice payment successful

    gl_invoice_failed <customer> <amount> [error]
        Invoice payment failed

    gl_payment_retry <customer> <attempt>
        Payment retry attempt

    gl_coupon_applied <customer> <code> <discount>
        Promo code applied

    gl_trial_started <customer> <tier> <days>
        Trial period started

    gl_customer_created <email> <customer_id>
        Stripe customer created

    gl_payment_method_attached <customer> <type> [last4]
        Payment method added

    gl_subscription_past_due <customer> <days>
        Subscription payment overdue

    gl_cancel_scheduled <customer> <tier> <date>
        Subscription cancellation scheduled

AI TEMPLATES (HuggingFace):

    gl_model_loading <model_name> [size]
        Model loading into memory

    gl_model_ready <model_name> [vram]
        Model loaded and ready

    gl_inference_start <task_type> <model> [request_id]
        AI inference started (chat/image_gen/embeddings/ocr/etc)

    gl_inference_complete <task_type> <model> [duration]
        AI inference completed

    gl_inference_failed <task_type> <model> [error]
        AI inference failed

    gl_endpoint_created <endpoint> <model> [instance_type]
        HF Inference Endpoint created

    gl_endpoint_paused <endpoint>
        Endpoint paused for cost savings

    gl_endpoint_resumed <endpoint>
        Endpoint resumed

    gl_space_deployed <space_name> <url>
        HuggingFace Space deployed

LINEAR TEMPLATES (Project Management):

    gl_issue_created <identifier> <title> [label]
        Linear issue created (feature/bug/improvement/etc)

    gl_issue_state_changed <identifier> <old_state> <new_state>
        Issue state changed (Todo/In Progress/In Review/Done)

    gl_issue_completed <identifier> <title> [duration]
        Issue completed

    gl_issue_blocked <identifier> <reason>
        Issue blocked on dependency

    gl_pr_linked <identifier> <pr_url>
        Pull request linked to issue

    gl_pr_merged <identifier> <pr_number>
        Pull request merged, issue completed

SLACK TEMPLATES (Team Communication):

    gl_slack_command <command> <user> [args]
        Slash command executed (/deploy, /issue, etc)

    gl_slack_message_sent <channel> [message_type]
        Message sent to channel

    gl_slack_mention <user> <channel>
        User mentioned in channel

    gl_slack_alert <severity> <title> [channel]
        Alert sent to Slack (critical/warning/info)

    gl_slack_deployment_notification <status> <service> <environment>
        Deployment notification (started/success/failed)

    gl_slack_greenlight_update <item_id> <from_state> <to_state>
        GreenLight state change notification

    gl_slack_linear_notification <action> <identifier>
        Linear notification (created/updated/completed)

    gl_slack_github_notification <type> <repo> [title]
        GitHub notification (pr_opened/pr_merged/push/issue)

    gl_slack_stripe_notification <event> <customer> [amount]
        Stripe notification (payment_success/failed/etc)

    gl_slack_approval_request <type> <requester> [title]
        Approval request sent (deployment/access/expense)

    gl_slack_approval_decision <decision> <approver> <request_id>
        Approval decision (approved/rejected)

    gl_slack_reaction <emoji> <message_id> <user>
        Reaction added to message

    gl_slack_standup <user> <date>
        Standup update posted

    gl_slack_modal_opened <modal_type> <user>
        Modal dialog opened

NOTION TEMPLATES (Knowledge Management):

    gl_notion_page_created <page_title> <database> [creator]
        Notion page created in database

    gl_notion_page_updated <page_title> [update_type]
        Page updated (content/properties/title)

    gl_notion_page_published <page_title> <public_url>
        Page published to web

    gl_notion_db_item_added <database_name> <item_title>
        Database item added

    gl_notion_status_changed <item_title> <old_status> <new_status>
        Status changed (Not started/In progress/Done/Blocked)

    gl_notion_task_completed <task_title> <assignee> [duration]
        Task marked complete

    gl_notion_comment_added <page_title> <commenter> [preview]
        Comment added to page

    gl_notion_sync_completed <sync_type> <items_synced> <duration>
        Notion sync operation completed

CANVA TEMPLATES (Design Workflow):

    gl_canva_design_created <design_title> <design_type> [creator]
        Design created (instagram/presentation/video/etc)

    gl_canva_design_edited <design_title> [edit_type]
        Design edited (content/layout/style/text)

    gl_canva_design_published <design_title> [platform] [url]
        Design published (web/instagram/facebook/etc)

    gl_canva_asset_uploaded <asset_type> <asset_name> [size]
        Asset uploaded (image/video/audio)

    gl_canva_export_completed <design_title> <format> <file_size> [duration]
        Design exported (PNG/PDF/MP4/SVG)

    gl_canva_approval_granted <design_title> <approver> [feedback]
        Design approved

    gl_canva_comment_added <design_title> <commenter> [preview]
        Comment added to design

    gl_canva_brand_kit_updated <brand_name> <update_type> <details>
        Brand kit updated (logo/colors/fonts/templates)

EXAMPLES:

    # Announce work
    gl_announce "claude-api" "FastAPI deployment" "1) Setup 2) Database 3) Auth" "BlackRoad SaaS backend" "🎢" "🔧" "⭐"

    # Progress update
    gl_progress "claude-api" "Database configured" "Setting up OAuth" "👉" "🔧"

    # Coordinate
    gl_coordinate "claude-frontend" "claude-api" "Need API endpoint URLs for CORS setup" "⭐"

    # Deploy
    gl_deploy "api.blackroad.io" "https://api.blackroad.io" "FastAPI + PostgreSQL, Port 8080" "👉" "🔧"

    # Start phase
    gl_phase_start "implementation" "BlackRoad API" "Building core endpoints" "🎢"

    # Complete phase
    gl_phase_done "implementation" "BlackRoad API" "All endpoints complete, tests passing" "🎢"

GREENLIGHT TAGS:
    See ~/GREENLIGHT_EMOJI_DICTIONARY.md for full reference

COMMON COMBINATIONS:
    🚧👉🌀⭐  = WIP micro AI task, high priority
    ✅🎢🔧📌  = Done macro infra, medium priority
    🔒👉🛣️🔥  = Blocked micro platform, fire priority
    📐🎢🌀⭐  = Planning macro AI, high priority

EOF
}

# Main command handler
case "${1:-help}" in
    help|--help|-h)
        show_help
        ;;
    *)
        # If sourced, functions are available
        # If executed directly, show help
        if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
            show_help
        fi
        ;;
esac
