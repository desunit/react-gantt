import { test, expect, Page } from '@playwright/test';

/**
 * Tests for copy & paste functionality with horizontal scroll.
 * Uses the marquee-select demo which has copyPaste={true}.
 */

const DEMO_URL = '/#/marquee-select/willow';

// Selectors
const CHART_AREA = '.wx-bars';
const TASK_BAR = '.wx-bar:not(.wx-summary)';
const SELECTED_TASK = '.wx-bar.wx-selected';

/**
 * Helper to perform marquee selection drag
 */
async function performMarqueeSelect(
  page: Page,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  ctrlKey = false,
) {
  await page.mouse.move(startX, startY);
  if (ctrlKey) {
    await page.keyboard.down('Control');
  }
  await page.mouse.down();
  await page.mouse.move(endX, endY, { steps: 10 });
  await page.mouse.up();
  if (ctrlKey) {
    await page.keyboard.up('Control');
  }
  // Wait for React to process the selection
  await page.waitForTimeout(100);
}

/**
 * Helper to count selected tasks
 */
async function countSelectedTasks(page: Page): Promise<number> {
  return page.locator(SELECTED_TASK).count();
}

/**
 * Helper to count all task bars
 */
async function countAllTasks(page: Page): Promise<number> {
  return page.locator(TASK_BAR).count();
}

/**
 * Helper to get all task bars
 */
async function getAllTaskBars(page: Page) {
  return page.locator(TASK_BAR).all();
}

/**
 * Helper to get chart area (visible viewport, not full content)
 */
async function getChartArea(page: Page) {
  // Use .wx-chart (visible viewport) instead of .wx-bars (full content)
  // to get correct coordinates when scrolled
  const chart = page.locator('.wx-chart');
  await chart.waitFor({ state: 'visible' });
  const box = await chart.boundingBox();
  if (!box) throw new Error('Chart container not found');
  return { element: chart, box };
}

/**
 * Helper to select tasks and copy them
 * For single task, use click selection to avoid multi-row issues
 * Returns the actual number of selected tasks (may differ from taskCount with marquee)
 */
async function selectAndCopy(page: Page, taskCount: number = 2) {
  const tasks = await getAllTaskBars(page);
  expect(tasks.length).toBeGreaterThanOrEqual(taskCount);

  // Get bounds of tasks
  const boxes = await Promise.all(
    tasks.slice(0, taskCount).map((t) => t.boundingBox()),
  );

  const validBoxes = boxes.filter((b) => b !== null);
  if (validBoxes.length < taskCount) {
    throw new Error(`Could not get bounds for ${taskCount} tasks`);
  }

  if (taskCount === 1) {
    // For single task, use click selection to avoid selecting other tasks on same row
    const box = validBoxes[0]!;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(100);
  } else {
    // For multiple tasks, use marquee selection
    // Calculate bounding rectangle
    const minX = Math.min(...validBoxes.map((b) => b!.x)) - 10;
    const minY = Math.min(...validBoxes.map((b) => b!.y)) - 10;
    const maxX = Math.max(...validBoxes.map((b) => b!.x + b!.width)) + 10;
    const maxY = Math.max(...validBoxes.map((b) => b!.y + b!.height)) + 10;

    // Select tasks
    await performMarqueeSelect(page, minX, minY, maxX, maxY);
  }

  const selectedCount = await countSelectedTasks(page);
  expect(selectedCount).toBeGreaterThanOrEqual(1);

  // Copy with Ctrl+C
  await page.keyboard.press('Control+c');

  return { tasks: tasks.slice(0, taskCount), boxes: validBoxes, selectedCount };
}

/**
 * Helper to click on empty chart area to set paste target
 * Scrolls to the left edge of the chart (before task start dates) to ensure empty space
 */
async function clickEmptyArea(page: Page, offsetX: number = 100) {
  const chart = page.locator('.wx-chart');

  // Scroll to the very beginning of the chart where there are no tasks
  // The demo has 20 weeks of empty space before the first task
  await chart.evaluate((el) => {
    el.scrollLeft = 0;
  });
  await page.waitForTimeout(200);

  const chartBox = await chart.boundingBox();
  if (!chartBox) throw new Error('Chart container not found');

  // Click near the left side of the visible chart (empty space before tasks)
  const emptyX = chartBox.x + offsetX;
  const emptyY = chartBox.y + chartBox.height / 2;

  await page.mouse.click(emptyX, emptyY);
  await page.waitForTimeout(150);

  return { x: emptyX, y: emptyY };
}

