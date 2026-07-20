/**
 * Main App Module
 * Handles application logic and event listeners
 */

class TaskFlow {
    constructor() {
        this.storage = storage;
        this.ui = ui;
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.attachEventListeners();
        this.loadTasks();
        this.updateStatsDisplay();
    }

    /**
     * Attach all event listeners
     */
    attachEventListeners() {
        // Form submission
        this.ui.taskForm.addEventListener('submit', (e) => this.handleAddTask(e));

        // Filter buttons
        this.ui.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilterChange(btn));
        });

        // Theme toggle
        this.ui.themeToggle.addEventListener('click', () => this.ui.toggleTheme());

        // Clear all completed
        document.getElementById('clearAllBtn').addEventListener('click', () => this.handleClearCompleted());

        // Task list delegation
        this.ui.tasksList.addEventListener('click', (e) => this.handleTaskAction(e));

        // Toast close button delegation
        this.ui.toastContainer.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'close-toast') {
                e.target.closest('.toast').remove();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    /**
     * Handle adding a new task
     */
    handleAddTask(e) {
        e.preventDefault();

        const taskText = this.ui.getInputValue();

        if (!taskText) {
            this.ui.showToast('Please enter a task', 'error');
            return;
        }

        if (taskText.length > 200) {
            this.ui.showToast('Task is too long (max 200 characters)', 'error');
            return;
        }

        const newTask = this.storage.addTask({ text: taskText });

        if (newTask) {
            this.ui.clearInput();
            this.loadTasks();
            this.updateStatsDisplay();
            this.ui.showToast('Task added successfully', 'success');
        } else {
            this.ui.showToast('Failed to add task', 'error');
        }
    }

    /**
     * Handle filter change
     */
    handleFilterChange(button) {
        const filter = button.dataset.filter;
        this.ui.setActiveFilter(filter);
        this.loadTasks();
    }

    /**
     * Handle task actions (toggle, delete)
     */
    handleTaskAction(e) {
        const taskElement = e.target.closest('.task-item');
        if (!taskElement) return;

        const taskId = parseInt(taskElement.dataset.taskId);
        const action = e.target.closest('[data-action]')?.dataset.action;

        if (action === 'toggle') {
            this.toggleTask(taskId);
        } else if (action === 'delete') {
            this.deleteTask(taskId);
        }
    }

    /**
     * Toggle task completion
     */
    toggleTask(taskId) {
        const task = this.storage.toggleTask(taskId);
        if (task) {
            this.loadTasks();
            this.updateStatsDisplay();
            const message = task.completed ? 'Task completed! 🎉' : 'Task marked as active';
            this.ui.showToast(message, 'success');
        } else {
            this.ui.showToast('Failed to update task', 'error');
        }
    }

    /**
     * Delete task
     */
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            const success = this.storage.deleteTask(taskId);
            if (success) {
                this.loadTasks();
                this.updateStatsDisplay();
                this.ui.showToast('Task deleted', 'info');
            } else {
                this.ui.showToast('Failed to delete task', 'error');
            }
        }
    }

    /**
     * Handle clearing all completed tasks
     */
    handleClearCompleted() {
        const completedCount = this.storage.getStats().completed;
        if (completedCount === 0) {
            this.ui.showToast('No completed tasks to clear', 'info');
            return;
        }

        if (confirm(`Clear ${completedCount} completed task(s)?`)) {
            const deleted = this.storage.deleteCompleted();
            this.loadTasks();
            this.updateStatsDisplay();
            this.ui.showToast(`${deleted} task(s) cleared`, 'success');
        }
    }

    /**
     * Load tasks based on current filter
     */
    loadTasks() {
        const filter = this.ui.getActiveFilter();
        let tasks = this.storage.getByStatus(filter);

        // Sort tasks: incomplete first, then by creation date
        tasks.sort((a, b) => {
            if (a.completed === b.completed) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return a.completed ? 1 : -1;
        });

        this.ui.renderTasks(tasks);
    }

    /**
     * Update stats display
     */
    updateStatsDisplay() {
        const stats = this.storage.getStats();
        this.ui.updateStats(stats);
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + Enter: Add task
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (document.activeElement === this.ui.taskInput) {
                this.ui.taskForm.dispatchEvent(new Event('submit'));
            }
        }

        // Escape: Clear input
        if (e.key === 'Escape') {
            if (document.activeElement === this.ui.taskInput) {
                this.ui.taskInput.blur();
            }
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new TaskFlow();
    });
} else {
    const app = new TaskFlow();
}