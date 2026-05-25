import { LightningElement, wire, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getRecentTasks from '@salesforce/apex/TaskManagerController.getRecentTasks';

export default class TaskListTable extends LightningElement {
    @api searchKey = '';

    // Updated the Subject column definition to type 'url'
    columns = [
        { 
            label: 'Subject', 
            fieldName: 'TaskUrl', // This points to the URL property we generate below
            type: 'url',
            typeAttributes: {
                label: { fieldName: 'Subject' }, // Displays the actual Subject text as the link label
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
                    WhoName: task.Who ? task.Who.Name : '',
                    WhatName: task.What ? task.What.Name : '',
                    // Dynamically constructing the standard Lightning record view URL string
                    TaskUrl: `/lightning/r/Task/${task.Id}/view`
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