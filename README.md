# TaskFlow - Modern To-Do List Application

## 🎯 Overview

TaskFlow is a modern, responsive to-do list application built with vanilla JavaScript, CSS3, and HTML5. It features local storage functionality, allowing users to persist their tasks across browser sessions.

## ✨ Features

### Core Functionality
- ✅ **Create Tasks** - Add new tasks with ease
- ✅ **Complete Tasks** - Mark tasks as done with a single click
- ✅ **Delete Tasks** - Remove individual tasks
- ✅ **Filter Tasks** - View all, active, or completed tasks
- ✅ **Clear Completed** - Bulk delete all completed tasks
- ✅ **Search Tasks** - Find tasks quickly (in code)
- ✅ **Task Statistics** - See total, completed, and pending task counts

### Storage & Persistence
- 💾 **Local Storage** - All tasks saved to browser's local storage
- 🔄 **Automatic Sync** - Changes saved instantly
- 📊 **Data Export** - Export tasks as JSON (in code)
- 📥 **Data Import** - Import tasks from JSON (in code)

### User Experience
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 🎨 **Modern Design** - Clean, intuitive interface
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ⌨️ **Keyboard Shortcuts**:
  - `Ctrl/Cmd + Enter` - Add task
  - `Escape` - Blur input
- 🔔 **Toast Notifications** - Instant feedback for actions
- ✨ **Smooth Animations** - Beautiful transitions and effects

### Task Properties
- 📝 **Task Text** - Main task description
- 🏷️ **Priority Levels** - High, Medium, Low (default: Medium)
- 📅 **Creation Date** - Auto-tracked with relative formatting
- ✔️ **Completion Status** - Mark tasks as complete
- ⏰ **Completion Timestamp** - Track when tasks were completed

## 🏗️ Project Structure

```
taskflow/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── css/
│   └── styles.css         # Complete styling and animations
├── js/
│   ├── app.js             # Main application logic
│   ├── storage.js         # Local storage management
│   ├── ui.js              # UI rendering and DOM operations
├── README.md              # Documentation
└── .gitignore             # Git configuration
```

## 🎨 Design Features

### Color Palette
- **Primary**: #6366F1 (Indigo)
- **Secondary**: #EC4899 (Pink)
- **Success**: #10B981 (Green)
- **Danger**: #EF4444 (Red)
- **Warning**: #F59E0B (Amber)
- **Info**: #3B82F6 (Blue)

### Typography
- **Font Family**: Inter (main), Poppins (headings)
- **Font Weights**: 300-700
- **Sizes**: Responsive and scalable

### Components
- Modern card-based design
- Smooth hover effects
- Glassmorphism elements (background blobs)
- Animated transitions
- Gradient text and buttons

## 🚀 Getting Started

### Installation
1. Clone the repository or download the files
2. Open `index.html` in your web browser
3. Start adding tasks!

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 💻 Usage

### Adding a Task
1. Type your task in the input field
2. Press Enter or click the "Add" button
3. Task appears in the list

### Completing a Task
1. Click the checkbox next to the task
2. Task is marked as complete
3. Visual styling changes to indicate completion

### Deleting a Task
1. Hover over a task
2. Click the delete button (trash icon)
3. Confirm deletion

### Filtering Tasks
1. Click "All" to see all tasks
2. Click "Active" to see pending tasks
3. Click "Completed" to see finished tasks

### Clearing Completed
1. Click the trash icon in the header
2. Confirm to delete all completed tasks

## 🛠️ Technical Details

### Local Storage API
- Uses browser's `localStorage` API
- Stores tasks as JSON string
- Key: `taskflow_tasks`
- Theme preference stored as `taskflow_theme`

### Storage Limits
- Typically 5-10 MB per domain
- Sufficient for thousands of tasks
- Graceful error handling if quota exceeded

### Data Structure
```javascript
{
    id: number,              // Unique timestamp ID
    text: string,            // Task description
    completed: boolean,      // Completion status
    priority: string,        // 'high' | 'medium' | 'low'
    dueDate: string|null,    // ISO date string
    createdAt: string,       // ISO timestamp
    completedAt: string|null // ISO timestamp
}
```

## 🔐 Security
- XSS Protection: HTML escaping for all user input
- Safe JSON parsing with error handling
- Validates task data before storage
- No external dependencies or APIs

## 📊 Statistics
- **Total Tasks**: Count of all tasks
- **Completed**: Count of finished tasks
- **Pending**: Count of active tasks
- **Priority Breakdown**: Tasks by priority level

## 🌓 Theme Support
- **Light Mode** (default): Clean white interface
- **Dark Mode**: Easy on the eyes for night use
- **Persistent**: Theme preference saved to localStorage
- **System Aware**: Can be extended for system preference detection

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Add task (when input focused) |
| `Escape` | Blur input field |
| `Click Checkbox` | Toggle task completion |
| `Click Delete` | Delete task (with confirmation) |

## 🚀 Performance
- Minimal JavaScript (~5KB compressed)
- No external dependencies
- Efficient DOM updates
- Optimized CSS with minimal repaints
- Fast local storage operations

## 📱 Responsive Design
- **Desktop** (1024px+): Full layout with all features
- **Tablet** (768px-1023px): Optimized for touch
- **Mobile** (<768px): Stacked layout, always-visible delete

## 🎯 Future Enhancements
- Due dates with notifications
- Task categories/tags
- Recurring tasks
- Task notes/descriptions
- Drag and drop reordering
- Cloud sync with Firebase
- Collaborative task lists
- Mobile app (React Native)
- Task analytics and insights

## 📄 License

Open source - Feel free to use and modify for personal or commercial projects.

## 👨‍💻 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Review the code comments
3. Check browser console for errors
4. Ensure browser supports Local Storage API

---

**Made with ❤️ by TaskFlow**

**Productive. Simple. Modern.**
