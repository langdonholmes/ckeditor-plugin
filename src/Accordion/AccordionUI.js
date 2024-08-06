import AccordionEvents from "./AccordionEvents";
import { getSelectedAccordionWidget } from "./AccordionUtils";
import "./Accordion.css";
import AccordionIcon from "./icons/accordion.svg";
import AccordionItemIcon from "./icons/accordion-item.svg";
import AccordionOpenCollapseIcon from "./icons/accordion-open-collapse.svg";

const Plugin = window.CKEditor5.core.Plugin;

const ButtonView = window.CKEditor5.ui.ButtonView;
const Model = window.CKEditor5.ui.Model;
const addListToDropdown = window.CKEditor5.ui.addListToDropdown;
const createDropdown = window.CKEditor5.ui.createDropdown;
const ContextualBalloon = window.CKEditor5.ui.ContextualBalloon;
const clickOutsideHandler = window.CKEditor5.ui.clickOutsideHandler;
const View = window.CKEditor5.ui.View;
const Collection = window.CKEditor5.utils.Collection;
const WidgetToolbarRepository = window.CKEditor5.widget.WidgetToolbarRepository;

console.log("Accordion Icon", AccordionIcon);

/**
 * Defines the user interface for editing Accordion widgets.
 */
export default class AccordionUI extends Plugin {
  /**
   * The plugin's name in the PluginCollection.
   */
  static get pluginName() {
    return "AccordionUI";
  }

  /**
   * The plugin's dependencies.
   */
  static get requires() {
    return [AccordionEvents, WidgetToolbarRepository];
  }

  init() {
    this.commands = this.editor.commands;
    const { plugins, ui } = this.editor;
    this.events = plugins.get("AccordionEvents");
    const componentFactory = ui.componentFactory;
    const command = this.commands.get("insertAccordion");

    // this._balloon = this.editor.plugins.get(ContextualBalloon);
    // this.formView = this._createFormView();

    // Creates button components that can be added to the main editor toolbar
    // through the config, or to the contextual balloon toolbar.
    componentFactory.add("Accordion", (locale) => {
      const buttonView = new ButtonView(locale);
      buttonView.set({
        label: locale.t("Accordion"),
        icon: AccordionIcon,
        tooltip: true,
        withText: false,
      });
      // Disables the button if the command is disabled.
      buttonView.bind("isEnabled").to(command);
      // Executes the command with the button's value on click.
      buttonView.on("execute", () => {
        command.execute({ command });
        this.editor.editing.view.focus();
      });

      // this.listenTo(buttonView, "execute", () => {
      //   this._showUI();
      // });

      return buttonView;
    });

    componentFactory.add("AccordionItem", (locale) =>
      this._buildAccordionItemToolbarDropdown(locale, this.events)
    );

    componentFactory.add("AccordionOpenCollapse", (locale) =>
      this._buildAccordionOpenCollapseToolbarDropdown(locale, this.events)
    );
  }

  afterInit() {
    const plugins = this.editor.plugins;
    const widgetToolbarRepository = plugins.get(WidgetToolbarRepository);

    // Creates contextual balloon for the accordion widget.
    // Could populate items using editor.config.
    widgetToolbarRepository.register("Accordion", {
      items: ["AccordionItem", "AccordionOpenCollapse"],
      getRelatedElement: getSelectedAccordionWidget,
    });
  }

  /**
   * Builds the dropdown with options for the selected accordion item.
   */
  _buildAccordionItemToolbarDropdown(locale, events) {
    const dropdownView = createDropdown(locale);
    const buttonView = dropdownView.buttonView;
    const list = new Collection();

    list.add({
      type: "button",
      model: createModel(
        this.commands.get("insertAccordionItem"),
        null,
        "insertAbove",
        locale.t("Insert item above")
      ),
    });
    list.add({
      type: "button",
      model: createModel(
        this.commands.get("insertAccordionItem"),
        null,
        "insertBelow",
        locale.t("Insert item below")
      ),
    });
    list.add({
      type: "button",
      model: createModel(
        this.commands.get("removeAccordionItem"),
        null,
        "remove",
        locale.t("Delete item")
      ),
    });

    addListToDropdown(dropdownView, list);

    dropdownView.on("execute", (eventInfo) =>
      events.fire("accordionItem", eventInfo.source.name)
    );

    buttonView.set({
      label: locale.t("Accordion item"),
      icon: AccordionItemIcon,
      tooltip: true,
      class: "ck-dropdown__button_label-width_auto",
      withText: false,
    });

    return dropdownView;
  }