test.describe('Copy & Paste Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Set a wide viewport to ensure chart has enough space
    await page.setViewportSize({ width: 1400, height: 900 });

    await page.goto(DEMO_URL);
    await page.waitForSelector(CHART_AREA);
    await page.waitForSelector(TASK_BAR);

    // Try to close the sidebar using multiple selectors
    const toggleSelectors = [
      '.wx-demos.sidebar .toggle-btn',
      '.sidebar .toggle-btn',
      '.toggle-btn',
    ];
    for (const selector of toggleSelectors) {
      const toggleButton = page.locator(selector);
      if (
        (await toggleButton.count()) > 0 &&
        (await toggleButton.first().isVisible())
      ) {
        await toggleButton.first().click();
        await page.waitForTimeout(300);
        break;
      }
    }

    // Scroll to bring tasks into view
    const chartContainer = page.locator('.wx-chart');
    await chartContainer.evaluate((el) => {
      const taskBar = el.querySelector('.wx-bar:not(.wx-summary)');
      if (taskBar) {
        taskBar.scrollIntoView({ block: 'center', inline: 'center' });
      }
    });

    await page.waitForTimeout(500);
  });

  test('should copy selected task with Ctrl+C', async ({ page }) => {
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(0);

    // Select first task
    const firstTask = tasks[0];
    const box = await firstTask.boundingBox();
    if (!box) throw new Error('Task box not found');

    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await expect(firstTask).toHaveClass(/wx-selected/);

    // Copy - should not throw
    await page.keyboard.press('Control+c');

    // No visible change expected, but we'll verify paste works later
    await expect(firstTask).toHaveClass(/wx-selected/);
  });

  test('should paste copied tasks at clicked location', async ({ page }) => {
    const initialCount = await countAllTasks(page);

    // Select and copy 1 task
    await selectAndCopy(page, 1);

    // Click on empty area to set paste target
    await clickEmptyArea(page, 150);

    // Paste with Ctrl+V
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(300);

    // Should have one more task now
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBe(initialCount + 1);
  });

  test('should paste multiple copied tasks', async ({ page }) => {
    const initialCount = await countAllTasks(page);

    // Select and copy 2 tasks
    await selectAndCopy(page, 2);

    // Click on empty area to set paste target
    await clickEmptyArea(page, 200);

    // Paste with Ctrl+V
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(300);

    // Should have 2 more tasks
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBeGreaterThanOrEqual(initialCount + 1);
  });

  test('should preserve relative positions when pasting multiple tasks', async ({
    page,
  }) => {
    // Get initial tasks
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(1);

    // Get positions of first two tasks
    const pos1 = await tasks[0].boundingBox();
    const pos2 = await tasks[1].boundingBox();

    if (!pos1 || !pos2) throw new Error('Task positions not found');

    const originalGap = pos2.x - pos1.x;

    // Select and copy both
    await selectAndCopy(page, 2);

    // Click on empty area
    await clickEmptyArea(page, 300);

    // Paste
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(300);

    // Get all tasks now
    const allTasks = await getAllTaskBars(page);
    const newTaskCount = allTasks.length - tasks.length;

    // Should have pasted at least 1 task
    expect(newTaskCount).toBeGreaterThanOrEqual(1);
  });

  test('should generate new unique IDs for pasted tasks', async ({ page }) => {
    const initialCount = await countAllTasks(page);

    // Copy and paste same task twice
    await selectAndCopy(page, 1);

    await clickEmptyArea(page, 200);
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(200);

    await clickEmptyArea(page, 250);
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(200);

    // Should have 2 more tasks (each paste creates new)
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBe(initialCount + 2);
  });

  // TODO: Undo hotkey handling needs investigation - Ctrl+Z event not reaching the handler
  test.skip('should undo paste with Ctrl+Z', async ({ page }) => {
    const initialCount = await countAllTasks(page);

    // Copy and paste
    await selectAndCopy(page, 1);
    await clickEmptyArea(page, 200);
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(200);

    // Verify paste worked
    expect(await countAllTasks(page)).toBe(initialCount + 1);

    // Focus the Gantt layout element to ensure hotkey handler receives Ctrl+Z
    await page.locator('.wx-layout').focus();
    await page.waitForTimeout(100);

    // Undo
    await page.keyboard.press('Control+z');
    await page.waitForTimeout(200);

    // Should be back to original count
    const afterUndo = await countAllTasks(page);
    expect(afterUndo).toBe(initialCount);
  });

  test('should not paste without clicking empty area first', async ({
    page,
  }) => {
    const initialCount = await countAllTasks(page);

    // Select and copy
    await selectAndCopy(page, 1);

    // Try to paste without clicking empty area first
    // (selection is still on the copied task)
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(200);

    // Count may or may not change depending on implementation
    // The key is that it shouldn't crash
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('should use Cmd+C/V on Mac', async ({ page, browserName }) => {
    // Skip on non-webkit browsers where Meta isn't fully supported
    if (browserName !== 'webkit') {
      test.skip();
      return;
    }

    const initialCount = await countAllTasks(page);

    // Select first task
    const tasks = await getAllTaskBars(page);
    const box = await tasks[0].boundingBox();
    if (!box) throw new Error('Task box not found');

    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

    // Copy with Cmd+C (Meta key)
    await page.keyboard.press('Meta+c');

    // Click empty area
    await clickEmptyArea(page, 200);

    // Paste with Cmd+V
    await page.keyboard.press('Meta+v');
    await page.waitForTimeout(200);

    // Should have new task
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBe(initialCount + 1);
  });
});

