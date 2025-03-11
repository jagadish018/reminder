import { reminderDatabase } from "./reminder";

const reminderDB = new reminderDatabase();

//creating reminders
const id1 = reminderDB.createReminder({
  title: "Meeting",
  description: "Meeting with the team",
  dueDate: "2025-03-10",
});

const id2 = reminderDB.createReminder({
  title: "Interview",
  description: "Interview with the candidate",
  dueDate: "2021-10-15",
});

const id3 = reminderDB.createReminder({
  title: "Shopping",
  description: "Grocery Shopping",
  dueDate: "2021-10-20",
});

console.log("First-Time Creation:\n");
console.log(reminderDB.getAllReminders());

//updating 1st reminder
reminderDB.updateReminder(id1, {
  title: "Join the Meeting",
  description: "Team Meeting",
});

console.log("\nReminders after updating the first one:");
console.log(reminderDB.getAllReminders());

//removing 2nd reminder
reminderDB.removeReminder(id2);
console.log("After removing the second reminder:");
console.log(reminderDB.getAllReminders());

//marking 1st reminder completed
reminderDB.markAsCompleted(id1);
console.log("\nReminders after marking the first one as completed:");
console.log(reminderDB.getAllReminders());

//get all marked as completed tasks
reminderDB.getCompletedReminders();

//get all marked as uncompleted tasks
reminderDB.getIncompletedReminders();

//checking past due reminders
reminderDB.getPastDueReminders();
