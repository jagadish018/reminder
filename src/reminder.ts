type reminder = {
    id?: string | null;
    title?: string;
    description?: string;
    dueDate?: string;
    isCompleted?: boolean;
}

export class reminderDatabase {
  private remind: Map<string, reminder> = new Map();

  createReminder(reminder: reminder): string {
    let id = Math.random().toString(36).substring(2, 11);//generating random id
    reminder.id = id;
    reminder.isCompleted = false;
    this.remind.set(id, reminder);//adding reminder to the map
    console.log(`Reminder created successfully with id: ${id}\n`);
    return id;
  }
  exists(id: string): boolean {
    return this.remind.has(id);//checking if reminder exists
  }

  getReminder(id: string): reminder | null {
    return this.remind.get(id) || null;//getting reminder by id
  }

  getAllReminders(): reminder[] {
    return Array.from(this.remind.values());
  }

  removeReminder(id: string): void {
    if (!this.exists(id)) {
      console.log("\nReminder not found\n");
      return;
    }
    this.remind.delete(id);
    console.log("\nReminder removed successfully\n");
  }

  updateReminder(id: string, reminder: reminder): void {
    if (!this.exists(id)) {
      console.log("\nReminder not found\n");
      return;
    }
    const existingReminder = this.remind.get(id);
    const newReminder = { ...existingReminder, ...reminder, id };
    this.remind.set(id, newReminder);
    console.log("\nReminder updated successfully\n");
  }

  markReminderAsCompleted(ids: string[]): void {
    ids.forEach((id) => {
      if (!this.exists(id)) {
        console.log("\nReminder not found\n");
        return;
      }
      const reminder = this.remind.get(id)!;
      reminder.isCompleted = true;
      this.remind.set(id, reminder);
      console.log("\nReminder marked as completed\n");
    });
  }

  getAllRemindersMarkedAsCompleted(): string []{
    const completedReminders = Array.from(this.remind.values()).filter(
      (reminder) => reminder.isCompleted
    );
    console.log("\nCompleted Reminders:\n");
    console.log(completedReminders);
    return completedReminders.map((reminder) => reminder
      .id || "");
    
  }

  unmarkReminderAsCompleted(ids: string[]): void {
    ids.forEach((id) => {
      if (!this.exists(id)) {
        console.log("\nReminder not found\n");
        return;
      }
      const reminder = this.remind.get(id)!;
      reminder.isCompleted = false;
      this.remind.set(id, reminder);
      console.log("\nReminder unmarked as completed\n");
    });
  }

  getAllRemindersNotMarkedAsCompleted(): string []{
    const incompletedReminders = Array.from(this.remind.values()).filter(
      (reminder) => !reminder.isCompleted
    );
    console.log("\nIncompleted Reminders:\n");
    console.log(incompletedReminders);
    return incompletedReminders.map((reminder) => reminder
      .id || "");
  }

  getAllRemindersDueByToday(): string []{
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const remindersDueByToday = Array.from(this.remind.values()).filter(
      (reminder) => {
        if (!reminder.dueDate) {
          return false;
        }
        const dueDate = new Date(reminder.dueDate);
        return dueDate < today;
      }
    );

    console.log("\nReminders due by today:\n");
    if (remindersDueByToday.length === 0) {
      console.log("No reminders found\n");
    } else {
      console.log(remindersDueByToday);
    }
    return remindersDueByToday.map((reminder) => reminder
      .id || "");
  }
}