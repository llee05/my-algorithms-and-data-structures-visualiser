import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('steps forwards and backwards through a comparison and swap', async ({
  page,
}) => {
  await page.getByLabel('Your array').fill('3, 1, 2')
  await page.getByRole('button', { name: 'Apply' }).click()
  await page.getByRole('button', { name: 'Next step' }).click()
  await expect(page.getByRole('status')).toContainText('Compare 3 and 1')
  await expect(page.getByTestId('comparison-count')).toHaveText('1')
  await page.getByRole('button', { name: 'Next step' }).click()
  await expect(page.getByRole('status')).toContainText('Swap 3 and 1')
  await expect(page.getByTestId('swap-count')).toHaveText('1')
  await page.getByRole('button', { name: 'Previous step' }).click()
  await expect(page.getByTestId('swap-count')).toHaveText('0')
  await page.getByRole('button', { name: 'Reset visualisation' }).click()
  await expect(page.getByTestId('comparison-count')).toHaveText('0')
  await expect(
    page.getByRole('button', { name: 'Previous step' }),
  ).toBeDisabled()
})

test('plays to completion and replays', async ({ page }) => {
  await page.getByLabel('Your array').fill('3, 2, 1')
  await page.getByRole('button', { name: 'Apply' }).click()
  await page.getByLabel('Playback speed').selectOption('4')
  await page.getByRole('button', { name: 'Play', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Pause', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('status')).toContainText('All sorted!', {
    timeout: 10_000,
  })
  const bars = page.getByTestId('array-bar')
  await expect(bars.nth(0)).toHaveAttribute('data-value', '1')
  await expect(bars.nth(1)).toHaveAttribute('data-value', '2')
  await expect(bars.nth(2)).toHaveAttribute('data-value', '3')
  await expect(page.getByRole('button', { name: 'Next step' })).toBeDisabled()
  await page.getByRole('button', { name: 'Replay' }).click()
  await expect(
    page.getByRole('button', { name: 'Pause', exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Pause', exact: true }).click()
  const pausedFrame = await page.getByTestId('step-counter').textContent()
  await page.waitForTimeout(400)
  await expect(page.getByTestId('step-counter')).toHaveText(pausedFrame!)
})

test('validates input and resets playback when applying a new array', async ({
  page,
}) => {
  await page.getByLabel('Your array').fill('1, oops, 100')
  await page.getByRole('button', { name: 'Apply' }).click()
  await expect(page.getByRole('alert')).toContainText(
    'whole numbers from 1 to 99',
  )
  await expect(page.getByTestId('array-bar')).toHaveCount(8)
  await page.getByLabel('Your array').fill('9, 2')
  await page.getByRole('button', { name: 'Apply' }).click()
  await expect(page.getByRole('alert')).toHaveCount(0)
  await page.getByRole('button', { name: 'Next step' }).click()
  await page.getByRole('button', { name: 'Shuffle' }).click()
  await expect(page.getByTestId('comparison-count')).toHaveText('0')
  await expect(
    page.getByRole('button', { name: 'Previous step' }),
  ).toBeDisabled()
  await expect(page.getByTestId('array-bar')).toHaveCount(2)
})

test('seeks on the timeline and highlights the corresponding code line', async ({
  page,
}) => {
  const timeline = page.getByRole('slider', { name: 'Execution step' })
  await timeline.focus()
  await timeline.press('ArrowRight')
  await expect(page.locator('.code-line[aria-current="step"]')).toContainText(
    'if (array[i] > array[i + 1])',
  )
  await timeline.press('End')
  await expect(page.getByRole('status')).toContainText('All sorted!')
})

test('works at a mobile viewport without horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(
    page.getByRole('heading', { name: 'Bubble sort', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Play', exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Quick guide' }).click()
  await expect(page.locator('#quick-guide')).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
})
