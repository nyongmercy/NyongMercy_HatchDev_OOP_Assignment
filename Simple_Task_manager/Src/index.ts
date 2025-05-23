// Building a simple task manager with OOP to manage tasks by creating, updating, complete and listing tasks.

// Creating an interface to define what a task looks like
interface ITask {
    id: number;
    title: string;
    description?: string; // will be optional
    status: string; //'pending' or 'completed'
    createdAt: Date;
    updatedAt: Date;
}

//create a Task class to handle updating and marking as completed
class Task implements ITask {
     id: number;
    title: string;
    description?: string; // will be optional
    status: string; //'pending' or 'completed'
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, title: string, description?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = "pending";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    update(title: string, description?: string): void {
        this.title = title;
        this.description = description;
        this.updatedAt = new Date();
        console.log(`Task ${this.id} is successfully updated.`);
    }
    markAsCompleted(): void {
        this.status = "completed";
        this.updatedAt = new Date();
        console.log(`Task ${this.id} marked as completed.`);
    }
    listTask(): void {
        console.log(`Task Details: ID: ${this.id}, title: ${this.title}, Description: ${this.description}, Status: ${this.status}, Created At: ${this.createdAt}, Updated At: ${this.updatedAt}`);
    }

}

// creating a TaskManager class to create, list, update and to manage all tasks
class TaskManager {
    private tasks: Task[]; //an array to hold all tasks
    private nextId: number; //this will auto increment task ID

    constructor() {
        this.tasks = [];
        this.nextId = 1; 
        console.log("Task Manager is ready");
    }
    //creating a method to create and add a new task
    createTask(title: string, description?: string): Task {//the only two things(parameters) a user provides manually when creating a task
        const task = new Task(this.nextId++, title, description);
            this.tasks.push(task);
            console.log("Task created successfully.");
            return task;
    }   
    // Method to update the task title and description by task index
    updateTask(index: number, title: string, description?: string): void {
        const task = this.tasks[index];
        if (task) {
            task.update(title, description);
            console.log("Task updated successfully");
        } else {
            console.log(`No task to update at index: ${index}`);
        }
        }
        //Method to mark the task as completed by index
    markTaskAsCompleted(index: number): void {
            const task = this.tasks[index];
            if (task) {
                task.markAsCompleted();
            } else {
                console.log(`No task found at index ${index}`);
            }
        }
    //Method to list all Task
    listAllTasks(): void {
        if (this.tasks.length === 0) {
            console.log("there are no task available.");
        } else {
            console.log("List of all task:");
            for (const task of this.tasks) {
                task.listTask();
            }
        }
            
        }
    }

//testing the createTask method
const manager = new TaskManager();
const task1 = manager.createTask("Write code", "use oop, tyoescript, and make it clean");
const task2 = manager.createTask("Hold a meeting");
console.log(task2);

// testing updateTask method by task index
manager.updateTask(0, "write clean codee", "use OOP, Typescript, and make it clean");
manager.markTaskAsCompleted(1);
manager.listAllTasks()
