import { test as base, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Extend base test with axe fixture
export const test = base.extend<{ axe: AxeBuilder }>({
  axe: async ({ page }, use) => {
    await use(new AxeBuilder({ page }));
  },
});

export { expect };

// Pages to smoke test — path and a selector that confirms content loaded
export const pages = [
  { path: '/',           name: 'Home',       selector: '#products' },
  { path: '/Print',      name: 'Products',   selector: '#products' },
  { path: '/about',      name: 'About',      selector: 'section' },
  { path: '/events',     name: 'Events',     selector: 'section' },
  { path: '/links',      name: 'Links',      selector: '#links' },
  { path: '/contact',    name: 'Contact',    selector: 'iframe[title="Candy Fluffs Contact Form"]' },
  { path: '/2heroes',    name: '2Heroes',    selector: 'section:first-of-type' },
];

// Axe rules to disable globally — known false positives for this stack
export const axeDisabledRules = [
  'color-contrast', // Snipcart injects elements we can't control
];

// Helper: run axe and assert no critical/serious violations
export async function checkA11y(axe: AxeBuilder, disabledRules = axeDisabledRules) {
  const results = await axe
    .disableRules(disabledRules)
    .exclude('#kofiframe')
    .exclude('iframe[title="Candy Fluffs Contact Form"]')
    .analyze();

  const critical = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious'
  );

  if (critical.length > 0) {
    const summary = critical.map((v) =>
      `[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map((n) => n.target).join(', ')}`
    ).join('\n\n');
    throw new Error(`Accessibility violations found:\n\n${summary}`);
  }
}