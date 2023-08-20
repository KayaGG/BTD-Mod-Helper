import { BlockDef } from "./blockly-types";

import blocks from "../data/blocks.json";
import extraBlocks from "../data/extra-blocks.json";
import prefabReferences from "../data/prefab-references.json";
import audioSourceReferences from "../data/audio-source-references.json";
import spriteReferences from "../data/sprite-references.json";
import towers from "../data/towers.json";
import upgrades from "../data/upgrades.json";

const createResourceBlock =
  (type: string) =>
  ([guid, name]: [string, string]) =>
    ({
      type: `${type}_${guid}`,
      output: type,
      category: "Other",
      subcategory: type.substring(type.lastIndexOf(".") + 1) + "s",
      colour: "243",
      message0: `${name}%1%2`,
      args0: [
        {
          type: "field_hidden",
          name: "$type",
          value: `${type.replace("Il2Cpp", "")}, Assembly-CSharp`,
        },
        {
          type: "field_hidden",
          name: "guidRef",
          value: guid,
        },
      ],
    } as BlockDef);

export const prefabReferenceMap = prefabReferences as Record<string, string>;
export const prefabBlocks = Object.entries(prefabReferences).map(
  createResourceBlock("Il2CppAssets.Scripts.Utils.PrefabReference")
);

export const audioSourceReferenceMap = prefabReferences as Record<
  string,
  string
>;
export const audioSourceBlocks = Object.entries(audioSourceReferences).map(
  createResourceBlock("Il2CppAssets.Scripts.Utils.AudioSourceReference")
);

export const spriteReferenceMap = spriteReferences as Record<string, string>;
export const spriteBlocks = Object.entries(spriteReferences).map(
  createResourceBlock("Il2CppAssets.Scripts.Utils.SpriteReference")
);

export const towerSetColors = {
  Primary: "200",
  Military: "108",
  Magic: "262",
  Support: "34",
  Hero: "53",
  None: "#888888",
};

export const towerIds = towers as Record<string, string>;
export const towerBlocks = Object.entries(towerIds).map(
  ([id, towerSet]) =>
    ({
      type: `Tower_${id}`,
      output: ["Tower", "string", towerSet],
      category: "Towers",
      subcategory: towerSet,
      colour: towerSetColors[towerSet] ?? undefined,
      message0: id,
      args0: [],
      data: id,
    } as BlockDef)
);

export const upgradeIds = upgrades as Record<string, string>;
export const upgradeBlocks = Object.entries(upgradeIds).map(
  ([id, name]) =>
    ({
      type: `Upgrade_${id}`,
      output: ["Upgrade", "string"],
      category: "Upgrades",
      colour: "330",
      message0: name,
      args0: [],
      data: id,
    } as BlockDef)
);

export const allJsonBlocks = [
  ...extraBlocks,
  ...blocks,
  ...prefabBlocks,
  ...audioSourceBlocks,
  ...spriteBlocks,
  ...towerBlocks,
  ...upgradeBlocks,
] as BlockDef[];
