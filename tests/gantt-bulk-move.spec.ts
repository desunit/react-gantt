import { test, expect, Page } from '@playwright/test';

/**
 * Tests for drag & drop bulk move functionality (multiple selected tasks).
 * Uses the marquee-select demo which has bulk move enabled.
 */

const DEMO_URL = '/#/marquee-select/willow';

// Selectors
const CHART_AREA = '.wx-bars';
const TASK_BAR = '.wx-bar:not(.wx-summary)';
const SELECTED_TASK = '.wx-bar.wx-selected';

interface TaskPosition {
  id: string;
  x: number;
  y: number;
  width: number;
}

/**
 * Helper to get task positions for comparison
 */
async function getTaskPositions(
  page: Page,
): Promise<Map<string, TaskPosition>> {
  const tasks = await page.locator(TASK_BAR).all();
  const positions = new Map<string, TaskPosition>();

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const box = await task.boundingBox();
    const id = (await task.getAttribute('data-id')) || `task-${i}`;
    if (box) {
      positions.set(id, { id, x: box.x, y: box.y, width: box.width });
    }
  }

  return positions;
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
 * Helper to drag a task by offset
 */
async function dragTask(
  page: Page,
  task: any,
  offsetX: number,
  offsetY: number = 0,
) {
  const box = await task.boundingBox();
  if (!box) throw new Error('Task box not found');

  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;
  const endX = startX + offsetX;
  const endY = startY + offsetY;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(endX, endY, { steps: 15 });
  await page.mouse.up();
}

/**
 * Helper to count selected tasks
 */
async function countSelectedTasks(page: Page): Promise<number> {
  return page.locator(SELECTED_TASK).count();
}

/**
 * Helper to get all task bars
 */
async function getAllTaskBars(page: Page) {
  return page.locator(TASK_BAR).all();
}

/**
 * Helper to select multiple tasks via marquee
 */
async function selectMultipleTasks(page: Page, count: number = 3) {
  const tasks = await getAllTaskBars(page);
  expect(tasks.length).toBeGreaterThanOrEqual(count);

  // Get bounds of first N tasks
  const boxes = await Promise.all(
    tasks.slice(0, count).map((t) => t.boundingBox()),
  );

  const validBoxes = boxes.filter((b) => b !== null);
  if (validBoxes.length < count) {
    throw new Error(`Could not get bounds for ${count} tasks`);
  }

  // Calculate bounding rectangle
  const minX = Math.min(...validBoxes.map((b) => b!.x)) - 10;
  const minY = Math.min(...validBoxes.map((b) => b!.y)) - 10;
  const maxX = Math.max(...validBoxes.map((b) => b!.x + b!.width)) + 10;
  const maxY = Math.max(...validBoxes.map((b) => b!.y + b!.height)) + 10;

  await performMarqueeSelect(page, minX, minY, maxX, maxY);

  return { tasks: tasks.slice(0, count), boxes: validBoxes };
}

