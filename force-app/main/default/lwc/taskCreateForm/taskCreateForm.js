import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TaskCreateForm extends LightningElement {
    @track currentStep = '1'; // Steps: '1' = Details Form, '2' = File Upload
    @track newTaskId = '';    // Stores the ID of the created Task

    // Getter to cleanly evaluate current step inside template
    get isStepOne() {
        return this.currentStep === '1';
    }

    // Allowed file formats for uploading
    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg', '.docx', '.xlsx', '.csv'];
    }

    // Executes immediately when the user clicks 'Next' and the record saves successfully
    handleSuccess(event) {
        // 1. Extract the newly generated Task Record ID from the event payload
        this.newTaskId = event.detail.id;

        // 2. Fire the custom event up to parent to dynamically refresh the table view
        const customEvent = new CustomEvent('taskcreated');
        this.dispatchEvent(customEvent);

        // 4. Advance the wizard layout to the File Upload screen
        this.currentStep = '2';
    }

    // Optional: Fires a confirmation toast whenever files finish uploading successfully
    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files.length;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Files Uploaded',
                message: 'Document(s) attached to the task successfully!',
                variant: 'success'
            })
        );
    }

    // Executes when the user clicks 'Finish Task' to loop back to a clean slate
    handleFinish() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Task details saved successfully!',
                variant: 'success'
            })
        );
        // Clear out state trackers and return seamlessly back to step 1
        this.newTaskId = '';
        this.currentStep = '1';
    }
}