import { test, expect, Page } from '@playwright/test';

/**
 * Tests for marquee selection functionality in the Gantt chart.
 * Uses the marquee-select demo route which has multiTaskRows and marqueeSelect enabled.
 */

const DEMO_URL = '/#/marquee-select/willow';

// Selectors
const CHART_AREA = '.wx-bars';
const TASK_BAR = '.wx-bar:not(.wx-summary)';
const SELECTED_TASK = '.wx-bar.wx-selected';
const MARQUEE_RECT = '.wx-marquee-selection';

interface TaskBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Helper to get task bar bounds by task ID attribute or index
 */
async function getTaskBounds(
  page: Page,
  taskSelector: string,
): Promise<TaskBounds> {
  const task = page.locator(taskSelector).first();
  const box = await task.boundingBox();
  if (!box) throw new Error(`Task not found: ${taskSelector}`);
  return box;
}

/**
 * Helper to get the chart viewport element and its bounds
 * Returns the .wx-chart container (visible viewport), not the full content .wx-bars
 */
async function getChartArea(page: Page) {
  const chart = page.locator('.wx-chart');
  await chart.waitFor({ state: 'visible' });
  const box = await chart.boundingBox();
  if (!box) throw new Error('Chart container not found');
  return { element: chart, box };
}

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
 * Helper to get all visible task bars
 */
async function getAllTaskBars(page: Page) {
  return page.locator(TASK_BAR).all();
}

