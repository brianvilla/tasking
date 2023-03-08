


export const dropDownBehavior = ( menu, dropdown ) => {

    if ( menu.classList.contains('invisible')){
        dropdown.classList.remove('fa-chevron-down');
        dropdown.classList.add('fa-chevron-up');
        menu.classList.remove('invisible');
        menu.classList.remove('absolute');
        menu.classList.add('animate__fadeInDown');
    } else {
        dropdown.classList.remove('fa-chevron-up');
        dropdown.classList.add('fa-chevron-down');
        menu.classList.add('invisible');
        menu.classList.add('absolute');
        menu.classList.remove('animate__fadeInDown');
    }

}