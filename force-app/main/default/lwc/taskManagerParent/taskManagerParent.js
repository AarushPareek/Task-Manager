import { LightningElement, track } from 'lwc';

export default class TaskManagerParent extends LightningElement {
    handleTaskCreated() {
        const tableChild = this.template.querySelector('.task-table-component');
        if (tableChild) {
            tableChild.refreshTable();
        }
    }
}