test.describe('Marquee Selection', () => {
  test.beforeEach(async ({ page }) => {
    // Set a wide viewport to ensure chart has enough space
    await page.setViewportSize({ width: 1400, height: 900 });

    await page.goto(DEMO_URL);
    // Wait for Gantt to fully load
    await page.waitForSelector(CHART_AREA);
    await page.waitForSelector(TASK_BAR);

    // Try to close the sidebar using multiple selectors
    const toggleSelectors = [
      '.wx-demos.sidebar .toggle-btn',
      '.sidebar .toggle-btn',
      '.toggle-btn',
      'button[aria-label*="sidebar"]',
      'button[aria-label*="menu"]',
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

    // Wait for tasks to render
    await page.waitForTimeout(500);
  });

  test('should show marquee rectangle while dragging on empty space', async ({
    page,
  }) => {
    // Get the chart scrollable container to find the visible chart area
    const chartContainer = page.locator('.wx-chart');
    await chartContainer.waitFor({ state: 'visible' });
    const containerBox = await chartContainer.boundingBox();
    if (!containerBox) throw new Error('Chart container not found');

    console.log('Chart container box:', containerBox);

    // Use the chart container's visible area, not the full .wx-bars element
    // Start drag on empty area (use center of container)
    const startX = containerBox.x + 50;
    const startY = containerBox.y + containerBox.height / 2;
    const endX = startX + 200;
    const endY = startY + 100;

    console.log('Click position:', { startX, startY });

    // Check what element is at the click position
    const elementAtPoint = await page.evaluate(
      ({ x, y }) => {
        const el = document.elementFromPoint(x, y);
        if (!el) return null;
        let current: Element | null = el;
        const classes: string[] = [];
        while (current && classes.length < 5) {
          if (current.className) classes.push(current.className.toString());
          current = current.parentElement;
        }
        return { tag: el.tagName, class: el.className, parents: classes };
      },
      { x: startX, y: startY },
    );
    console.log(
      'Element at click position:',
      JSON.stringify(elementAtPoint, null, 2),
    );

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 5 });

    // Marquee rectangle should be visible during drag
    const marquee = page.locator(MARQUEE_RECT);
    await expect(marquee).toBeVisible();

    await page.mouse.up();
  });

  test('should select single task with small marquee', async ({ page }) => {
    // Get first visible task bar
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(0);

    const firstTask = tasks[0];
    const taskBox = await firstTask.boundingBox();
    if (!taskBox) throw new Error('Task box not found');

    // Create marquee that covers just this task
    const startX = taskBox.x - 5;
    const startY = taskBox.y - 5;
    const endX = taskBox.x + taskBox.width + 5;
    const endY = taskBox.y + taskBox.height + 5;

    await performMarqueeSelect(page, startX, startY, endX, endY);

    // Should have exactly 1 selected task
    const selectedCount = await countSelectedTasks(page);
    expect(selectedCount).toBe(1);

    // The first task should be selected
    await expect(firstTask).toHaveClass(/wx-selected/);
  });

  test('should select multiple tasks across rows with large marquee', async ({
    page,
  }) => {
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(3);

    // Get bounds of first and second tasks (on different rows for multiTaskRows demo)
    const firstTaskBox = await tasks[0].boundingBox();
    const secondTaskBox = await tasks[3].boundingBox(); // tasks[3] is on nakamura row
    if (!firstTaskBox || !secondTaskBox)
      throw new Error('Task boxes not found');

    // Create a marquee that encompasses both tasks
    // Stay within the task Y range (don't go above/below into headers)
    const startX = Math.min(firstTaskBox.x, secondTaskBox.x) - 10;
    const startY = Math.min(firstTaskBox.y, secondTaskBox.y) - 5; // Small padding above
    const endX =
      Math.max(
        firstTaskBox.x + firstTaskBox.width,
        secondTaskBox.x + secondTaskBox.width,
      ) + 10;
    const endY =
      Math.max(
        firstTaskBox.y + firstTaskBox.height,
        secondTaskBox.y + secondTaskBox.height,
      ) + 5;

    await performMarqueeSelect(page, startX, startY, endX, endY);

    // Should have multiple tasks selected
    const selectedCount = await countSelectedTasks(page);
    expect(selectedCount).toBeGreaterThan(1);
  });

  test('should replace selection on plain marquee drag', async ({ page }) => {
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(4);

    // First selection - select first task (tasks[0] is on horizon-anderson row)
    const firstTaskBox = await tasks[0].boundingBox();
    if (!firstTaskBox) throw new Error('First task box not found');

    await performMarqueeSelect(
      page,
      firstTaskBox.x - 5,
      firstTaskBox.y - 5,
      firstTaskBox.x + firstTaskBox.width + 5,
      firstTaskBox.y + firstTaskBox.height + 5,
    );

    expect(await countSelectedTasks(page)).toBe(1);
    await expect(tasks[0]).toHaveClass(/wx-selected/);

    // Second selection without Ctrl - use task on DIFFERENT row to avoid multi-task-row collision
    // tasks[3] is on horizon-nakamura row (different Y position)
    const secondTaskBox = await tasks[3].boundingBox();
    if (!secondTaskBox) throw new Error('Second task box not found');

    await performMarqueeSelect(
      page,
      secondTaskBox.x - 5,
      secondTaskBox.y - 5,
      secondTaskBox.x + secondTaskBox.width + 5,
      secondTaskBox.y + secondTaskBox.height + 5,
    );

    // Only the new task should be selected now (tasks[3])
    expect(await countSelectedTasks(page)).toBe(1);
    await expect(tasks[0]).not.toHaveClass(/wx-selected/);
    await expect(tasks[3]).toHaveClass(/wx-selected/);
  });

  test('should add to selection with Ctrl+marquee', async ({ page }) => {
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(4);

    // First selection - select first task (tasks[0] on horizon-anderson row)
    const firstTaskBox = await tasks[0].boundingBox();
    if (!firstTaskBox) throw new Error('First task box not found');

    await performMarqueeSelect(
      page,
      firstTaskBox.x - 5,
      firstTaskBox.y - 5,
      firstTaskBox.x + firstTaskBox.width + 5,
      firstTaskBox.y + firstTaskBox.height + 5,
    );

    expect(await countSelectedTasks(page)).toBe(1);

    // Second selection with Ctrl - use task on DIFFERENT row
    // tasks[3] is on horizon-nakamura row
    const thirdTaskBox = await tasks[3].boundingBox();
    if (!thirdTaskBox) throw new Error('Third task box not found');

    await performMarqueeSelect(
      page,
      thirdTaskBox.x - 5,
      thirdTaskBox.y - 5,
      thirdTaskBox.x + thirdTaskBox.width + 5,
      thirdTaskBox.y + thirdTaskBox.height + 5,
      true, // Ctrl key
    );

    // Both tasks should now be selected
    expect(await countSelectedTasks(page)).toBe(2);
    await expect(tasks[0]).toHaveClass(/wx-selected/);
    await expect(tasks[3]).toHaveClass(/wx-selected/);
  });

  test('should toggle selection with Ctrl+marquee on already selected task', async ({
    page,
  }) => {
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(3);

    // Get boxes for first task and a task on different row
    const firstTaskBox = await tasks[0].boundingBox();
    const secondTaskBox = await tasks[3].boundingBox(); // tasks[3] is on nakamura row
    if (!firstTaskBox || !secondTaskBox)
      throw new Error('Task boxes not found');

    // First, select first task with marquee
    await performMarqueeSelect(
      page,
      firstTaskBox.x - 5,
      firstTaskBox.y - 5,
      firstTaskBox.x + firstTaskBox.width + 5,
      firstTaskBox.y + firstTaskBox.height + 5,
    );
    expect(await countSelectedTasks(page)).toBe(1);

    // Add second task with Ctrl+marquee
    await performMarqueeSelect(
      page,
      secondTaskBox.x - 5,
      secondTaskBox.y - 5,
      secondTaskBox.x + secondTaskBox.width + 5,
      secondTaskBox.y + secondTaskBox.height + 5,
      true, // Ctrl key - adds to selection
    );

    const initialCount = await countSelectedTasks(page);
    expect(initialCount).toBe(2);
    await expect(tasks[0]).toHaveClass(/wx-selected/);
    await expect(tasks[3]).toHaveClass(/wx-selected/);

    // Now Ctrl+marquee on first task only - should toggle it off
    await performMarqueeSelect(
      page,
      firstTaskBox.x - 5,
      firstTaskBox.y - 5,
      firstTaskBox.x + firstTaskBox.width + 5,
      firstTaskBox.y + firstTaskBox.height + 5,
      true, // Ctrl key
    );

    // First task should be deselected, second should still be selected
    await expect(tasks[0]).not.toHaveClass(/wx-selected/);
    await expect(tasks[3]).toHaveClass(/wx-selected/);
    expect(await countSelectedTasks(page)).toBe(1);
  });

  test('should not start marquee when clicking on a task bar', async ({
    page,
  }) => {
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(0);

    const firstTask = tasks[0];
    const taskBox = await firstTask.boundingBox();
    if (!taskBox) throw new Error('Task box not found');

    // Click on task center - should select task, not start marquee
    const centerX = taskBox.x + taskBox.width / 2;
    const centerY = taskBox.y + taskBox.height / 2;

    await page.mouse.click(centerX, centerY);

    // Task should be selected via click
    await expect(firstTask).toHaveClass(/wx-selected/);

    // Marquee should not be visible
    const marquee = page.locator(MARQUEE_RECT);
    await expect(marquee).not.toBeVisible();
  });

  test('should clear selection when clicking empty area without drag', async ({
    page,
  }) => {
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(0);

    // First, select a task via marquee (to ensure proper selection)
    const firstTaskBox = await tasks[0].boundingBox();
    if (!firstTaskBox) throw new Error('Task box not found');

    await performMarqueeSelect(
      page,
      firstTaskBox.x - 5,
      firstTaskBox.y - 5,
      firstTaskBox.x + firstTaskBox.width + 5,
      firstTaskBox.y + firstTaskBox.height + 5,
    );
    await expect(tasks[0]).toHaveClass(/wx-selected/);
    expect(await countSelectedTasks(page)).toBe(1);

    // Get the visible chart container and bars area
    const { box: chartBox } = await getChartArea(page);

    // Drag on empty space to the FAR LEFT of the selected task
    // Use left side of visible area at same Y level
    // Since tasks start in March 2026 and chart shows earlier dates on left,
    // the far left should have no tasks
    const emptyStartX = chartBox.x + 20; // Far left of visible viewport
    const emptyEndX = chartBox.x + 80; // Still in left portion
    const emptyStartY = firstTaskBox.y - 5; // Just above task
    const emptyEndY = firstTaskBox.y + 10; // Small Y range

    await performMarqueeSelect(
      page,
      emptyStartX,
      emptyStartY,
      emptyEndX,
      emptyEndY,
    );

    // Selection should be cleared (non-Ctrl marquee with no intersecting tasks)
    expect(await countSelectedTasks(page)).toBe(0);
  });
});

