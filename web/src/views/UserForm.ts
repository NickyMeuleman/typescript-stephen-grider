import { User, UserProps } from "../models/User";
import { View } from "./View";

// by passing those generics to view, typescript understands that this.model is an instance of the User model class
export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:#set-age": this.onSetAgeclick,
      "click:#set-name": this.onSetNameClick,
      "click:#save": this.onSaveClick
    };
  }
  onSetAgeclick = (): void => {
    this.model.setRandomAge();
  };
  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    const name = input && input.value;
    name && this.model.set({ name });
  };
  onSaveClick = (): void => {
    this.model.save();
  };
  template(): string {
    return `
    <div>
        <input placeholder="${this.model.get("name")}"/>
        <button id="set-name">Update name</button>
        <button id="set-age">Set random age</button>
        <button id="save">Save</button>
    </div>
    `;
  }
}
