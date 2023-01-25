import React, { useEffect, useRef } from 'react'

const CustomForm = ({
	placeholder,
	name,
	className,
	value,
	onChange,
	buttonClassName,
	buttonOnClick,
	buttonBody,
	isEditing = false
}) => {
	const inputRef = useRef(null);
	console.log(inputRef?.current)
	useEffect(() => {
		isEditing && inputRef?.current?.focus();
	}, [isEditing])

	return (
		<>
			<input
				placeholder={placeholder}
				name={name}
				className={className}
				value={value}
				onChange={onChange}
				ref={inputRef}
			/>
			<button className={buttonClassName} onClick={buttonOnClick}>
				{buttonBody}
			</button>
		</>
	)
}

const TodoForm = ({
	addTodo,
	setInputValue,
	inputValue,
	todoToEdit,
	editTodo
}) => {
	return (
		<div className='todo-form'>
			{todoToEdit.id === null ?
				<CustomForm
					placeholder={'Add a todo'}
					name='text'
					className='todo-input'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					buttonBody='Add Todo'
					buttonClassName='todo-button'
					buttonOnClick={() => addTodo(inputValue)}
				/> :
				<CustomForm
					placeholder={'Edit a todo'}
					name='text'
					className='todo-input edit'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					buttonBody='Update'
					buttonClassName='todo-button edit'
					buttonOnClick={() => editTodo()}
					isEditing={true}
				/>
			}
		</div>
	)
}

export default TodoForm