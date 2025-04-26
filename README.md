# Task Management Application

A modern task management web application built with Next.js and TypeScript, featuring a clean and intuitive user interface for managing tasks efficiently.

## ✨ Features

### Core Functionality
- **Task List View**: Clean tabular display of tasks with essential information
- **Task Management**:
  - ✅ Create new tasks with detailed information
  - 📝 Edit existing tasks
  - 🗑️ Delete tasks

### Technical Implementation
- Built with Next.js 14 and TypeScript for type safety
- React Context API for state management
- Modern UI with Tailwind CSS
- Responsive design for all screen sizes
- Deployed on Vercel for fast and reliable hosting

## 🚀 Deployment

The application is live and can be accessed at:  
[https://task-management-lbarbta2p-laxmikant2002s-projects.vercel.app](https://task-management-lbarbta2p-laxmikant2002s-projects.vercel.app)

## ❗️ Notes

- The `builds` configuration in the Vercel project settings overrides the Build and Development Settings. For more details, refer to the [Vercel documentation](https://vercel.link/unused-build-settings).
- Ensure to update deprecated dependencies like `uuid` to version 7 or higher to avoid potential issues.

## 🛠️ Technical Details

### State Management
- Implemented using React Context API (`TaskContext`)
- Centralized task state management
- Type-safe task operations

### Components
1. **TaskTable**
   - Displays tasks in a sortable table
   - Implements delete and edit actions
   - Shows task status with color coding

2. **AddTaskModal**
   - Form for creating new tasks
   - Input validation
   - Date picker with minimum date validation

3. **EditTaskModal**
   - Pre-populated form for editing tasks
   - Maintains task state consistency

4. **Search and Filter**
   - Real-time search functionality
   - Priority and status filters
   - Sort by due date

### Data Structure
```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Completed';
}
```

## 🎯 Requirements Met

✅ Next.js with TypeScript implementation  
✅ Task listing with all required columns  
✅ Search functionality with dynamic updates  
✅ Add/Edit task modal implementation  
✅ Sort tasks by due date  
✅ Filter tasks by priority and status  
✅ Delete task functionality  
✅ React Context API for state management  
✅ Responsive design  
✅ Type safety with TypeScript

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
task-management-app/
├── app/
│   ├── components/
│   │   ├── AddTaskModal.tsx
│   │   ├── EditTaskModal.tsx
│   │   └── TaskTable.tsx
│   ├── context/
│   │   └── TaskContext.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── dateFormatter.ts
│   ├── globals.css
│   └── page.tsx
├── public/
└── package.json
```

## 🎨 UI Features

- Clean, minimalist aesthetic
- Subtle shadows and borders for depth
- High contrast for readability
- Consistent spacing and rounded corners
- Smooth transitions and hover states
- Color-coded priority and status indicators

## 🔧 Technical Improvements

- Consistent date formatting to prevent hydration errors
- Type-safe component props
- Efficient state updates using functional updates
- Modular component architecture
- Reusable utility functions

## 🌟 Key Highlights

1. **Modern Tech Stack**
   - Next.js 14 for optimal performance
   - TypeScript for enhanced development experience
   - Tailwind CSS for modern styling

2. **User Experience**
   - Intuitive interface
   - Responsive design
   - Real-time updates
   - Smooth animations

3. **Code Quality**
   - Clean architecture
   - Type safety
   - Reusable components
   - Best practices implementation

## 📝 License

This project is licensed under the MIT License.
