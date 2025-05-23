"use strict";
class Task {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = "pending";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    update(title, description) {
        this.title = title;
        this.description = description;
        this.updatedAt = new Date();
        console.log(`Task ${this.id} is successfully updated.`);
    }
    markAsCompleted() {
        this.status = "completed";
        this.updatedAt = new Date();
        console.log(`Task ${this.id} marked as completed.`);
    }
    listTask() {
        console.log(`Task Details: ID: ${this.id}, title: ${this.title}, Description: ${this.description}, Status: ${this.status}, Created At: ${this.createdAt}, Updated At: ${this.updatedAt}`);
    }
}
class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
        console.log("Task Manager is ready");
    }
    createTask(title, description) {
        const task = new Task(this.nextId++, title, description);
        this.tasks.push(task);
        console.log("Task created successfully.");
        return task;
    }
    updateTask(index, title, description) {
        const task = this.tasks[index];
        if (task) {
            task.update(title, description);
            console.log("Task updated successfully");
        }
        else {
            console.log(`No task to update at index: ${index}`);
        }
    }
    markTaskAsCompleted(index) {
        const task = this.tasks[index];
        if (task) {
            task.markAsCompleted();
        }
        else {
            console.log(`No task found at index ${index}`);
        }
    }
    listAllTasks() {
        if (this.tasks.length === 0) {
            console.log("there are no task available.");
        }
        else {
            console.log("List of all task:");
            for (const task of this.tasks) {
                task.listTask();
            }
        }
    }
}
const manager = new TaskManager();
const task1 = manager.createTask("Write code", "use oop, tyoescript, and make it clean");
const task2 = manager.createTask("Hold a meeting");
console.log(task2);
manager.updateTask(0, "write clean codee", "use OOP, Typescript, and make it clean");
manager.markTaskAsCompleted(1);
manager.listAllTasks();
