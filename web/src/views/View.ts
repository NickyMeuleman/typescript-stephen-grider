import { Model } from "../models/Model";

// that funky generic syntax reads like this:
// View expects a generic type of Model (or something that extends it)
// but Model expects a generic type as well
// the generic type passed to Model will come from the second generic type passed to View
export abstract class View<T extends Model<U>, U> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
    // the code below errors because of my favourite JavaScript thing, this 'this' value
    // model.on("change", this.render);
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel() {
    this.model.on("change", () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    Object.entries(eventsMap).forEach(([key, value]) => {
      const [eventName, selector] = key.split(":");
      const elements = fragment.querySelectorAll(selector);
      elements.forEach(element => {
        element.addEventListener(eventName, value);
      });
    });
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    Object.entries(regionsMap).forEach(([key, value]) => {
      const element = fragment.querySelector(value);
      if (element) {
        this.regions[key] = element;
      }
    });
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    const fragment = templateElement.content;
    this.bindEvents(fragment);
    this.mapRegions(fragment);

    this.onRender();

    this.parent.append(fragment);
  }
}
