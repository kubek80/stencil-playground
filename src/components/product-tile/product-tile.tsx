import {
  Component,
  ComponentInterface,
  Host,
  h,
  Prop,
  Listen,
  State,
  Event,
  EventEmitter,
} from "@stencil/core";

@Component({
  tag: "product-tile",
  styleUrl: "product-tile.scss",
  shadow: true,
})
export class ProductTile implements ComponentInterface {
  @Prop() productId: string;
  @Prop() productName: string;
  @Prop() imageSrc: string;
  @Prop() price: string;
  @Prop() pricePerUnit: string;
  @Prop() lists: string;

  @Event() addList: EventEmitter;
  @Event() toggleSelection: EventEmitter;

  @State() saveDialogShown = false;

  @Listen("close")
  closeSaveDialog() {
    this.saveDialogShown = false;
  }

  @Listen("toggle")
  updateList(ev) {
    this.toggleSelection.emit({ listId: ev.detail, prodId: this.productId });
  }

  @Listen("create")
  createList(ev) {
    this.addList.emit({ listName: ev.detail, prodId: this.productId });
  }

  render() {
    console.log(JSON.parse(this.lists));
    const [integerVal, decimalVal] = this.price.split(".");
    return (
      <Host>
        <div class="flex-column">
          <div class="image-container">
            <img src={this.imageSrc} />
          </div>

          <h3>{this.productName}</h3>

          <div class="flex-row">
            <div class="price">
              <span class="dollar">$</span>
              <span class="integer">{integerVal}.</span>
              <span class="decimal">{decimalVal}</span>
            </div>
            <div class="pricePerUnit">{this.pricePerUnit}</div>
          </div>

          <div class="actions">
            <div class="text-center">
              <button class="addToCart">Add to Card</button>
            </div>
            <div class="text-center">
              <button
                class="addToList"
                onClick={() => (this.saveDialogShown = true)}
              >
                + Save to list
              </button>
            </div>
          </div>
        </div>
        {this.saveDialogShown && (
          <save-dialog
            lists={JSON.parse(this.lists)}
            product-id={this.productId}
          ></save-dialog>
        )}
      </Host>
    );
  }
}