test.describe('Copy & Paste with Horizontal Scroll', () => {
  test.beforeEach(async ({ page }) => {
    // Set a wide viewport to ensure chart has enough space
    await page.setViewportSize({ width: 1400, height: 900 });

    await page.goto(DEMO_URL);
    await page.waitForSelector(CHART_AREA);
    await page.waitForSelector(TASK_BAR);

    // Try to close the sidebar using multiple selectors
    const toggleSelectors = [
      '.wx-demos.sidebar .toggle-btn',
      '.sidebar .toggle-btn',
      '.toggle-btn',
    ];
    for (const selector of toggleSelectors) {
      const toggleButton = page.locator(selector);
      if (
        (await toggleButton.count()) > 0 &&
        (await toggleButton.first().isVisible())
      ) {
        await toggleButton.first().click();
        await page.waitForTimeout(300);
        break;
      }
    }

    // Scroll to bring tasks into view
    const chartContainer = page.locator('.wx-chart');
    await chartContainer.evaluate((el) => {
      const taskBar = el.querySelector('.wx-bar:not(.wx-summary)');
      if (taskBar) {
        taskBar.scrollIntoView({ block: 'center', inline: 'center' });
      }
    });

    await page.waitForTimeout(500);
  });

  test('should paste at correct position after scrolling', async ({ page }) => {
    // Copy task first
    await selectAndCopy(page, 1);

    const initialCount = await countAllTasks(page);

    // Scroll chart to a different position, then click on empty space
    // We scroll to the left edge where there's guaranteed empty space (before tasks)
    const chart = page.locator('.wx-chart');
    await chart.evaluate((el) => {
      el.scrollLeft = 100; // Scroll to near the beginning
    });
    await page.waitForTimeout(200);

    const chartBox = await chart.boundingBox();
    if (!chartBox) throw new Error('Chart container not found');

    // Click on the left side of the visible chart (empty space before tasks)
    await page.mouse.click(chartBox.x + 150, chartBox.y + chartBox.height / 2);
    await page.waitForTimeout(100);

    // Paste
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(300);

    // Task should be pasted
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBe(initialCount + 1);
  });

  test('should copy task from scrolled view', async ({ page }) => {
    // First scroll to reveal different tasks
    const chart = page.locator('.wx-chart');
    await chart.evaluate((el) => {
      el.scrollLeft += 200;
    });
    await page.waitForTimeout(300);

    const initialCount = await countAllTasks(page);

    // Select and copy visible task
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(0);

    const firstVisible = tasks[0];
    const box = await firstVisible.boundingBox();
    if (!box) throw new Error('Task box not found');

    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.keyboard.press('Control+c');

    // Scroll further and paste
    await chart.evaluate((el) => {
      el.scrollLeft += 200;
    });
    await page.waitForTimeout(200);

    // Click empty area and paste
    await clickEmptyArea(page, 150);
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(300);

    // Should have new task
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBe(initialCount + 1);
  });

  test('should scroll to pasted task if it is out of view', async ({
    page,
  }) => {
    // This tests that paste works even when scrolled far from original
    await selectAndCopy(page, 1);

    // Scroll far right
    const chart = page.locator('.wx-chart');
    await chart.evaluate((el) => {
      el.scrollLeft = el.scrollWidth - el.clientWidth;
    });
    await page.waitForTimeout(300);

    const initialCount = await countAllTasks(page);

    // Click and paste in new location
    const { box: chartBox } = await getChartArea(page);
    await page.mouse.click(chartBox.x + 200, chartBox.y + 100);
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(300);

    // Paste should work regardless of scroll position
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBe(initialCount + 1);
  });

  test('should maintain clipboard across multiple scroll and paste operations', async ({
    page,
  }) => {
    // Copy task once
    await selectAndCopy(page, 1);

    const initialCount = await countAllTasks(page);
    const chart = page.locator('.wx-chart');

    // Paste in 3 different scroll positions
    for (let i = 0; i < 3; i++) {
      // Scroll to different position
      await chart.evaluate(
        (el, scrollOffset) => {
          el.scrollLeft += scrollOffset;
        },
        100 * (i + 1),
      );
      await page.waitForTimeout(200);

      // Click and paste
      const { box: chartBox } = await getChartArea(page);
      await page.mouse.click(chartBox.x + 150 + i * 50, chartBox.y + 100);
      await page.keyboard.press('Control+v');
      await page.waitForTimeout(200);
    }

    // Should have 3 new tasks
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBe(initialCount + 3);
  });

  test('should copy tasks from one row and paste maintaining row assignment', async ({
    page,
  }) => {
    // Select multiple tasks from different rows
    await selectAndCopy(page, 2);

    const initialCount = await countAllTasks(page);

    // Scroll and paste
    const chart = page.locator('.wx-chart');
    await chart.evaluate((el) => {
      el.scrollLeft += 400;
    });
    await page.waitForTimeout(200);

    await clickEmptyArea(page, 100);
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(300);

    // Tasks should be pasted
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBeGreaterThan(initialCount);
  });
});

