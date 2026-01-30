import { test as base, expect, Page, Locator } from '@playwright/test';

/**
 * Common selectors for Gantt chart elements
 */
export const SELECTORS = {
  CHART_AREA: '.wx-chart-area',
  TASK_BAR: '.wx-bar:not(.wx-summary)',
  SUMMARY_BAR: '.wx-bar.wx-summary',
  SELECTED_TASK: '.wx-bar.wx-selected',
  MARQUEE_RECT: '.wx-marquee-selection',
  GRID_AREA: '.wx-grid',
  SCALE_HEADER: '.wx-scale',
} as const;

/**
 * Demo routes for testing different features
 */
export const DEMO_ROUTES = {
  MARQUEE_SELECT: '/marquee-select/material',
  MULTI_TASK_ROWS: '/multi-task-rows/material',
  BASIC: '/base/material',
} as const;

/**
 * Interface for task position/bounds
 */
export interface TaskBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Extended Playwright test with Gantt helpers
 */
export const test = base.extend<{
  ganttHelpers: GanttHelpers;
}>({
  ganttHelpers: async ({ page }, use) => {
    const helpers = new GanttHelpers(page);
    await use(helpers);
  },
});

/**
 * Helper class for common Gantt testing operations
 */
export class GanttHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for Gantt chart to be fully loaded
   */
  async waitForGanttReady() {
    await this.page.waitForSelector(SELECTORS.CHART_AREA);
    await this.page.waitForSelector(SELECTORS.TASK_BAR);
    await this.page.waitForTimeout(500); // Wait for React hydration
  }

  /**
   * Get the chart area element and its bounding box
   */
  async getChartArea() {
    const chart = this.page.locator(SELECTORS.CHART_AREA);
    await chart.waitFor({ state: 'visible' });
    const box = await chart.boundingBox();
    if (!box) throw new Error('Chart area not found');
    return { element: chart, box };
  }

  /**
   * Get all visible task bars (excluding summary bars)
   */
  async getAllTaskBars(): Promise<Locator[]> {
    return this.page.locator(SELECTORS.TASK_BAR).all();
  }

  /**
   * Get all summary bars
   */
  async getSummaryBars(): Promise<Locator[]> {
    return this.page.locator(SELECTORS.SUMMARY_BAR).all();
  }

  /**
   * Count selected tasks
   */
  async countSelectedTasks(): Promise<number> {
    return this.page.locator(SELECTORS.SELECTED_TASK).count();
  }

  /**
   * Count all task bars
   */
  async countAllTasks(): Promise<number> {
    return this.page.locator(SELECTORS.TASK_BAR).count();
  }

  /**
   * Get task bar bounds
   */
  async getTaskBounds(task: Locator): Promise<TaskBounds> {
    const box = await task.boundingBox();
    if (!box) throw new Error('Task bounds not found');
    return box;
  }

  /**
   * Perform a marquee selection drag
   */
  async marqueeSelect(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    options: { ctrlKey?: boolean; steps?: number } = {},
  ) {
    const { ctrlKey = false, steps = 10 } = options;

    await this.page.mouse.move(startX, startY);

    if (ctrlKey) {
      await this.page.keyboard.down('Control');
    }

    await this.page.mouse.down();
    await this.page.mouse.move(endX, endY, { steps });
    await this.page.mouse.up();

    if (ctrlKey) {
      await this.page.keyboard.up('Control');
    }
  }

  /**
   * Select tasks by creating a marquee that encompasses them
   */
  async selectTasks(tasks: Locator[]) {
    const boxes = await Promise.all(tasks.map((t) => t.boundingBox()));
    const validBoxes = boxes.filter((b) => b !== null) as TaskBounds[];

    if (validBoxes.length === 0) {
      throw new Error('No task boxes found');
    }

    const minX = Math.min(...validBoxes.map((b) => b.x)) - 10;
    const minY = Math.min(...validBoxes.map((b) => b.y)) - 10;
    const maxX = Math.max(...validBoxes.map((b) => b.x + b.width)) + 10;
    const maxY = Math.max(...validBoxes.map((b) => b.y + b.height)) + 10;

    await this.marqueeSelect(minX, minY, maxX, maxY);
  }

  /**
   * Drag a task by offset
   */
  async dragTask(
    task: Locator,
    offsetX: number,
    offsetY: number = 0,
    steps: number = 15,
  ) {
    const box = await task.boundingBox();
    if (!box) throw new Error('Task box not found');

    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;
    const endX = startX + offsetX;
    const endY = startY + offsetY;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(endX, endY, { steps });
    await this.page.mouse.up();
  }

  /**
   * Click on task center
   */
  async clickTask(task: Locator) {
    const box = await task.boundingBox();
    if (!box) throw new Error('Task box not found');

    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  }

  /**
   * Click on empty chart area
   */
  async clickEmptyArea(offsetFromRight: number = 100) {
    const { box: chartBox } = await this.getChartArea();
    const emptyX = chartBox.x + chartBox.width - offsetFromRight;
    const emptyY = chartBox.y + 100;

    await this.page.mouse.click(emptyX, emptyY);
    await this.page.waitForTimeout(100);

    return { x: emptyX, y: emptyY };
  }

  /**
   * Scroll chart horizontally
   */
  async scrollChart(offset: number) {
    const chart = this.page.locator(SELECTORS.CHART_AREA);
    await chart.evaluate((el, scrollOffset) => {
      el.scrollLeft += scrollOffset;
    }, offset);
    await this.page.waitForTimeout(200);
  }

  /**
   * Copy selected tasks
   */
  async copy() {
    await this.page.keyboard.press('Control+c');
  }

  /**
   * Paste tasks
   */
  async paste() {
    await this.page.keyboard.press('Control+v');
    await this.page.waitForTimeout(300);
  }

  /**
   * Undo last action
   */
  async undo() {
    await this.page.keyboard.press('Control+z');
    await this.page.waitForTimeout(300);
  }

  /**
   * Redo last undone action
   */
  async redo() {
    await this.page.keyboard.press('Control+y');
    await this.page.waitForTimeout(300);
  }
}

export { expect };
