import { describe, it, expect } from 'vitest';
describe('Task Logic Tests', () => {
  it('should validate a task object', () => {
    const task = { text: 'Teszt feladat', completed: false };
    expect(task.text).toBeTypeOf('string');
    expect(task.completed).toBe(false);
  });

  it('should fail if task text is empty', () => {
    const taskText = "";
    const isValid = taskText.trim().length > 0;
    expect(isValid).toBe(false);
  });
});