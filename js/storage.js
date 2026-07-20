/**
 * Storage Module
 * Handles all local storage operations for tasks
 */

class StorageManager {
    constructor() {
        this.storageKey = 'taskflow_tasks';
        this.initializeStorage();
    }

    /**
     * Initialize storage if it doesn't exist
     */
    initializeStorage() {
        if (!this.getAll()) {
            this.setAll([]);
        }
    }

    /**
     * Get all tasks from storage
     */
    getAll() {
        try {
            const tasks = localStorage.getItem(this.storageKey);
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error('Error reading from storage:', error);
            return [];
        }
    }

    /**
     * Add a new task
     */
    addTask(taskData) {
        try {
            const tasks = this.getAll();
            const newTask = {
                id: Date.now(),
                text: taskData.text,
                completed: false,
                priority: taskData.priority || 'medium',
                dueDate: taskData.dueDate || null,
                createdAt: new Date().toISOString(),
                completedAt: null
            };
            tasks.push(newTask);
            this.setAll(tasks);
            return newTask;
        } catch (error) {
            console.error('Error adding task:', error);
            return null;
        }
    }

    /**
     * Update a task
     */
    updateTask(taskId, updates) {
        try {
            const tasks = this.getAll();
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
                this.setAll(tasks);
                return tasks[taskIndex];
            }
            return null;
        } catch (error) {
            console.error('Error updating task:', error);
            return null;
        }
    }

    /**
     * Delete a task
     */
    deleteTask(taskId) {
        try {
            const tasks = this.getAll();
            const filteredTasks = tasks.filter(task => task.id !== taskId);
            this.setAll(filteredTasks);
            return true;
        } catch (error) {
            console.error('Error deleting task:', error);
            return false;
        }
    }

    /**
     * Toggle task completion status
     */
    toggleTask(taskId) {
        try {
            const tasks = this.getAll();
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                task.completedAt = task.completed ? new Date().toISOString() : null;
                this.setAll(tasks);
                return task;
            }
            return null;
        } catch (error) {
            console.error('Error toggling task:', error);
            return null;
        }
    }

    /**
     * Delete all completed tasks
     */
    deleteCompleted() {
        try {
            const tasks = this.getAll();
            const activeTasks = tasks.filter(task => !task.completed);
            const deletedCount = tasks.length - activeTasks.length;
            this.setAll(activeTasks);
            return deletedCount;
        } catch (error) {
            console.error('Error clearing completed tasks:', error);
            return 0;
        }
    }

    /**
     * Get tasks by status
     */
    getByStatus(status) {
        try {
            const tasks = this.getAll();
            if (status === 'completed') {
                return tasks.filter(task => task.completed);
            } else if (status === 'active') {
                return tasks.filter(task => !task.completed);
            }
            return tasks;
        } catch (error) {
            console.error('Error filtering tasks:', error);
            return [];
        }
    }

    /**
     * Get tasks by priority
     */
    getByPriority(priority) {
        try {
            const tasks = this.getAll();
            return tasks.filter(task => task.priority === priority);
        } catch (error) {
            console.error('Error getting tasks by priority:', error);
            return [];
        }
    }

    /**
     * Search tasks
     */
    search(query) {
        try {
            const tasks = this.getAll();
            const lowerQuery = query.toLowerCase();
            return tasks.filter(task => 
                task.text.toLowerCase().includes(lowerQuery)
            );
        } catch (error) {
            console.error('Error searching tasks:', error);
            return [];
        }
    }

    /**
     * Get statistics
     */
    getStats() {
        try {
            const tasks = this.getAll();
            const completed = tasks.filter(task => task.completed).length;
            return {
                total: tasks.length,
                completed: completed,
                active: tasks.length - completed,
                highPriority: tasks.filter(t => t.priority === 'high').length,
                mediumPriority: tasks.filter(t => t.priority === 'medium').length,
                lowPriority: tasks.filter(t => t.priority === 'low').length
            };
        } catch (error) {
            console.error('Error getting stats:', error);
            return { total: 0, completed: 0, active: 0 };
        }
    }

    /**
     * Clear all tasks (for testing)
     */
    clearAll() {
        try {
            localStorage.removeItem(this.storageKey);
            this.initializeStorage();
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    }

    /**
     * Set all tasks in storage
     */
    setAll(tasks) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
            return true;
        } catch (error) {
            console.error('Error writing to storage:', error);
            return false;
        }
    }

    /**
     * Export tasks as JSON
     */
    exportTasks() {
        try {
            const tasks = this.getAll();
            return JSON.stringify(tasks, null, 2);
        } catch (error) {
            console.error('Error exporting tasks:', error);
            return null;
        }
    }

    /**
     * Import tasks from JSON
     */
    importTasks(jsonString) {
        try {
            const tasks = JSON.parse(jsonString);
            if (Array.isArray(tasks)) {
                this.setAll(tasks);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing tasks:', error);
            return false;
        }
    }
}

// Create global storage instance
const storage = new StorageManager();