import { useState } from "react";
import { CheckCircle, Link2, Unlink } from "lucide-react";

import Sidebar from "../../Components/SideBar/sideBar.jsx";
import Button from "../../Components/Button/button.jsx";
import { MANAGER_NAV_ITEMS, INITIAL_PROJECTS } from "./managerConstants.js";
import {
  getPmSettings,
  savePmSettings,
  DEFAULT_PM_SETTINGS,
} from "../../data/pmSettings.js";
import "../../App.css";
import "../Admin/admin.css";
import "./manager.css";

const TABS = [
  { key: "project", label: "Project" },
  { key: "notifications", label: "Notifications" },
  { key: "budget", label: "Budget" },
  { key: "integrations", label: "Integrations" },
];

const NOTIF_EVENTS = [
  { key: "taskAssigned", label: "Task assigned", desc: "When a task is assigned to you or your team." },
  { key: "commentAdded", label: "Comment added", desc: "New comments or @mentions on tasks you follow." },
  { key: "deadlineApproaching", label: "Deadline approaching", desc: "Reminders 48h before a task due date." },
  { key: "statusChanged", label: "Status changed", desc: "When a task moves to a new workflow column." },
  { key: "budgetAlert", label: "Budget alert", desc: "Alerts at 75%, 90%, and when budget is exceeded." },
];

const INTEGRATIONS = [
  { key: "slack", label: "Slack", desc: "Sync messages as task comments and post status updates." },
  { key: "github", label: "GitHub", desc: "Link commits and pull requests to project tasks." },
  { key: "googleDrive", label: "Google Drive", desc: "Attach files from Drive directly to tasks." },
];

function Toggle({ id, checked, onChange }) {
  return (
    <label className="toggle-switch" htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  );
}

