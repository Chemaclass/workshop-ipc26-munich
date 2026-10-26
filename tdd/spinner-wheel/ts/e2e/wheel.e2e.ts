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

  await expect(
    page.getByRole('listitem').filter({ hasText: 'Gus' }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Spinner wheel' }).getByText('Gus'),
  ).toBeVisible();
});

test('shows an error when adding a duplicate name', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Name').fill('anna k.');
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByRole('alert')).toHaveText(
    'anna k. is already on the wheel. Add a last initial to tell them apart.',
  );
  await expect(page.getByRole('listitem')).toHaveCount(6);
});

test('removes a name from the team and the wheel', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Remove Ben' }).click();

  await expect(
    page.getByRole('listitem').filter({ hasText: 'Ben' }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('img', { name: 'Spinner wheel' }).getByText('Ben'),
  ).toHaveCount(0);
});

test('asks for someone when spinning an empty wheel', async ({ page }) => {
  await page.goto('/');
  for (const name of ['Anna K.', 'Ben', 'Chema', 'Dana', 'Emil', 'Fatma']) {
    await page.getByRole('button', { name: `Remove ${name}` }).click();
  }

  await page.getByRole('button', { name: 'Spin' }).click();

  await expect(page.getByRole('status')).toHaveText(
    'Add someone before you spin.',
  );
});

test('keeps the team after a reload', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Name').fill('Gus');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Remove Ben' }).click();

  await page.reload();

  await expect(page.getByRole('listitem')).toHaveCount(6);
  await expect(page.getByRole('listitem')).toContainText([
    'Anna K.',
    'Chema',
    'Dana',
    'Emil',
    'Fatma',
    'Gus',
  ]);
});

// {"names":["Anna K.","Ben","Chema"],"seed":42} as UTF-8 base64
const SHARED = '#eyJuYW1lcyI6WyJBbm5hIEsuIiwiQmVuIiwiQ2hlbWEiXSwic2VlZCI6NDJ9';

test('a shared link spins the same pick from its seed', async ({ page }) => {
  await page.goto(`/${SHARED}`);

  await page.getByRole('button', { name: 'Spin' }).click();

  await expect(page.getByRole('status')).toHaveText('Ben leads the next retro', {
    timeout: 10_000,
  });
});

test('a shared link shows its team read-only', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Name').fill('Gus');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.goto(`/${SHARED}`);

  await expect(page.getByText('Shared wheel, read-only')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveText(['Anna K.', 'Ben', 'Chema']);
  await expect(page.getByLabel('Name')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /^Remove/ })).toHaveCount(0);

  await page.goto('/');
  await expect(page.getByRole('listitem').filter({ hasText: 'Gus' })).toBeVisible();
});

test('a broken link offers to continue with the saved team', async ({ page }) => {
  await page.goto('/#not-a-wheel');

  await expect(page.getByRole('alert')).toHaveText('This link is broken.');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('listitem')).toHaveCount(6);
  await expect(page.getByLabel('Name')).toBeVisible();
});

test('never picks the previous winner, and links leave that alone', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.5;
  });
  const spinAndExpect = async (winner: string) => {
    await page.getByRole('button', { name: 'Spin' }).click();
    await expect(page.getByRole('status')).toHaveText(
      `${winner} leads the next retro`,
      { timeout: 10_000 },
    );
  };

  await page.goto('/');
  await spinAndExpect('Dana');

  await page.goto(`/${SHARED}`);
  await spinAndExpect('Ben');

  await page.goto('/');
  await spinAndExpect('Chema');
});

test('celebrates the result with confetti', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Spin' }).click();

  await expect(page.getByRole('status')).toContainText('leads the next retro', {
    timeout: 10_000,
  });
  await expect(page.locator('canvas')).toHaveCount(1);
});
