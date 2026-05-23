public with sharing class TaskManagerController {
// Test 
    @AuraEnabled(cacheable=true)

    public static List<Task> getRecentTasks(String searchKey){
        String key = '%' + searchKey + '%';

        return [SELECT Id, Subject, Status, Priority, ActivityDate, WhoId, WhatId
                FROM Task 
                WHERE Subject LIKE :key
                LIMIT 10];
    }
}
