

export class Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;

  constructor( id:string,title: string, description: string, dueDate: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}

export class ReminderDatabase {
  private reminders: Map<string, Reminder>;

  constructor() {
    this.reminders = new Map<string, Reminder>();
  }
  createReminder(title: string, description: string, dueDate: string): void {
    const id = Math.random().toString(36).substr(2, 9);
    if (this.exists(id)) {
      console.log(`Reminder with ID '${id}' already exists.`);
    }
    const reminder = new Reminder(id,title, description, dueDate);
    this.reminders.set(id, reminder);
  }

  exists(id: string): boolean {
    return this.reminders.has(id);
  }

  getAllReminders(): Reminder[] {
    return Array.from(this.reminders.values());
  }

  getReminder(id: string): Reminder {
    
    return this.reminders.get(id) as Reminder;
  }

  removeReminder(id: string): void {
    if (!this.exists(id)) {
      console.log(`Reminder with ID '${id}' does not exist.`);
    }
    this.reminders.delete(id);
  }

  updateReminder(id: string,title?: string,description?: string,dueDate?: string): void {
    const reminder = this.getReminder(id);
    if (!reminder) {
      console.log(`Reminder with ID '${id}' does not exist.`);
    }
    if (title) reminder.title = title;
    if (description) reminder.description = description;
    if (dueDate) reminder.dueDate = dueDate;
  }
}
