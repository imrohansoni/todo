import TaskCard from './TaskCard';
const TaskGroup = props => {
  return (
    <div className='task-group'>
      <div className='task-group-title-container'>
        <svg className='icon'>
          <use href='sprite.svg#pending_actions_black_24dp' />
        </svg>
        <p className='task-group-title'>pending</p>
      </div>
      <div className='task-container'>
        {props.tasks.map(task => {
          return <TaskCard data={task} key={task.id} />;
        })}
      </div>
    </div>
  );
};

export default TaskGroup;
