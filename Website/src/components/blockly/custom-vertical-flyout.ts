import Blockly, { VerticalFlyout } from "blockly";
import { FlyoutItem } from "blockly/core/flyout_base";
import { FlyoutButton } from "blockly/core";

export class CustomVerticalFlyout extends VerticalFlyout {
  constructor(workspaceOptions: Blockly.Options) {
    super(workspaceOptions);
    this.getWorkspace().addChangeListener(
      (event: Blockly.Events.BlockCreate) => {
        if (event.type !== Blockly.Events.BLOCK_CREATE) return;

        const workspace = Blockly.Workspace.getById(event.workspaceId);
        const block = workspace.getBlockById(event.blockId);

        block?.["postInit"]?.();
      }
    );
  }

  getFlyoutScale(): number {
    return 1;
  }

  protected layout_(contents: FlyoutItem[], gaps: number[]) {
    super.layout_(contents, gaps);

    for (let { button, block } of contents) {
      if (block) {
        for (let icon of block.icons) {
          const clone = icon["svgRoot"].cloneNode(true);
          icon["svgRoot"].parentNode.replaceChild(clone, icon["svgRoot"]);
          // @ts-ignore
          icon["svgRoot"] = clone;
        }
      } else if (button && button.info["colour"]) {
        const { style } = this.getWorkspace()
          .getRenderer()
          .getConstants()
          .getBlockStyleForColour(button.info["colour"]);

        const svg = button["svgGroup"] as SVGGElement;
        svg.setAttribute("style", `fill: ${style.colourPrimary};`);
        svg.onmouseenter = () =>
          svg.setAttribute("style", `fill: ${style.colourTertiary};`);
        svg.onmouseleave = () =>
          svg.setAttribute("style", `fill: ${style.colourPrimary};`);
      }
    }
  }
}
