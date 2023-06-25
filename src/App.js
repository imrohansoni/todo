import TaskCard from './components/TaskCard';
import TaskGroup from './components/TaskGroup';
const tasks = [
  {
    id: 1234,
    taskName: 'create task management app using react 😅',
    createdAt: new Date(),
    deadline: new Date('30 Jun 2023'),
    priority: 2,
    completed: false,
  },
];

const App = props => {
  return (
    <div className='app'>
      <TaskGroup tasks={tasks} />
    </div>
  );
};

export default App;
