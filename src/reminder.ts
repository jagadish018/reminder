type reminder = {
  id?: string;
  title?: string;
  description?: string;
  dueDate?: string;
  isCompleted?: boolean;
};

export class reminderDatabase {
  private reminders: Map<string, reminder> = new Map();

  //creating reminder
  createReminder(reminder: reminder): string {
    let id = Math.random().toString(36).substring(2, 9);
    reminder.id = id;
    reminder.isCompleted = false;
    if (this.exist(id)) {
      this.reminders.set(id, reminder);
      console.log(`Reminder created successfully with id: ${id}\n`);
    } else {
      console.log("Reminder already exists\n"); //if reminder already exists
    }
    return id;
  }
  //check if reminder exists
  exist(id: string): boolean {
    return this.reminders.has(id);
  }

  //mark reminder as completed
  markReminderAsCompleted(id: string): void {
    if (!this.exist(id)) {
      console.log("\nReminder not found\n");
      return;
    }
    const existingReminder = this.reminders.get(id) || {};
    existingReminder.isCompleted = true;
    this.reminders.set(id, existingReminder);
    console.log("\nReminder marked as completed\n");
  }

  //mark reminder as incompleted
  unmarkReminderAsCompleted(id: string): void {
    if (!this.exist(id)) {
      console.log("\nReminder not found\n");
      return;
    }
    const existingReminder = this.reminders.get(id) || {};
    existingReminder.isCompleted = false;
    this.reminders.set(id, existingReminder);
    console.log("\nReminder marked as incompleted\n");
  }
  //get all reminders
  getAllReminders(): reminder[] {
    return Array.from(this.reminders.values());
  }

  //get reminder by id
  getReminder(id: string): reminder | undefined {
    return this.reminders.get(id);
  }

  //get all completed reminders
  getAllRemindersMarkedAsCompleted(): void {
    const completedReminder = Array.from(this.reminders.values()).filter(
      (reminder) => reminder.isCompleted
    );

    console.log("\nCompleted Reminders:\n");
    if (completedReminder.length === 0) {
      console.log("No reminders found\n");
    } else {
      console.log(completedReminder);
    }
    
  }

  //get all incompleted reminders
  getAllRemindersNotMarkedAsCompleted(): void {
    const incompletedReminders = Array.from(this.reminders.values()).filter(
      (reminder) => !reminder.isCompleted
    );

    console.log("\nIncomplete Reminders:\n");

    if (incompletedReminders.length === 0) {
      console.log("No incomplete reminders found.\n");
    } else {
      console.log(incompletedReminders);
    }

  }

  //get all past due reminders
  getAllRemindersDueByToday(): reminder[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure we compare only the date part

    const pastDueReminders = Array.from(this.reminders.values()).filter(
      (reminder) => {
        if (!reminder.dueDate) {
          return false;  // Ignore reminders without a due date
        }
        const reminderDate = new Date(reminder.dueDate); //
        return reminderDate < today;
      }
    );

    console.log("\nPast Due Reminders:\n");

    if (pastDueReminders.length === 0) {
      console.log("No past due reminders found.\n");
    } else {
      console.log(pastDueReminders);
    }

    return pastDueReminders;
  }

  //update reminder
  updateReminder(id: string, reminder: reminder): void {
    if (!this.exist(id)) {
      console.log("\nReminder not found\n");
      return;
    }
    const existingReminder = this.reminders.get(id);
    const newReminder = { ...existingReminder, ...reminder, id };
    this.reminders.set(id, newReminder);
    console.log("\nReminder updated successfully\n");
  }

  //remove reminder
  removeReminder(id: string): void {
    if (!this.exist(id)) {
      console.log("\nReminder not found\n");
      return;
    }
    this.reminders.delete(id);
    console.log("\nReminder removed successfully\n");
  }
}
