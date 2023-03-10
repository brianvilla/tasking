import { ToDo } from "../models/todo.model";

/**
 * Creates the HTML for the ToDo
 * @param {ToDo} toDo 
 * @param {String} animation 
 */
export const createToDoHTML = ( toDo, animation ) => {

    if( !toDo ) throw new Error('The ToDo Object is required');

    const { id, description, done } = toDo;

    const taskTemplate = `
    <label class="text-black text-md sm:text-xl font-semibold container-checkbox">${ description.replaceAll('<', '-').replaceAll('>', '-') }
        <input type="checkbox" ${ done ? 'checked' : ''}>
        <span class="checkmark ${ animation === 'animate__animated animate__fadeIn' ? 'animate__animated animate__fadeInLeft' : '' }"></span>
    </label>
    <button class="block text-red-500 md:invisible group-hover:visible text-xl sm:text-2xl mr-3 transition ease-in-out delay-75 hover:scale-110">
        <i id="delete-task" class="fa-regular fa-trash-can"></i>
    </button>
    `;
    
    const container = document.createElement('div');
    container.className = `w-full group bg-white rounded-xl p-4 sm:p-6 pb-4 mb-4 flex justify-between transition ease-in-out delay-75 hover:cursor-pointer hover:shadow-md overflow-x-hidden ${ done ? 'line-through decoration-2' : '' } ${ animation }`;
    container.innerHTML = taskTemplate;
    container.setAttribute('task-id', id );

    return container;

}