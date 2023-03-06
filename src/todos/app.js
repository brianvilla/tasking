import html from './app.component.html?raw';
import todoStore from '../store/todo.store'
import { createToDos } from './use-cases';


const ElementsIDs = {
    Tasks: '#tasks',
    NewTask: '#new-task',
}

const Animations = {
    newTask: 'animate__animated animate__slideInDown',
    loadTask: 'animate__animated animate__fadeInLeft',
}

/**
 * Creates the HTML Structure for our app
 * @param {String} elementId Example:
 */
export const App = ( elementId ) => {

    /**
     * 
     * @param {String} animation 
     */
    const renderToDos = ( animation ) => {
        let toDos = todoStore.getToDos( todoStore.getCurrentFilter() );
        toDos = toDos.reverse();
        createToDos( ElementsIDs.Tasks, toDos, animation );
    }

    (() => {
        const app = document.createElement('div');
        app.className = 'md:flex md:h-5/6';
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        renderToDos();
    })();

    // DOM References
    const inputNewTask = document.querySelector( ElementsIDs.NewTask );

    // Listeners
    inputNewTask.addEventListener('keyup', ( event ) => {
        
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addToDo( event.target.value );
        renderToDos( Animations.newTask );

        event.target.value = '';

    });
}