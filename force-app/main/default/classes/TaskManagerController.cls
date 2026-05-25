public with sharing class TaskManagerController {

    @AuraEnabled(cacheable=true)

    public static List<Task> getRecentTasks(String searchKey){
        String key = '%' + searchKey + '%';

        return [SELECT Id, Subject, Status, Priority, ActivityDate, WhoId, Who.Name, WhatId, What.Name
                FROM Task 
                WHERE Subject 
                LIKE :key];
    }
}
