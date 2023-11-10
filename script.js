const taskInput = document.getElementById("taskInput");               // Input field for task text
const addTaskButton = document.getElementById("addTaskButton");       // Button to add tasks
const taskList = document.getElementById("taskList");                   // Container for task list
const totalTasksElement = document.getElementById("totalTasks");       // Display total tasks count
const completedTasksElement = document.getElementById("completedTasks"); // Display completed tasks count
const clearAllButton = document.getElementById("clearAllButton");       // Button to clear all tasks
const tasks = [];                                                       // Array to store tasks

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();  // Get trimmed text from the input field

    // Check if the input is not empty
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });  // Add task to the tasks array
        taskInput.value = "";  // Clear the input field
        updateTaskList();  // Update the displayed task list
    }
}

// Event listeners for adding tasks
addTaskButton.addEventListener("click", addTask);  // Add task when the button is clicked
taskInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();  // Add task when Enter key is pressed in the input field
    }
});

// Function to toggle the completion status of a task
function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;  // Toggle task completion status
    updateTaskList();  // Update the displayed task list
}

// Function to remove a task
function removeTask(index) {
    tasks.splice(index, 1);  // Remove task from the tasks array
    updateTaskList();  // Update the displayed task list
}

// Function to update the displayed task list
function updateTaskList() {
    taskList.innerHTML = "";  // Clear the task list container

    let completedCount = 0;  // Initialize completed task count

    // Loop through the tasks array and create HTML elements for each task
    for (let i = 0; i < tasks.length; i++) {
        const taskItem = document.createElement("li");  // Create a list item

        // Create a checkbox for task completion
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tasks[i].completed;
        checkbox.addEventListener("change", function() {
            toggleTaskStatus(i);
        });

        // Create a span for displaying task text with appropriate styling
        const taskText = document.createElement("span");
        taskText.textContent = tasks[i].text;
        taskText.style.textDecoration = tasks[i].completed ? "line-through" : "none";

        // Create an "Edit" button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", function() {
            toggleEditMode(i);
        });

        // Create a "Delete" button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function() {
            removeTask(i);
        });

        // Append the created elements to the task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        // Append the task item to the task list container
        taskList.appendChild(taskItem);

        if (tasks[i].completed) {
            completedCount++;  // Increment completed task count
        }
    }

    // Update the displayed total and completed task counts
    totalTasksElement.textContent = tasks.length;
    completedTasksElement.textContent = completedCount;
}

// Function to toggle the edit mode for a task
function toggleEditMode(index) {
    const taskItem = taskList.children[index];
    const taskText = taskItem.querySelector("span");
    const editButton = taskItem.querySelector(".edit-button");

    if (taskText.contentEditable === "true") {
        taskText.contentEditable = "false";  // Disable editing
        editButton.textContent = "Edit";  // Change button text to "Edit"
        tasks[index].text = taskText.textContent;  // Update task text in the array
    } else {
        taskText.contentEditable = "true";  // Enable editing
        editButton.textContent = "Save";  // Change button text to "Save"
    }
}

// Function to clear all tasks
function clearAllTasks() {
    tasks.length = 0;  // Clear the tasks array
    updateTaskList();  // Update the displayed task list
}

// Initial task list update
updateTaskList();

// Event listener for clearing all tasks
clearAllButton.addEventListener("click", clearAllTasks);