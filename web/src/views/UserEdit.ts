import { View } from "./View";
import { User, UserProps } from "../models/User";
import { UserShow } from "./UserShow";
import { UserForm } from "./UserForm";

export class UserEdit extends View<User, UserProps> {
  regionsMap() {
    return {
      userShow: "#user-show",
      userForm: "#user-form"
    };
  }
  onRender() {
    // nesting logic
    const userShow = new UserShow(this.regions.userShow, this.model);
    userShow.render();
    const userForm = new UserForm(this.regions.userForm, this.model);
    userForm.render();
  }
  template() {
    return `
    <div>
        <div id="user-show"></div>
        <div id="user-form"></div>
        </div>`;
  }
}
