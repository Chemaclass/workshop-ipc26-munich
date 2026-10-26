import { expect, test } from '@playwright/test';

test('shows a wheel with the example names', async ({ page }) => {
  await page.goto('/');

  const wheel = page.getByRole('img', { name: 'Spinner wheel' });
  for (const name of ['Anna K.', 'Ben', 'Chema', 'Dana', 'Emil', 'Fatma']) {
    await expect(wheel.getByText(name, { exact: true })).toBeVisible();
  }
});