test.describe('Marquee Selection with Horizontal Scroll', () => {
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
      'button[aria-label*="sidebar"]',
      'button[aria-label*="menu"]',
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

  test('should maintain selection after horizontal scroll', async ({
    page,
  }) => {
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(0);

    // Select a task
    const firstTaskBox = await tasks[0].boundingBox();
    if (!firstTaskBox) throw new Error('Task box not found');

    await performMarqueeSelect(
      page,
      firstTaskBox.x - 5,
      firstTaskBox.y - 5,
      firstTaskBox.x + firstTaskBox.width + 5,
      firstTaskBox.y + firstTaskBox.height + 5,
    );

    expect(await countSelectedTasks(page)).toBe(1);

    // Scroll horizontally - need to scroll the .wx-chart container, not .wx-bars
    const chartContainer = page.locator('.wx-chart');
    await chartContainer.evaluate((el) => {
      el.scrollLeft += 200;
    });

    // Wait for re-render
    await page.waitForTimeout(100);

    // Selection should still be maintained
    expect(await countSelectedTasks(page)).toBe(1);
  });

  test('should select tasks that become visible after scrolling', async ({
    page,
  }) => {
    // Scroll to the right to reveal more tasks - use .wx-chart container
    const chartContainer = page.locator('.wx-chart');
    await chartContainer.evaluate((el) => {
      el.scrollLeft += 300;
    });
    await page.waitForTimeout(200);

    // Now perform marquee selection on newly visible tasks
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(0);

    const visibleTaskBox = await tasks[0].boundingBox();
    if (!visibleTaskBox) throw new Error('Task box not found after scroll');

    await performMarqueeSelect(
      page,
      visibleTaskBox.x - 5,
      visibleTaskBox.y - 5,
      visibleTaskBox.x + visibleTaskBox.width + 5,
      visibleTaskBox.y + visibleTaskBox.height + 5,
    );

    // Task should be selected
    expect(await countSelectedTasks(page)).toBeGreaterThanOrEqual(1);
  });
});
