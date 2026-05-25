import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TaskCreateForm extends LightningElement {
    @track currentStep = '1';
    @track newTaskId = '';

    // Getter to get current step inside template
    get isStepOne() {
        return this.currentStep === '1';
    }

    // When the user clicks 'Next' and the record saves then:
    handleSuccess(event) {
        // 1. Extract the newly generated Task Record ID.
        this.newTaskId = event.detail.id;

        // 2. Fire the custom event up to parent to refresh the table view
        const customEvent = new CustomEvent('taskcreated');
        this.dispatchEvent(customEvent);

        // 3. Change page to the File Upload screen
        this.currentStep = '2';
    }

    handleFileUpload(event) {
        const uploadedFiles = event.detail.files.length;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Files Uploaded',
                message: 'Document(s) attached to the task successfully!',
                variant: 'success'
            })
        );
    }

    handleFinish() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Task details saved successfully!',
                variant: 'success'
            })
        );
        // Back to step 1
        this.newTaskId = '';
        this.currentStep = '1';
    }
}