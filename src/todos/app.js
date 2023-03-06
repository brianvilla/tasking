import html from './app.component.html?raw';
import todoStore from '../store/todo.store'
import { createToDos } from './use-cases';


const ElementsIDs = {
    Tasks: '#tasks',
    NewTask: '#new-task',
    Dropdown: '#dropdown',
    Menu: '#menu',
}

const Animations = {
    newTask: 'animate__animated animate__slideInDown',
    loadTask: 'animate__animated animate__fadeIn',
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
        renderToDos(Animations.loadTask);
    })();

    // DOM References
    const inputNewTask = document.querySelector( ElementsIDs.NewTask );
    const divTasks = document.querySelector( ElementsIDs.Tasks );
    const iDropdown = document.querySelector( ElementsIDs.Dropdown );
    const menu = document.querySelector( ElementsIDs.Menu );

    // Listeners
    iDropdown.addEventListener('click', () => {

        if ( menu.classList.contains('invisible')){
            iDropdown.classList.remove('fa-chevron-down');
            iDropdown.classList.add('fa-chevron-up');
            menu.classList.remove('invisible');
            menu.classList.remove('absolute');
            menu.classList.add('animate__fadeInDown');
        } else {
            iDropdown.classList.remove('fa-chevron-up');
            iDropdown.classList.add('fa-chevron-down');
            menu.classList.add('invisible');
            menu.classList.add('absolute');
            menu.classList.remove('animate__fadeInDown');
        }

    });


    inputNewTask.addEventListener('keyup', ( event ) => {
        
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addToDo( event.target.value );
        renderToDos( Animations.newTask );

        event.target.value = '';

    });

    divTasks.addEventListener('click', ( event ) => {
        
        const element = event.target.closest('[task-id]');
        todoStore.toggleToDo( element.getAttribute('task-id') );
        renderToDos();

    });

    divTasks.addEventListener('click', ( event ) => {

        const isDeleteButton = event.target.id === 'delete-task';
        const element = event.target.closest('[task-id]');
        
        if ( !element || !isDeleteButton) return;
        
        todoStore.deleteToDo( element.getAttribute('task-id') );
        renderToDos();

    });
}