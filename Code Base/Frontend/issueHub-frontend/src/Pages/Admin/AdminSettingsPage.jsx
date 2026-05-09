import { useState } from "react";
import { CheckCircle } from "lucide-react";

import Sidebar from "../../Components/SideBar/sideBar.jsx";
import Button from "../../Components/Button/button.jsx";
import { ADMIN_NAV_ITEMS } from "./adminConstants.js";
import "../../App.css";
import "./admin.css";

const TABS = [
  { key: "security", label: "Security" },
  { key: "access", label: "Access Control" },
  { key: "notifications", label: "Notifications" },
  { key: "platform", label: "Platform" },
];

function Toggle({ id, checked, onChange }) {
  return (
    <label className="toggle-switch" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
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

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("security");
  const [saved, setSaved] = useState(false);

  // Security
  const [mfaForAll, setMfaForAll] = useState(false);
  const [mfaForAdmins, setMfaForAdmins] = useState(true);
  const [mfaForPMs, setMfaForPMs] = useState(true);
  const [adminSessionTimeout, setAdminSessionTimeout] = useState(15);
  const [userSessionTimeout, setUserSessionTimeout] = useState(30);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  const [lockoutDuration, setLockoutDuration] = useState(10);
  const [requireUppercase, setRequireUppercase] = useState(true);
  const [requireNumber, setRequireNumber] = useState(true);
  const [requireSpecial, setRequireSpecial] = useState(true);
  const [minPasswordLength, setMinPasswordLength] = useState(8);
  const [passwordRotationDays, setPasswordRotationDays] = useState(90);

  // Access Control
  const [maxActiveTasks, setMaxActiveTasks] = useState(10);
  const [requirePMApproval, setRequirePMApproval] = useState(true);
  const [allowDevSubtasks, setAllowDevSubtasks] = useState(false);
  const [allowSelfAssign, setAllowSelfAssign] = useState(false);
  const [devCanReopen, setDevCanReopen] = useState(false);

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [notifyPMsMaintenance, setNotifyPMsMaintenance] = useState(true);
  const [notifyAllUsers, setNotifyAllUsers] = useState(false);
  const [maintenanceNoticeHours, setMaintenanceNoticeHours] = useState(48);
  const [dailyDigest, setDailyDigest] = useState(false);

  // Platform
  const [platformName, setPlatformName] = useState("IssueHub");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [dataRetentionDays, setDataRetentionDays] = useState(365);
  const [allowGuestView, setAllowGuestView] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Admin Panel"
        navItems={ADMIN_NAV_ITEMS}
        enableNavigation={true}
        activeKey="settings"
      />

      <main className="preview-main">
        {/* Header */}
        <section className="preview-hero card">
          <p className="eyebrow">System Administrator</p>
          <h1 style={{ marginTop: 10, marginBottom: 12 }}>Settings</h1>
          <p className="lead">
            Configure platform-wide security policies, access control rules,
            notification preferences, and system behaviour. All changes are
            recorded in the audit log.
          </p>
        </section>

        {/* Settings card */}
        <div className="card admin-settings-card" style={{ maxWidth: 760 }}>
          {/* Tabs */}
          <div className="admin-tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`admin-tab${activeTab === t.key ? " tab-active" : ""}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Security tab ── */}
          {activeTab === "security" && (
            <div>
              <p className="admin-section-title">Multi-Factor Authentication</p>

              <SettingRow
                title="Require MFA for all users"
                description="Every user must set up MFA before accessing the platform."
              >
                <Toggle id="mfa-all" checked={mfaForAll} onChange={setMfaForAll} />
              </SettingRow>

              <SettingRow
                title="Require MFA for admins"
                description="System Administrators must always use MFA. Cannot be disabled."
              >
                <Toggle id="mfa-admins" checked={mfaForAdmins} onChange={setMfaForAdmins} />
              </SettingRow>

              <SettingRow
                title="Require MFA for Project Managers"
                description="Project Managers must authenticate with a second factor."
              >
                <Toggle id="mfa-pms" checked={mfaForPMs} onChange={setMfaForPMs} />
              </SettingRow>

              <p className="admin-section-title" style={{ marginTop: 20 }}>
                Session Policy
              </p>

              <SettingRow
                title="Admin session timeout"
                description="Inactive admin sessions are terminated after this period."
              >
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    value={adminSessionTimeout}
                    min={5}
                    max={60}
                    onChange={(e) => setAdminSessionTimeout(Number(e.target.value))}
                  />
                  <span className="admin-input-unit">min</span>
                </div>
              </SettingRow>

              <SettingRow
                title="User session timeout"
                description="Standard user sessions (Developer / PM) expire after inactivity."
              >
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    value={userSessionTimeout}
                    min={10}
                    max={120}
                    onChange={(e) => setUserSessionTimeout(Number(e.target.value))}
                  />
                  <span className="admin-input-unit">min</span>
                </div>
              </SettingRow>

              <p className="admin-section-title" style={{ marginTop: 20 }}>
                Login Security
              </p>

              <SettingRow
                title="Max failed login attempts"
                description="Account is temporarily locked after this many consecutive failures."
              >
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    value={maxLoginAttempts}
                    min={3}
                    max={10}
                    onChange={(e) => setMaxLoginAttempts(Number(e.target.value))}
                  />
                  <span className="admin-input-unit">tries</span>
                </div>
              </SettingRow>

              <SettingRow
                title="Lockout window"
                description="Period during which failed attempts are counted toward the limit."
              >
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    value={lockoutDuration}
                    min={5}
                    max={60}
                    onChange={(e) => setLockoutDuration(Number(e.target.value))}
                  />
                  <span className="admin-input-unit">min</span>
                </div>
              </SettingRow>

              <p className="admin-section-title" style={{ marginTop: 20 }}>
                Password Policy
              </p>

              <SettingRow
                title="Minimum password length"
                description="Passwords shorter than this will be rejected."
              >
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    value={minPasswordLength}
                    min={6}
                    max={32}
                    onChange={(e) => setMinPasswordLength(Number(e.target.value))}
                  />
                  <span className="admin-input-unit">chars</span>
                </div>
              </SettingRow>

              <SettingRow
                title="Require uppercase letter"
                description="Password must contain at least one uppercase character."
              >
                <Toggle id="pw-upper" checked={requireUppercase} onChange={setRequireUppercase} />
              </SettingRow>

              <SettingRow
                title="Require number"
                description="Password must contain at least one numeric digit."
              >
                <Toggle id="pw-num" checked={requireNumber} onChange={setRequireNumber} />
              </SettingRow>

              <SettingRow
                title="Require special character"
                description="Password must contain at least one special character (e.g. !@#$%)."
              >
                <Toggle id="pw-special" checked={requireSpecial} onChange={setRequireSpecial} />
              </SettingRow>

              <SettingRow
                title="Admin password rotation"
                description="Admin accounts must rotate their password every N days."
              >
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    value={passwordRotationDays}
                    min={30}
                    max={365}
                    onChange={(e) => setPasswordRotationDays(Number(e.target.value))}
                  />
                  <span className="admin-input-unit">days</span>
                </div>
              </SettingRow>
            </div>
          )}

          {/* ── Access Control tab ── */}
          {activeTab === "access" && (
            <div>
              <p className="admin-section-title">Task Limits</p>

              <SettingRow
                title="Max active tasks per developer"
                description="Developers cannot be assigned more than this many open tasks simultaneously."
              >
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    value={maxActiveTasks}
                    min={1}
                    max={50}
                    onChange={(e) => setMaxActiveTasks(Number(e.target.value))}
                  />
                  <span className="admin-input-unit">tasks</span>
                </div>
              </SettingRow>

              <p className="admin-section-title" style={{ marginTop: 20 }}>
                Workflow Rules
              </p>

              <SettingRow
                title="Require PM approval to close tasks"
                description="Developers cannot mark tasks as Done without a Project Manager approval."
              >
                <Toggle id="pm-approve" checked={requirePMApproval} onChange={setRequirePMApproval} />
              </SettingRow>

              <SettingRow
                title="Allow developers to create subtasks"
                description="Developers can break their assigned tasks into smaller subtasks."
              >
                <Toggle id="dev-subtasks" checked={allowDevSubtasks} onChange={setAllowDevSubtasks} />
              </SettingRow>

              <SettingRow
                title="Allow self-assignment"
                description="Developers can assign unassigned tasks to themselves."
              >
                <Toggle id="self-assign" checked={allowSelfAssign} onChange={setAllowSelfAssign} />
              </SettingRow>

              <SettingRow
                title="Allow developers to reopen tasks"
                description="If disabled, only Project Managers and Admins can reopen closed tasks."
              >
                <Toggle id="dev-reopen" checked={devCanReopen} onChange={setDevCanReopen} />
              </SettingRow>
            </div>
          )}

          {/* ── Notifications tab ── */}
          {activeTab === "notifications" && (
            <div>
              <p className="admin-section-title">Email Notifications</p>

              <SettingRow
                title="Enable email notifications"
                description="Platform will send email alerts for assignments, mentions, and status changes."
              >
                <Toggle id="email-notif" checked={emailNotifications} onChange={setEmailNotifications} />
              </SettingRow>

              <SettingRow
                title="Daily digest email"
                description="Users receive a daily summary of their tasks and activity."
              >
                <Toggle id="daily-digest" checked={dailyDigest} onChange={setDailyDigest} />
              </SettingRow>

              <p className="admin-section-title" style={{ marginTop: 20 }}>
                Maintenance Alerts
              </p>

              <SettingRow
                title="Notify Project Managers of maintenance"
                description="PMs receive an advance notice before any scheduled downtime."
              >
                <Toggle
                  id="notify-pm-maint"
                  checked={notifyPMsMaintenance}
                  onChange={setNotifyPMsMaintenance}
                />
              </SettingRow>

              <SettingRow
                title="Notify all users of maintenance"
                description="All platform users receive maintenance notices, not just PMs."
              >
                <Toggle
                  id="notify-all-maint"
                  checked={notifyAllUsers}
                  onChange={setNotifyAllUsers}
                />
              </SettingRow>

              <SettingRow
                title="Maintenance notice period"
                description="Minimum advance notice required before scheduled downtime."
              >
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    value={maintenanceNoticeHours}
                    min={12}
                    max={168}
                    onChange={(e) => setMaintenanceNoticeHours(Number(e.target.value))}
                  />
                  <span className="admin-input-unit">hours</span>
                </div>
              </SettingRow>
            </div>
          )}

          {/* ── Platform tab ── */}
          {activeTab === "platform" && (
            <div>
              <p className="admin-section-title">General</p>

              <SettingRow
                title="Platform name"
                description="The name shown in the browser title bar and emails."
              >
                <input
                  type="text"
                  className="admin-text-input"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  maxLength={40}
                />
              </SettingRow>

              <SettingRow
                title="Data retention period"
                description="Closed project data and audit logs are kept for this duration."
              >
                <div className="admin-input-group">
                  <input
                    type="number"
                    className="admin-number-input"
                    value={dataRetentionDays}
                    min={90}
                    max={1825}
                    onChange={(e) => setDataRetentionDays(Number(e.target.value))}
                  />
                  <span className="admin-input-unit">days</span>
                </div>
              </SettingRow>

              <SettingRow
                title="Allow guest / read-only view"
                description="External stakeholders can be given a view-only link to specific projects."
              >
                <Toggle id="guest-view" checked={allowGuestView} onChange={setAllowGuestView} />
              </SettingRow>

              <p className="admin-section-title" style={{ marginTop: 20 }}>
                Maintenance
              </p>

              <SettingRow
                title="Maintenance mode"
                description={
                  maintenanceMode
                    ? "⚠ Platform is currently in maintenance mode. All non-admin users are locked out."
                    : "Enabling this will immediately lock out all non-admin users."
                }
              >
                <Toggle
                  id="maint-mode"
                  checked={maintenanceMode}
                  onChange={setMaintenanceMode}
                />
              </SettingRow>

              {maintenanceMode && (
                <div
                  style={{
                    marginTop: 12,
                    padding: "12px 16px",
                    borderRadius: 8,
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#f87171",
                    fontSize: 13,
                  }}
                >
                  Maintenance mode is active. Developers and Project Managers cannot log in.
                  Disable this setting to restore access.
                </div>
              )}
            </div>
          )}

          {/* Footer */}
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
