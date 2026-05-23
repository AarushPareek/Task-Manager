import { LightningElement, track } from 'lwc';

export default class TaskManagerParent extends LightningElement {
    @track searchKey = '';

    handleSearch(event) {
        this.searchKey = event.detail;
    }
    
    handleTaskCreated() {
        const tableChild = this.template.querySelector('.task-table-component');
        if (tableChild) {
            tableChild.refreshTable();
        }
    }
}