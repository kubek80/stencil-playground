import {
  Component,
  ComponentInterface,
  Host,
  h,
  Event,
  EventEmitter,
  Prop,
  State,
} from "@stencil/core";

export interface checkboxListItem {
  name: string;
  products: string[];
  id: number;
}

@Component({
  tag: "save-dialog",
  styleUrl: "save-dialog.css",
  shadow: true,
})
export class SaveDialog implements ComponentInterface {
  @Prop() lists: checkboxListItem[];
  @Prop() productId: string;

  @Event() close: EventEmitter;
  @Event() toggle: EventEmitter<number>;
  @Event() create: EventEmitter<string>;

  @State() showNewListForm = false;

  @State() value: string;

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.value);
    this.create.emit(this.value);
    this.showNewListForm = false;
    this.value = null;
  }

  handleChange(event) {
    this.value = event.target.value;
  }

  render() {
    return (
      <Host>
        <div class="card">
          <div class="heading">
            <div>Save to...</div>
            <div class="close-wrapper">
              <button class="close" onClick={() => this.close.emit()}></button>
            </div>
          </div>
          {this.showNewListForm && (
            <div>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div class="body">
                  <label>
                    Shopping list name:
                    <input
                      type="text"
                      value={this.value}
                      onInput={(event) => this.handleChange(event)}
                    />
                  </label>
                </div>

                <div class="footer">
                  <button type="submit" value="Submit" class="primary">
                    Create
                  </button>
                  <button
                    onClick={(ev) => {
                      ev.preventDefault();
                      this.showNewListForm = false;
                    }}
                    class="secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {!this.showNewListForm && (
            <div>
              <div class="body">
                {this.lists.map((list) => (
                  <div class="checkbox">
                    <input
                      type="checkbox"
                      id={"checkbox-" + list.id}
                      checked={list.products.includes(this.productId)}
                      onClick={(ev) => {
                        ev.preventDefault();
                        this.toggle.emit(list.id);
                      }}
                    ></input>
                    <label htmlFor={"checkbox-" + list.id}>{list.name}</label>
                  </div>
                ))}
              </div>

              <div class="footer">
                <button
                  class="simple"
                  onClick={() => (this.showNewListForm = true)}
                >
                  + Create new list
                </button>
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
