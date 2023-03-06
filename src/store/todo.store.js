import { ToDo } from "../todos/models/todo.model";

const Filters = {
    MyTasks: 'My Tasks',
    Today: 'Today',
    Pending: 'Pending',
    Completed: 'Completed'
}

const state = {
    toDos: [
        new ToDo('Continue with the JS course'),
        new ToDo('Buy a TypeScript course!'),
        new ToDo('Watch "The Whale"'),
        new ToDo('Continue with the JS course'),
        new ToDo('Buy a TypeScript course!'),
        new ToDo('Watch "The Whale"'),
        new ToDo('Continue with the JS course'),
        new ToDo('Buy a TypeScript course!'),
        new ToDo('Watch "The Whale"'),
        new ToDo('Continue with the JS course'),
        new ToDo('Buy a TypeScript course!'),
        new ToDo('Watch "The Whale"'),
        new ToDo('Continue with the JS course'),
        new ToDo('Buy a TypeScript course!'),
        new ToDo('Watch "The Whale"'),
        // new ToDo('Continue with the JS course'),
        // new ToDo('Buy a TypeScript course!'),
        // new ToDo('Watch "The Whale"'),
    ],
    filter: Filters.MyTasks,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore');
}

const loadStore = () => {
    throw new Error('Not implemented yet!');
}

/**
 * Obtains the ToDos from the state
 * @param {String} filter
 */
const getToDos = ( filter = Filters.MyTasks ) => {
    
    switch ( filter ) {
        case Filters.MyTasks:
            return [...state.toDos];
        case Filters.Completed:
            return state.toDos.filter( toDo => toDo.done );
        case Filters.Pending:
            return state.toDos.filter( toDo => !toDo.done );
        default:
            throw new Error(`Option ${ filter } is not valid`);
    }
    
}

/**
 * Creates a new ToDo in the state
 * @param {String} description 
 */
const addToDo = ( description ) => {
    
    if ( !description ) throw new Error(`${ description } is required`);
    state.toDos.push( new ToDo(description) );

}

/**
 * 
 * @param {String} toDoId ToDo identifier
 */
const toggleToDo = ( toDoId ) => {

    state.toDos = state.toDos.map( toDo => {
        if ( toDo.id === toDoId ){
            toDo.done = !toDo.done;
        }
        return toDo;
    });

}

/**
 * Deletes a todo from the state
 * @param {String} toDoId ToDo identifier
 */
const deleteToDo = ( toDoId ) => {
    state.toDos = state.toDos.filter( toDo => toDo.id !== toDoId );
}

const clearCompleted = () => {
    state.toDos = state.toDos.filter( toDo => toDo.done );
}

/**
 * Sets a new filter in the state
 * @param {Filters} newFilter
 */
const setFilter = ( newFilter = Filters.MyTasks ) => {
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addToDo,
    clearCompleted,
    deleteToDo,
    getCurrentFilter,
    getToDos,
    initStore,
    loadStore,
    setFilter,
    state,
    toggleToDo,
}