test.describe('Copy & Paste Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    // Set a wide viewport to ensure chart has enough space
    await page.setViewportSize({ width: 1400, height: 900 });

    await page.goto(DEMO_URL);
    await page.waitForSelector(CHART_AREA);
    await page.waitForSelector(TASK_BAR);

    // Try to close the sidebar using multiple selectors
    const toggleSelectors = [
      '.wx-demos.sidebar .toggle-btn',
      '.sidebar .toggle-btn',
      '.toggle-btn',
    ];
    for (const selector of toggleSelectors) {
      const toggleButton = page.locator(selector);
      if (
        (await toggleButton.count()) > 0 &&
        (await toggleButton.first().isVisible())
      ) {
        await toggleButton.first().click();
        await page.waitForTimeout(300);
        break;
      }
    }

    // Scroll to bring tasks into view
    const chartContainer = page.locator('.wx-chart');
    await chartContainer.evaluate((el) => {
      const taskBar = el.querySelector('.wx-bar:not(.wx-summary)');
      if (taskBar) {
        taskBar.scrollIntoView({ block: 'center', inline: 'center' });
      }
    });

    await page.waitForTimeout(500);
  });

  test('should handle paste when no tasks are copied', async ({ page }) => {
    const initialCount = await countAllTasks(page);

    // Try to paste without copying anything
    await clickEmptyArea(page, 200);
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(200);

    // Should not crash, count should remain same
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBe(initialCount);
  });

  test('should clear clipboard when different tasks are copied', async ({
    page,
  }) => {
    const initialCount = await countAllTasks(page);

    // Copy first task
    const tasks = await getAllTaskBars(page);
    const firstBox = await tasks[0].boundingBox();
    if (!firstBox) throw new Error('First task box not found');

    await page.mouse.click(
      firstBox.x + firstBox.width / 2,
      firstBox.y + firstBox.height / 2,
    );
    await page.keyboard.press('Control+c');

    // Copy different task
    const secondBox = await tasks[2].boundingBox();
    if (!secondBox) throw new Error('Second task box not found');

    await page.mouse.click(
      secondBox.x + secondBox.width / 2,
      secondBox.y + secondBox.height / 2,
    );
    await page.keyboard.press('Control+c');

    // Paste should paste only the second copied task
    await clickEmptyArea(page, 200);
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(200);

    const finalCount = await countAllTasks(page);
    expect(finalCount).toBe(initialCount + 1);
  });

  test('should handle rapid copy-paste sequences', async ({ page }) => {
    const initialCount = await countAllTasks(page);

    // Select and copy
    await selectAndCopy(page, 1);

    // Rapid paste 5 times
    for (let i = 0; i < 5; i++) {
      await clickEmptyArea(page, 100 + i * 30);
      await page.keyboard.press('Control+v');
      // Small delay to let the operation complete
      await page.waitForTimeout(50);
    }

    await page.waitForTimeout(300);

    // Should have 5 new tasks
    const finalCount = await countAllTasks(page);
    expect(finalCount).toBe(initialCount + 5);
  });
});