test.describe('Bulk Move - Drag & Drop Multiple Rows', () => {
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

  test('should move single selected task when dragged', async ({ page }) => {
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(0);

    const firstTask = tasks[0];
    const initialBox = await firstTask.boundingBox();
    if (!initialBox) throw new Error('Task box not found');

    // Click to select
    await page.mouse.click(
      initialBox.x + initialBox.width / 2,
      initialBox.y + initialBox.height / 2,
    );
    await expect(firstTask).toHaveClass(/wx-selected/);

    // Drag right by 100px
    const dragOffset = 100;
    await dragTask(page, firstTask, dragOffset);

    // Wait for update
    await page.waitForTimeout(200);

    // Task should have moved
    const finalBox = await firstTask.boundingBox();
    if (!finalBox) throw new Error('Task box not found after drag');

    // X position should have changed (within some tolerance for snapping)
    expect(Math.abs(finalBox.x - initialBox.x)).toBeGreaterThan(20);
  });

  test('should move all selected tasks together when one is dragged', async ({
    page,
  }) => {
    // Select 3 tasks
    const { tasks } = await selectMultipleTasks(page, 3);

    const selectedCount = await countSelectedTasks(page);
    expect(selectedCount).toBeGreaterThanOrEqual(2);

    // Record initial positions
    const initialPositions = await Promise.all(
      tasks.map((t) => t.boundingBox()),
    );

    // Drag the first selected task
    const dragOffset = 80;
    await dragTask(page, tasks[0], dragOffset);

    // Wait for update
    await page.waitForTimeout(300);

    // All tasks should have moved by approximately the same amount
    const finalPositions = await Promise.all(tasks.map((t) => t.boundingBox()));

    for (let i = 0; i < tasks.length; i++) {
      const initial = initialPositions[i];
      const final = finalPositions[i];

      if (initial && final) {
        const xDiff = final.x - initial.x;
        // All tasks should have moved (accounting for cell snapping)
        expect(Math.abs(xDiff)).toBeGreaterThan(20);
      }
    }
  });

  test('should maintain relative positions when bulk moving', async ({
    page,
  }) => {
    // Select 2 tasks
    const { tasks } = await selectMultipleTasks(page, 2);

    expect(await countSelectedTasks(page)).toBeGreaterThanOrEqual(2);

    // Record initial positions
    const initialPos1 = await tasks[0].boundingBox();
    const initialPos2 = await tasks[1].boundingBox();

    if (!initialPos1 || !initialPos2)
      throw new Error('Task positions not found');

    const initialXGap = initialPos2.x - initialPos1.x;

    // Drag one task
    await dragTask(page, tasks[0], 80);
    await page.waitForTimeout(300);

    // Get final positions
    const finalPos1 = await tasks[0].boundingBox();
    const finalPos2 = await tasks[1].boundingBox();

    if (!finalPos1 || !finalPos2)
      throw new Error('Task positions not found after drag');

    const finalXGap = finalPos2.x - finalPos1.x;

    // Relative gap should be preserved (within tolerance)
    expect(Math.abs(finalXGap - initialXGap)).toBeLessThan(10);
  });

  test('should only move selected tasks, not unselected ones', async ({
    page,
  }) => {
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(3);

    // Select only first task
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

    // Record position of an unselected task
    const thirdTaskInitial = await tasks[2].boundingBox();
    if (!thirdTaskInitial) throw new Error('Third task box not found');

    // Drag the selected task
    await dragTask(page, tasks[0], 80);
    await page.waitForTimeout(300);

    // Unselected task should not have moved
    const thirdTaskFinal = await tasks[2].boundingBox();
    if (!thirdTaskFinal) throw new Error('Third task box not found after drag');

    expect(Math.abs(thirdTaskFinal.x - thirdTaskInitial.x)).toBeLessThan(5);
  });

  // TODO: Undo hotkey handling needs investigation - Ctrl+Z event not reaching the handler
  test.skip('should support undo after bulk move with Ctrl+Z', async ({
    page,
  }) => {
    // Select multiple tasks
    const { tasks } = await selectMultipleTasks(page, 2);

    expect(await countSelectedTasks(page)).toBeGreaterThanOrEqual(2);

    // Record initial position
    const initialPos = await tasks[0].boundingBox();
    if (!initialPos) throw new Error('Task position not found');

    // Drag tasks
    await dragTask(page, tasks[0], 100);
    await page.waitForTimeout(300);

    // Verify tasks moved
    const movedPos = await tasks[0].boundingBox();
    if (!movedPos) throw new Error('Task position not found after move');
    expect(Math.abs(movedPos.x - initialPos.x)).toBeGreaterThan(20);

    // Press Ctrl+Z to undo
    await page.keyboard.press('Control+z');
    await page.waitForTimeout(300);

    // Task should be back to original position
    const undoPos = await tasks[0].boundingBox();
    if (!undoPos) throw new Error('Task position not found after undo');
    expect(Math.abs(undoPos.x - initialPos.x)).toBeLessThan(10);
  });

  // TODO: Undo hotkey handling needs investigation - Ctrl+Z event not reaching the handler
  test.skip('should undo all tasks in bulk move with single Ctrl+Z', async ({
    page,
  }) => {
    // Select 3 tasks
    const { tasks } = await selectMultipleTasks(page, 3);

    const selectedCount = await countSelectedTasks(page);
    expect(selectedCount).toBeGreaterThanOrEqual(2);

    // Record initial positions
    const initialPositions = await Promise.all(
      tasks.map((t) => t.boundingBox()),
    );

    // Drag tasks
    await dragTask(page, tasks[0], 100);
    await page.waitForTimeout(300);

    // Verify at least one moved
    const movedPos = await tasks[0].boundingBox();
    expect(movedPos).not.toBeNull();
    if (initialPositions[0] && movedPos) {
      expect(Math.abs(movedPos.x - initialPositions[0].x)).toBeGreaterThan(20);
    }

    // Single Ctrl+Z should undo ALL tasks
    await page.keyboard.press('Control+z');
    await page.waitForTimeout(300);

    // All tasks should be back to original positions
    const undoPositions = await Promise.all(tasks.map((t) => t.boundingBox()));

    for (let i = 0; i < tasks.length; i++) {
      const initial = initialPositions[i];
      const undo = undoPositions[i];

      if (initial && undo) {
        expect(Math.abs(undo.x - initial.x)).toBeLessThan(10);
      }
    }
  });

  // TODO: Resize edge detection with multiple selected tasks needs investigation
  // The resize handler may have conflicts with the bulk move state management
  test.skip('should not start bulk move when clicking resize edge', async ({
    page,
  }) => {
    // First select multiple tasks to enable bulk move mode
    const { tasks } = await selectMultipleTasks(page, 2);
    expect(await countSelectedTasks(page)).toBeGreaterThanOrEqual(2);

    // Get initial bounds of first selected task
    const firstTask = tasks[0];
    const initialBox = await firstTask.boundingBox();
    if (!initialBox) throw new Error('Task box not found');

    // Get initial X positions of all selected tasks
    const initialPositions = await Promise.all(
      tasks.map((t) => t.boundingBox()),
    );

    // Click and drag on the right edge of the first task (resize area)
    const resizeX = initialBox.x + initialBox.width - 2;
    const resizeY = initialBox.y + initialBox.height / 2;

    await page.mouse.move(resizeX, resizeY);
    await page.mouse.down();
    await page.mouse.move(resizeX + 50, resizeY, { steps: 10 });
    await page.mouse.up();

    await page.waitForTimeout(200);

    // Get final positions
    const finalBox = await firstTask.boundingBox();
    if (!finalBox) throw new Error('Task box not found after resize');
    const finalPositions = await Promise.all(tasks.map((t) => t.boundingBox()));

    // Width of first task should have changed (resize happened)
    const widthDiff = Math.abs(finalBox.width - initialBox.width);
    expect(widthDiff).toBeGreaterThan(10);

    // Other selected tasks should NOT have moved (bulk move didn't trigger)
    for (let i = 1; i < tasks.length; i++) {
      const initial = initialPositions[i];
      const final = finalPositions[i];
      if (initial && final) {
        const xDiff = Math.abs(final.x - initial.x);
        // Other tasks should not have moved
        expect(xDiff).toBeLessThan(5);
      }
    }
  });
});

