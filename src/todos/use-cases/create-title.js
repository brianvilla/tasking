import { createTitleHTML } from "./create-title-html";

export const createTitle = ( elementId ) => {

    const header = document.querySelector( elementId );

    header.innerHTML = createTitleHTML();

}