  /**
   * Builds the dropdown with open/collapse options for the selected accordion.
   */
  _buildAccordionOpenCollapseToolbarDropdown(locale, events) {
    const dropdownView = createDropdown(locale);
    const buttonView = dropdownView.buttonView;
    const list = new Collection();

    list.add({
      type: "switchbutton",
      model: createModel(
        this.commands.get("AccordionFirstItemOpen"),
        true,
        "toggleFirstItemOpen",
        locale.t("Open first item")
      ),
    });
    list.add({
      type: "switchbutton",
      model: createModel(
        this.commands.get("AccordionItemsStayOpen"),
        "true",
        "toggleItemsStayOpen",
        locale.t("Allow opening multiple items")
      ),
    });
    list.add({ type: "separator" });
    list.add({
      type: "button",
      model: createModel(
        this.commands.get("AccordionOpenAll"),
        "true",
        "openAll",
        locale.t("Open all items")
      ),
    });
    list.add({
      type: "button",
      model: createModel(
        this.commands.get("AccordionCollapseAll"),
        "true",
        "collapseAll",
        locale.t("Collapse all items")
      ),
    });

    addListToDropdown(dropdownView, list);

    dropdownView.on("execute", (eventInfo) =>
      events.fire("accordion", eventInfo.source.name)
    );

    buttonView.set({
      label: locale.t("Accordion open / collapse"),
      icon: AccordionOpenCollapseIcon,
      tooltip: locale.t("Accordion open / collapse"),
      class: "ck-dropdown__button_label-width_auto",
      withText: false,
    });

    return dropdownView;
  }

  // /**
  //  * Creates a Form View
  //  */
  // _createFormView() {
  //   const editor = this.editor;

  //   const formView = new View(editor.locale);
  //   formView.ItemDropdown = this._buildAccordionItemToolbarDropdown(
  //     editor.locale,
  //     this.events
  //   );
  //   formView.OpenCollapse = this._buildAccordionOpenCollapseToolbarDropdown(
  //     editor.locale,
  //     this.events
  //   );

  //   formView.childViews = formView.createCollection([
  //     formView.ItemDropdown,
  //     formView.OpenCollapse,
  //   ]);

  //   formView.setTemplate({
  //     tag: "form",
  //     attributes: {
  //       class: ["ck", "ck-accordion-form"],
  //       tabindex: "-1",
  //     },
  //     children: formView.childViews,
  //   });

  //   formView.focus = function () {
  //     formView.childViews.first.focus();
  //   };

  //   // Hide the form view when clicking outside the balloon.
  //   // clickOutsideHandler({
  //   //   emitter: formView,
  //   //   activator: () => this._balloon.visibleView === formView,
  //   //   contextElements: [this._balloon.view.element],
  //   //   callback: () => this._hideUI(),
  //   // });
  //   return formView;
  // }

  // /**
  //  * Gets the position data for the contextual balloon.
  //  */
  // _getBalloonPositionData() {
  //   const view = this.editor.editing.view;
  //   const viewDocument = view.document;
  //   let target = null;

  //   // Set a target position by converting view selection range to DOM.
  //   target = () =>
  //     view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

  //   return {
  //     target,
  //   };
  // }

  // _showUI() {
  //   this._balloon.add({
  //     view: this.formView,
  //     position: this._getBalloonPositionData(),
  //   });

  //   this.formView.focus();
  // }

  // /**
  //  * Hides the contextual balloon.
  //  */
  // _hideUI() {
  //   this.formView.element.reset();

  //   this._balloon.remove(this.formView);

  //   // Focus the editing view after closing the form view.
  //   this.editor.editing.view.focus();
  // }
}

/**
 * Creates a model for dropdown items.
 */
function createModel(command, value, name, label, icon, className, withText) {
  const model = new Model({
    name,
    label: typeof withText === "string" ? withText : label,
    icon,
    tooltip: icon ? label : false,
    withText: withText || !icon,
    class: className,
  });

  model.bind("isEnabled").to(command);
  if (value !== null) {
    model
      .bind("isOn")
      .to(command, "value", (commandValue) => commandValue === value);
  }

  return model;
}
