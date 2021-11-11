import { useState } from 'react'


const AddTask = ({ onAdd }) => {
    
    const [inputState, setInputState] = useState({
        'text': '',
        'day': '',
        'reminder': false
    })

    const handleEditTask = (e) => {
        const { name, value } = e.target;

        setInputState(prevState => ({[name] :value}));
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        
       console.log(inputState);

       onAdd(inputState);

        // if(!text) {
        //     alert('Please add a task')
        //     return
        // }

        //onEdit({text , day, reminder})
        
        console.log(e);

    

        
    }

    

    return (
        <form className='add-form' onSubmit={e => onSubmit(e)}>
            <div className='form-control'>
                <label>Task</label>
                <input type="text" name='text' placeholder='Add Task' value={inputState.text} onChange={(e) => handleEditTask(e)} />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='datetime-local' name='day' placeholder='Add Day & Time' value={inputState.day} onChange={(e) => handleEditTask(e)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type="checkbox" name='reminder' checked={inputState.reminder} value={inputState.reminder} onChange={(e) => handleEditTask(e)}/>
            </div>

            <input type="submit" value='Save Task' className='btn btn-block' onSubmit = {e => onSubmit(e)}/>
        </form>
    )
}

export default AddTask
