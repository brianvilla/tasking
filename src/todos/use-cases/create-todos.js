import { ToDo } from "../models/todo.model";
import { createToDoHTML } from "./create-todo-html";


let element;

/**
 * Creates the ToDos
 * @param {String} elementId 
 * @param {ToDo} toDos 
 * @param {TString} animation
 */
export const createToDos = ( elementId, toDos = [], animation ) => {

    const sectionTasks = document.querySelector('#tasks-section');

    if( !element )
        element = document.querySelector( elementId );

    if( !element ) throw new Error(`Element ${ elementId } not found`);

    if( toDos.length > 10 ){
        sectionTasks.classList.add('md:overflow-y-scroll');
    } else {
        sectionTasks.classList.remove('md:overflow-y-scroll');
    }

    element.innerHTML = '';

    toDos.forEach( toDo => {
        element.append(createToDoHTML( toDo, animation ));
    });

}