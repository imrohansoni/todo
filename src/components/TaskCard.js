const TaskCard = props => {
  console.log(props);
  const { id, taskName, createdAt, deadline, priority, completed } = props.data;

  return (
    <div className='task-card' key={id}>
      <div className='task-deadline'>
        <p className='task-created-at'>{deadline.toLocaleDateString()}</p>
        <p className='task-created-at'>120 days left</p>
      </div>
      <div className='task-priority'>
        <div className={`priority-level ${priority >= 1 ? 'fill' : ''}`}></div>
        <div className={`priority-level ${priority >= 2 ? 'fill' : ''}`}></div>
        <div className={`priority-level ${priority >= 3 ? 'fill' : ''}`}></div>
      </div>
      <p className='task-name'>{taskName}</p>
      <p className='task-created-at'>
        Created at {createdAt.toLocaleDateString()}
      </p>

      <div className='task-actions'>
        <button className='task-done-button'>
          <svg className='icon'>
            <use href='sprite.svg#check_circle_black_24dp' />
          </svg>
          <p>done</p>
        </button>

        <div className='btn-group'>
          <button className='task-button'>
            <svg className='icon'>
              <use href='sprite.svg#edit_black_24dp' />
            </svg>
          </button>
          <button className='task-button'>
            <svg className='icon'>
              <use href='sprite.svg#delete_black_24dp' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
