import { ToDo } from "../models/todo.model";

/**
 * 
 * @param {ToDo} toDo 
 * @param {String} animation 
 */
export const createToDoHTML = ( toDo, animation ) => {

    if( !toDo ) throw new Error('The ToDo Object is required');

    const { id, description, done } = toDo;

    const taskTemplate = `
    <label class="text-black text-md sm:text-xl font-semibold container-checkbox animate__animated animate__fadeIn">${ description }
        <input class="animate__animated animate__fadeInLeft" type="checkbox" ${ done ? 'checked' : ''}>
        <span class="checkmark"></span>
    </label>
    <button class="text-red-500 invisible group-hover:visible text-xl sm:text-2xl mr-3 transition ease-in-out delay-75 hover:scale-110">
        <i class="fa-regular fa-trash-can"></i>
    </button>
    `
    
    const container = document.createElement('div');
    container.className = `group bg-white rounded-xl p-4 sm:p-6 pb-4 flex justify-between mb-4 transition ease-in-out delay-75 hover:cursor-pointer hover:shadow-md ${ animation }`;
    container.innerHTML = taskTemplate;
    container.setAttribute('task-id', id );

    return container;

}