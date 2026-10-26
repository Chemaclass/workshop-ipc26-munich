import { expect, test } from '@playwright/test';

test('shows a wheel with the example names', async ({ page }) => {
  await page.goto('/');

  const wheel = page.getByRole('img', { name: 'Spinner wheel' });
  for (const name of ['Anna K.', 'Ben', 'Chema', 'Dana', 'Emil', 'Fatma']) {
    await expect(wheel.getByText(name, { exact: true })).toBeVisible();
  }
});

test('spinning announces who leads the next retro', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.5;
  });
  await page.goto('/');

  await page.getByRole('button', { name: 'Spin' }).click();

  await expect(page.getByRole('status')).toHaveText(
    'Dana leads the next retro',
    { timeout: 10_000 },
  );
});

test('adds a name to the team and the wheel', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Name').fill('Gus');
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByRole('listitem').filter({ hasText: 'Gus' })).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Spinner wheel' }).getByText('Gus'),
  ).toBeVisible();
});