function SettingRow({ title, description, children }) {
  return (
    <div className="admin-setting-row">
      <div className="admin-setting-label">
        <p className="admin-setting-title">{title}</p>
        {description && <p className="admin-setting-desc">{description}</p>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

export default function PMSettingsPage() {
  const [activeTab, setActiveTab] = useState("project");
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState(() => getPmSettings());
  const [budgetProjectId, setBudgetProjectId] = useState("p1");

  function patch(fn) {
    setSettings((prev) => {
      const next = fn(prev);
      return next;
    });
  }

  function handleSave() {
    savePmSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleConnect(key) {
    patch((s) => ({
      ...s,
      integrations: {
        ...s.integrations,
        [key]: { ...s.integrations[key], connected: true },
      },
    }));
  }

  function handleDisconnect(key) {
    patch((s) => ({
      ...s,
      integrations: {
        ...s.integrations,
        [key]: { ...s.integrations[key], connected: false },
      },
    }));
  }

  const budget = settings.budgets[budgetProjectId] || DEFAULT_PM_SETTINGS.budgets.p1;

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Manager Dashboard"
        navItems={MANAGER_NAV_ITEMS}
        activeKey="settings"
      />

      <main className="preview-main">
        <section className="preview-hero card">
          <p className="eyebrow">Project Manager</p>
          <h1 style={{ marginTop: 10, marginBottom: 12 }}>Settings</h1>
          <p className="lead">
            Configure project defaults, notification preferences (PM_20), budget
            limits (PM_17), and external integrations (PM_24).
          </p>
        </section>

        <div className="card admin-settings-card" style={{ maxWidth: 760 }}>
          <div className="admin-tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                className={`admin-tab${activeTab === t.key ? " tab-active" : ""}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "project" && (
            <div>
              <p className="admin-section-title">Project defaults (PM_25)</p>
              <SettingRow title="Default visibility" description="Applied when creating new projects.">
                <select
                  className="pm-select"
                  value={settings.projectDefaults.visibility}
                  onChange={(e) =>
                    patch((s) => ({
                      ...s,
                      projectDefaults: { ...s.projectDefaults, visibility: e.target.value },
                    }))
                  }
                >
                  <option value="Team">Team</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </SettingRow>
              <SettingRow title="Default methodology" description="Scrum, Kanban, or hybrid workflow.">
                <select
                  className="pm-select"
                  value={settings.projectDefaults.methodology}
                  onChange={(e) =>
                    patch((s) => ({
                      ...s,
                      projectDefaults: { ...s.projectDefaults, methodology: e.target.value },
                    }))
                  }
                >
                  <option value="Scrum">Scrum</option>
                  <option value="Kanban">Kanban</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </SettingRow>
              <SettingRow title="Default sprint length" description="Number of days per sprint.">
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    min={7}
                    max={28}
                    value={settings.projectDefaults.defaultSprintLength}
                    onChange={(e) =>
                      patch((s) => ({
                        ...s,
                        projectDefaults: {
                          ...s.projectDefaults,
                          defaultSprintLength: Number(e.target.value),
                        },
                      }))
                    }
                  />
                  <span className="admin-input-unit">days</span>
                </div>
              </SettingRow>
              <SettingRow
                title="Enforce minimum notification rules"
                description="Project-level rules override weaker personal preferences."
              >
                <Toggle
                  id="min-notif"
                  checked={settings.projectRules.requireMinNotifications}
                  onChange={(v) =>
                    patch((s) => ({
                      ...s,
                      projectRules: { ...s.projectRules, requireMinNotifications: v },
                    }))
                  }
                />
              </SettingRow>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <p className="admin-section-title">Personal preferences (PM_20)</p>
              {NOTIF_EVENTS.map((ev) => (
                <div key={ev.key} style={{ marginBottom: 8 }}>
                  <p className="admin-setting-title" style={{ marginBottom: 8 }}>{ev.label}</p>
                  <p className="admin-setting-desc" style={{ marginBottom: 10 }}>{ev.desc}</p>
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {["inApp", "email", "push"].map((ch) => (
                      <label key={ch} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#94a3b8" }}>
                        <input
                          type="checkbox"
                          checked={settings.notifications[ev.key]?.[ch] ?? false}
                          onChange={(e) =>
                            patch((s) => ({
                              ...s,
                              notifications: {
                                ...s.notifications,
                                [ev.key]: { ...s.notifications[ev.key], [ch]: e.target.checked },
                              },
                            }))
                          }
                        />
                        {ch === "inApp" ? "In-app" : ch.charAt(0).toUpperCase() + ch.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <SettingRow title="Daily digest for PMs" description="Summary of delayed and at-risk tasks.">
                <Toggle
                  id="daily-digest"
                  checked={settings.projectRules.dailyDigest}
                  onChange={(v) =>
                    patch((s) => ({
                      ...s,
                      projectRules: { ...s.projectRules, dailyDigest: v },
                    }))
                  }
                />
              </SettingRow>
            </div>
          )}

          {activeTab === "budget" && (
            <div>
              <p className="admin-section-title">Budget & limits (PM_17)</p>
              <SettingRow title="Project" description="Set hours and cost budget per project.">
                <select
                  className="pm-select"
                  value={budgetProjectId}
                  onChange={(e) => setBudgetProjectId(e.target.value)}
                >
                  {INITIAL_PROJECTS.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </SettingRow>
              <SettingRow title="Hours budget" description="Total billable hours allocated.">
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    min={10}
                    value={budget.hoursBudget}
                    onChange={(e) =>
                      patch((s) => ({
                        ...s,
                        budgets: {
                          ...s.budgets,
                          [budgetProjectId]: {
                            ...budget,
                            hoursBudget: Number(e.target.value),
                          },
                        },
                      }))
                    }
                  />
                  <span className="admin-input-unit">hours</span>
                </div>
              </SettingRow>
              <SettingRow title="Cost budget" description="Maximum project spend in currency.">
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    min={1000}
                    value={budget.costBudget}
                    onChange={(e) =>
                      patch((s) => ({
                        ...s,
                        budgets: {
                          ...s.budgets,
                          [budgetProjectId]: {
                            ...budget,
                            costBudget: Number(e.target.value),
                          },
                        },
                      }))
                    }
                  />
                  <span className="admin-input-unit">USD</span>
                </div>
              </SettingRow>
              <SettingRow title="Hourly rate" description="Used to compute cost from logged hours.">
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    min={25}
                    value={budget.hourlyRate}
                    onChange={(e) =>
                      patch((s) => ({
                        ...s,
                        budgets: {
                          ...s.budgets,
                          [budgetProjectId]: {
                            ...budget,
                            hourlyRate: Number(e.target.value),
                          },
                        },
                      }))
                    }
                  />
                  <span className="admin-input-unit">/hr</span>
                </div>
              </SettingRow>
              <SettingRow
                title="Manual override when exceeded"
                description="Allow task assignment after budget is fully used."
              >
                <Toggle
                  id="budget-override"
                  checked={budget.overrideEnabled}
                  onChange={(v) =>
                    patch((s) => ({
                      ...s,
                      budgets: {
                        ...s.budgets,
                        [budgetProjectId]: { ...budget, overrideEnabled: v },
                      },
                    }))
                  }
                />
              </SettingRow>
            </div>
          )}

          {activeTab === "integrations" && (
            <div>
              <p className="admin-section-title">External tools (PM_24)</p>
              {INTEGRATIONS.map((int) => {
                const cfg = settings.integrations[int.key];
                return (
                  <div key={int.key} className="admin-setting-row">
                    <div className="admin-setting-label">
                      <p className="admin-setting-title">{int.label}</p>
                      <p className="admin-setting-desc">{int.desc}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {cfg.connected ? (
                        <>
                          <span style={{ fontSize: 12, color: "#34d399" }}>Connected</span>
                          <Button variant="ghost" size="sm" onClick={() => handleDisconnect(int.key)}>
                            <Unlink size={14} /> Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button variant="primary" size="sm" onClick={() => handleConnect(int.key)}>
                          <Link2 size={14} /> Connect
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
              <p className="admin-section-title" style={{ marginTop: 16 }}>Sync options</p>
              <SettingRow title="Sync GitHub commits to tasks" description="Link commit messages to related task IDs.">
                <Toggle
                  id="gh-sync"
                  checked={settings.integrations.github?.syncCommits ?? false}
                  onChange={(v) =>
                    patch((s) => ({
                      ...s,
                      integrations: {
                        ...s.integrations,
                        github: { ...s.integrations.github, syncCommits: v },
                      },
                    }))
                  }
                />
              </SettingRow>
            </div>
          )}

          <div className="admin-settings-footer">
            <Button variant="primary" size="md" onClick={handleSave}>
              Save Changes
            </Button>
            {saved && (
              <span className="admin-save-banner">
                <CheckCircle size={15} />
                Settings saved successfully
              </span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
