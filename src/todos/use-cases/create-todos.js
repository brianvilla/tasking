import { ToDo } from "../models/todo.model";
import { createToDoHTML } from "./create-todo-html";


let element;

/**
 * 
 * @param {String} elementId 
 * @param {ToDo} toDos 
 * @param {TString} animation
 */
export const createToDos = ( elementId, toDos = [], animation ) => {

    if( !element )
        element = document.querySelector( elementId );

    if( !element ) throw new Error(`Element ${ elementId } not found`);

    // if( toDos.length > 9 ){
    //     element.classList.add('overflow-y-scroll');
    //     element.classList.add('scroll');
    // } else {
    //     element.classList.remove('overflow-y-scroll');
    //     element.classList.remove('scroll');
    // }

    element.innerHTML = '';

    toDos.forEach( toDo => {
        element.append(createToDoHTML( toDo, animation ));
    });

}