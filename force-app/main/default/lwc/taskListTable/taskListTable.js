import { LightningElement, wire, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getRecentTasks from '@salesforce/apex/TaskManagerController.getRecentTasks';

export default class TaskListTable extends LightningElement {
    @api searchKey = '';

    columns = [
        { label: 'Subject', fieldName: 'Subject' },
        { label: 'Status', fieldName: 'Status' },
        { label: 'Priority', fieldName: 'Priority' },
        { label: 'Due Date', fieldName: 'ActivityDate', type: 'date' }
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
                    WhoName: task.Who ? task.Who.Name : '',
                    WhatName: task.What ? task.What.Name : ''
                };
            });
        } else if (result.error) {
            console.error('Error fetching tasks: ', result.error);
        }
    }

    @api
    refreshTable() {
        return refreshApex(this.wiredTasksResult);
    }
}