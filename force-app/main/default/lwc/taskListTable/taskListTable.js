import { LightningElement, wire, api, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getRecentTasks from '@salesforce/apex/TaskManagerController.getRecentTasks';

export default class TaskListTable extends LightningElement {

    @track searchKey = '';

    handleSearchChange(event) {
        this.searchKey = event.target.value;
    }

    @api searchKey = '';

    // Updated the Subject column definition to type 'url'
    columns = [
        { 
            label: 'Subject', 
            fieldName: 'TaskUrl',
            type: 'url',
            typeAttributes: {
                label: { fieldName: 'Subject' },
                target: '_blank'
            }
        },
        { label: 'Status', fieldName: 'Status' },
        { label: 'Priority', fieldName: 'Priority' },
        { label: 'Due Date', fieldName: 'ActivityDate', type: 'date' },
        { label: 'Name', fieldName: 'WhoName' },
        { label: 'Related To', fieldName: 'WhatName' }
    ];
    
    tableData = [];
    wiredTasksResult;

    @wire(getRecentTasks, { searchKey: '$searchKey' })
    wiredTasks(result) {
        this.wiredTasksResult = result;
        if (result.data) {
            this.tableData = result.data.map(task => {
                return {
                    ...task,
                    WhoName: task.Who.Name,
                    WhatName: task.What.Name,
                    TaskUrl: `/lightning/r/Task/${task.Id}/view`
                };
            });
        } else if (result.error) {
            console.error('Error: ', result.error);
        }
    }

    @api
    refreshTable() {
        return refreshApex(this.wiredTasksResult);
    }
}