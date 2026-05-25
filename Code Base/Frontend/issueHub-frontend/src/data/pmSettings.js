const STORAGE_KEY = "issuehub_pm_settings";

export const DEFAULT_PM_SETTINGS = {
  notifications: {
    taskAssigned: { inApp: true, email: true, push: false },
    commentAdded: { inApp: true, email: true, push: false },
    deadlineApproaching: { inApp: true, email: true, push: true },
    statusChanged: { inApp: true, email: false, push: false },
    budgetAlert: { inApp: true, email: true, push: true },
  },
  projectRules: {
    requireMinNotifications: true,
    dailyDigest: true,
  },
  budgets: {
    p1: { hoursBudget: 200, costBudget: 15000, hourlyRate: 75, overrideEnabled: false },
    p2: { hoursBudget: 120, costBudget: 9000, hourlyRate: 75, overrideEnabled: false },
  },
  integrations: {
    slack: { connected: false, syncComments: true },
    github: { connected: true, syncCommits: true },
    googleDrive: { connected: false, syncAttachments: true },
  },
  projectDefaults: {
    visibility: "Team",
    methodology: "Scrum",
    defaultSprintLength: 14,
  },
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PM_SETTINGS };
    return { ...DEFAULT_PM_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PM_SETTINGS };
  }
}

export function getPmSettings() {
  return load();
}

export function savePmSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  return settings;
}

export function getProjectBudget(projectId) {
  const s = load();
  return s.budgets[projectId] || {
    hoursBudget: 100,
    costBudget: 7500,
    hourlyRate: 75,
    overrideEnabled: false,
  };
}

export function getBudgetUsage(projectId, loggedHours) {
  const budget = getProjectBudget(projectId);
  const hoursUsed = loggedHours;
  const costUsed = hoursUsed * (budget.hourlyRate || 75);
  const hoursPct =
    budget.hoursBudget > 0 ? (hoursUsed / budget.hoursBudget) * 100 : 0;
  const costPct =
    budget.costBudget > 0 ? (costUsed / budget.costBudget) * 100 : 0;
  const pct = Math.max(hoursPct, costPct);
  let alertLevel = null;
  if (pct >= 100) alertLevel = "exceeded";
  else if (pct >= 90) alertLevel = "90";
  else if (pct >= 75) alertLevel = "75";
  return {
    hoursUsed,
    costUsed,
    hoursPct,
    costPct,
    pct,
    alertLevel,
    budget,
    blocked: pct >= 100 && !budget.overrideEnabled,
  };
}
