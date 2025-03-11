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
    let id = Math.random().toString(36).substring(2, 11);
    reminder.id = id;
    this.reminders.set(id, { ...reminder, id, isCompleted: false });
    console.log(`Reminder created successfully with id: ${id}\n`);
    return id;
  }

  //get reminder by id
  getReminder(id: string): reminder | undefined {
    return this.reminders.get(id);
  }

  //get all reminders
  getAllReminders(): reminder[] {
    return Array.from(this.reminders.values());
  }

  //remove reminder
  removeReminder(id: string): void {
    if (!this.reminders.has(id)) {
      console.log("\nReminder not found\n");
      return;
    }
    this.reminders.delete(id);
    console.log("\nReminder removed successfully\n");
  }

  //update reminder
  updateReminder(id: string, reminder: reminder): void {
    if (!this.reminders.has(id)) {
      console.log("\nReminder not found\n");
      return;
    }
    const existingReminder = this.reminders.get(id);
    const newReminder = { ...existingReminder, ...reminder, id };
    this.reminders.set(id, newReminder);
    console.log("\nReminder updated successfully\n");
  }

  //mark reminder as completed
  markAsCompleted(id: string): void {
    if (!this.reminders.has(id)) {
      console.log("\nReminder not found\n");
      return;
    }
    const existingReminder = this.reminders.get(id)!;
    existingReminder.isCompleted = true;
    this.reminders.set(id, existingReminder);
    console.log("\nReminder marked as completed\n");
  }

  //mark reminder as incompleted
  markAsIncompleted(id: string): void {
    if (!this.reminders.has(id)) {
      console.log("\nReminder not found\n");
      return;
    }
    const existingReminder = this.reminders.get(id)!;
    existingReminder.isCompleted = false;
    this.reminders.set(id, existingReminder);
    console.log("\nReminder marked as incompleted\n");
  }

  //get all completed reminders
  getCompletedReminders(): void {
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
  getIncompletedReminders(): reminder[] {
    const incompletedReminders = Array.from(this.reminders.values()).filter(
      (reminder) => !reminder.isCompleted
    );

    console.log("\nIncomplete Reminders:\n");

    if (incompletedReminders.length === 0) {
      console.log("No incomplete reminders found.\n");
    } else {
      console.log(incompletedReminders);
    }

    return incompletedReminders;
  }

  //get all past due reminders
  getPastDueReminders(): reminder[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure we compare only the date part

    const pastDueReminders = Array.from(this.reminders.values()).filter(
      (reminder) => {
        if (!reminder.dueDate) {
          return false;
        }
        const reminderDate = new Date(reminder.dueDate);
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
}
