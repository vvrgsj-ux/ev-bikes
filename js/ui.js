/**
 * UI Module
 * Handles all UI rendering and DOM operations
 */

class UIManager {
    constructor() {
        this.tasksList = document.getElementById('tasksList');
        this.emptyState = document.getElementById('emptyState');
        this.taskInput = document.getElementById('taskInput');
        this.taskForm = document.getElementById('taskForm');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.toastContainer = document.getElementById('toastContainer');
        this.themeToggle = document.getElementById('themeToggle');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.currentFilter = 'all';
        this.initTheme();
    }

    /**
     * Initialize theme from localStorage
     */
    initTheme() {
        const savedTheme = localStorage.getItem('taskflow_theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            this.updateThemeIcon(true);
        }
    }

    /**
     * Toggle theme
     */
    toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('taskflow_theme', isDarkMode ? 'dark' : 'light');
        this.updateThemeIcon(isDarkMode);
    }

    /**
     * Update theme icon
     */
    updateThemeIcon(isDark) {
        const sunIcon = this.themeToggle.querySelector('.sun-icon');
        const moonIcon = this.themeToggle.querySelector('.moon-icon');
        if (isDark) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    }

    /**
     * Render all tasks
     */
    renderTasks(tasks) {
        this.tasksList.innerHTML = '';

        if (tasks.length === 0) {
            this.emptyState.classList.remove('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');

        tasks.forEach((task, index) => {
            const taskElement = this.createTaskElement(task);
            this.tasksList.appendChild(taskElement);
        });
    }

    /**
     * Create a task element
     */
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.taskId = task.id;

        const createdDate = new Date(task.createdAt);
        const formattedDate = this.formatDate(createdDate);

        li.innerHTML = `
            <div class="task-checkbox" data-action="toggle"></div>
            <div class="task-content">
                <div class="task-text">${this.escapeHtml(task.text)}</div>
                <div class="task-meta">
                    <span class="task-time">📅 ${formattedDate}</span>
                    <span class="task-priority priority-${task.priority}">${task.priority}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-delete" data-action="delete" title="Delete task">🗑️</button>
            </div>
        `;

        return li;
    }

    /**
     * Update stats display
     */
    updateStats(stats) {
        document.getElementById('totalTasks').textContent = stats.total;
        document.getElementById('completedTasks').textContent = stats.completed;
        document.getElementById('pendingTasks').textContent = stats.active;
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${this.escapeHtml(message)}</span>
            <button class="toast-close" data-action="close-toast">×</button>
        `;

        this.toastContainer.appendChild(toast);

        // Remove toast after duration
        setTimeout(() => {
            toast.remove();
        }, duration);

        return toast;
    }

    /**
     * Get active filter
     */
    getActiveFilter() {
        return this.currentFilter;
    }

    /**
     * Set active filter
     */
    setActiveFilter(filter) {
        this.currentFilter = filter;
        this.filterButtons.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    /**
     * Clear input field
     */
    clearInput() {
        this.taskInput.value = '';
        this.taskInput.focus();
    }

    /**
     * Get input value
     */
    getInputValue() {
        return this.taskInput.value.trim();
    }

    /**
     * Format date
     */
    formatDate(date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const dateToCheck = new Date(date);
        dateToCheck.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        yesterday.setHours(0, 0, 0, 0);

        if (dateToCheck.getTime() === today.getTime()) {
            return 'Today';
        } else if (dateToCheck.getTime() === yesterday.getTime()) {
            return 'Yesterday';
        }

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Create global UI instance
const ui = new UIManager();