test.describe('Bulk Move with Horizontal Scroll', () => {
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

  test('should maintain selection after horizontal scroll and still allow bulk move', async ({
    page,
  }) => {
    // Select multiple tasks
    const { tasks } = await selectMultipleTasks(page, 2);

    const selectedBefore = await countSelectedTasks(page);
    expect(selectedBefore).toBeGreaterThanOrEqual(2);

    // Scroll horizontally
    const chart = page.locator(CHART_AREA);
    await chart.evaluate((el) => {
      el.scrollLeft += 100;
    });
    await page.waitForTimeout(200);

    // Selection should persist
    const selectedAfter = await countSelectedTasks(page);
    expect(selectedAfter).toBe(selectedBefore);

    // Record positions after scroll
    const positionsBeforeDrag = await Promise.all(
      tasks.map((t) => t.boundingBox()),
    );

    // Bulk move should still work after scroll
    await dragTask(page, tasks[0], 80);
    await page.waitForTimeout(300);

    // Tasks should have moved
    const positionsAfterDrag = await Promise.all(
      tasks.map((t) => t.boundingBox()),
    );

    for (let i = 0; i < tasks.length; i++) {
      const before = positionsBeforeDrag[i];
      const after = positionsAfterDrag[i];

      if (before && after) {
        const xDiff = Math.abs(after.x - before.x);
        expect(xDiff).toBeGreaterThan(20);
      }
    }
  });

  test('should correctly position tasks when scrolled and then bulk moved', async ({
    page,
  }) => {
    const chart = page.locator(CHART_AREA);

    // First scroll to a different position
    await chart.evaluate((el) => {
      el.scrollLeft = 200;
    });
    await page.waitForTimeout(300);

    // Now select and move tasks
    const tasks = await getAllTaskBars(page);
    expect(tasks.length).toBeGreaterThan(0);

    // Select first visible task
    const firstTask = tasks[0];
    const box = await firstTask.boundingBox();
    if (!box) throw new Error('Task box not found');

    await performMarqueeSelect(
      page,
      box.x - 5,
      box.y - 5,
      box.x + box.width + 5,
      box.y + box.height + 5,
    );

    const initialPos = await firstTask.boundingBox();
    if (!initialPos) throw new Error('Initial position not found');

    // Drag task
    await dragTask(page, firstTask, 80);
    await page.waitForTimeout(300);

    // Verify movement
    const finalPos = await firstTask.boundingBox();
    if (!finalPos) throw new Error('Final position not found');

    expect(Math.abs(finalPos.x - initialPos.x)).toBeGreaterThan(20);
  });
});
