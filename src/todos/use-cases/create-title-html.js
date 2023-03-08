import todoStore from "../../store/todo.store";

export const createTitleHTML = () => {

    const titleTemplate = `<h1 
                                id="title" 
                                class="text-4xl md:text-6xl font-bold mt-10 animate__animated animate__fadeInDown"
                            >
                            ${
                                todoStore.state.filter === 'My Tasks' 
                                    ? '😅  ' : todoStore.state.filter === 'Today' 
                                    ? '😓  ' : todoStore.state.filter === 'Pending' 
                                    ? '😱  ' : todoStore.state.filter === 'Completed' 
                                    ? '😎  ' : ''
                            }
                            ${ todoStore.state.filter }
                            </h1>
    `;
    // <button id="clear" class="mt-10 h-14 text-red-500 font-semibold text-2xl border-red-500 px-4 rounded-md transition ease-in-out hover:bg-red-500 hover:text-white active:bg-red-700 ${ todoStore.state.filter === 'Today' || todoStore.state.filter === 'Pending' ? 'invisible' : '' } animate__animated animate__fadeInRight">
    //     <i class="fa-regular fa-trash-can"></i>
    // </button>

    return titleTemplate;

}