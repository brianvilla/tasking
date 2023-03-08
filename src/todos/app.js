import html from './app.component.html?raw';
import todoStore, { Filters } from '../store/todo.store'
import { createToDos, createTitle, dropDownBehavior } from './use-cases';


const ElementsIDs = {
    Dropdown: '#dropdown',
    Menu: '#menu',
    Tasks: '#tasks',
    NewTask: '#new-task',
    ClearButton: '#clear',
    Filters: '#filter',
    Header: '#header'
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
     * Displays the ToDos
     * @param {String} animation 
     */
    const renderToDos = ( animation ) => {
        const toDos  = todoStore.getToDos( todoStore.getCurrentFilter() );
        toDos.reverse();
        createToDos( ElementsIDs.Tasks, toDos, animation );
        renderCounters();
    }

    const renderTitle = () => {
        createTitle( ElementsIDs.Header );
    }

    const renderCounters = () => {

        const spanCounter = document.querySelectorAll('#counter');

        spanCounter[0].innerText = todoStore.getToDos( Filters.MyTasks ).length;
        spanCounter[1].innerText = todoStore.getToDos( Filters.Today ).length;
        spanCounter[2].innerText = todoStore.getToDos( Filters.Pending ).length;
        spanCounter[3].innerText = todoStore.getToDos( Filters.Completed ).length;
    }

    (() => {
        const app = document.createElement('div');
        app.className = 'md:flex md:h-5/6';
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        renderToDos( Animations.loadTask );
        renderTitle();
    })();
    
    // DOM References
    const iDropdown = document.querySelector( ElementsIDs.Dropdown );
    const menu = document.querySelector( ElementsIDs.Menu );
    const inputNewTask = document.querySelector( ElementsIDs.NewTask );
    const divTasks = document.querySelector( ElementsIDs.Tasks );
    const divFilters = document.querySelectorAll( ElementsIDs.Filters );
    // const btnClear = document.querySelector( ElementsIDs.ClearButton ); // TODO: Fix the clear completed function

    // Listeners
    iDropdown.addEventListener('click', () => {

        dropDownBehavior( menu, iDropdown );

    });

    inputNewTask.addEventListener('keyup', ( event ) => {
        
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addToDo( event.target.value.toString() );
        renderToDos( Animations.newTask );

        event.target.value = '';

    });

    divTasks.addEventListener('click', ( event ) => {
        
        const element = event.target.closest('[task-id]');

        if ( !element ) return;

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

    // TODO: Fix bug
    // btnClear.addEventListener('click', () => {  

    //     todStore.clearCompleted();
    //     renderToDos( Animations.loadTask );

    // });

    divFilters.forEach( element => {

        element.addEventListener('click', event => {
            
            if( !event.target.id ){

                divFilters.forEach( item => item.className = 'p-2 md:p-4 transition ease-in delay-150 hover:bg-slate-100 rounded-lg cursor-pointer flex justify-between' );
                event.target.parentElement.className = 'p-2 md:p-4 bg-slate-100 rounded-lg cursor-pointer flex justify-between';
                
                switch ( event.target.textContent ) {
                    case '😅  My tasks':
                        todoStore.setFilter( Filters.MyTasks );
                    break;
                    case '😓  Today':
                        todoStore.setFilter( Filters.Today );
                    break;
                    case '😱  Pending':
                        todoStore.setFilter( Filters.Pending );
                    break;
                    case '😎  Completed':
                        todoStore.setFilter( Filters.Completed );
                    break;
                }

                renderTitle();
                renderToDos( Animations.loadTask );

            } else {

                divFilters.forEach( item => item.className = 'p-2 md:p-4 transition ease-in delay-150 hover:bg-slate-100 rounded-lg cursor-pointer flex justify-between' );
                event.target.className = 'p-2 md:p-4 bg-slate-100 rounded-lg cursor-pointer flex justify-between';
                
                switch ( event.target.firstElementChild.textContent ) {
                    case '😅  My tasks':
                        todoStore.setFilter( Filters.MyTasks );
                    break;
                    case '😓  Today':
                        todoStore.setFilter( Filters.Today );
                    break;
                    case '😱  Pending':
                        todoStore.setFilter( Filters.Pending );
                    break;
                    case '😎  Completed':
                        todoStore.setFilter( Filters.Completed );
                    break;
                }

                renderTitle();
                renderToDos( Animations.loadTask );

            }


        });

    });

}