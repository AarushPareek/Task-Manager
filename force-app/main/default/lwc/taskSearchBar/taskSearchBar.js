import { LightningElement } from 'lwc';

export default class TaskSearchBar extends LightningElement {
    handleSearchChange(event){
        const searchString = event.target.value;

        const searchEvent = new CustomEvent('searchchange', {
            detail: searchString
        });
        this.dispatchEvent(searchEvent);
    }
}