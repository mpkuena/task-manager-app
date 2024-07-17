// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyByxiVac7AzCmg9fiAoQhgqJGuB5sFzhKQ",
  authDomain: "task-manager-243c5.firebaseapp.com",
  databaseURL: "https://task-manager-243c5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "task-manager-243c5",
  storageBucket: "task-manager-243c5.appspot.com",
  messagingSenderId: "74680891917",
  appId: "1:74680891917:web:65e687e7149e3ff5493344"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const taskRef = ref(database, 'tasks');

// Select the elements from the DOM
const taskName = document.getElementById('taskName');
const taskComment = document.getElementById('taskComment');
const addBtn = document.getElementById('addButton');

// Reference to the display section in the HTML
const displayTask = document.getElementById('displaySection');

// Use the button to add the task to the database
addBtn.addEventListener("click", async function(event){
  event.preventDefault(); 
  await addTask(); 
});
  
// Save to Firebase Realtime Database using push method
async function addTask(){
  try {
    await push(taskRef, {
      taskName:taskName.value,
      taskComment: taskComment.value
    });
    console.log("Task saved into the database");

    loadTask()

    // Clear the input fields after successful save
    taskName.reset;
    taskComment.reset;

  } catch (err) {
      console.error("There was an error adding the task" , err);
  }

} 

// Fetch and display task and comments
async function loadTask(){
  try {
    await onValue(taskRef, function(snapshot) {
      snapshot.forEach(function(doc){
        const {taskName, taskComment} = doc.val();

        addContent(taskName, taskComment);

        console.log(taskName);
        console.log(taskComment)
      })
      
    })
    
  } catch (err) {
      console.error("There was an error in displaying the task", err)
  }
  
}

// Create a function to add content dynamically
function addContent(name, comment) {
  // Create a new div element
  const display = document.createElement('section');
  
  // Create and add name element
  const nameElement = document.createElement('p');
  nameElement.textContent = name;
  display.appendChild(nameElement);

  // Create and add comment element
  const commentElement = document.createElement('p');
  commentElement.textContent = comment;
  display.appendChild(commentElement);

  // Create and add line break
  const lineBreak = document.createElement('br');
  display.appendChild(lineBreak);

  // Append the display element to displayTask
  displayTask.appendChild(display);
}

  
