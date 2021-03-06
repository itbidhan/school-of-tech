import Iso from 'iso.js';
const Tile = Iso.Tile;
const Color = Iso.Color;
Iso.DEBUG = false;

const tileIdToColor = {
  0: new Color('red'),
  1: new Color('blue'),
  2: new Color('pink'),
  3: new Color('orange'),
};

/**
 * The rendering engine for the game.
 */
export default class Renderer {

  /**
   * Sets up the renderer's container.
   * @param container
   */
  static setup(container:HTMLElement) {
    this.isoWorld = new Iso(container);
  }

  /**
   * Adds tiles to the world
   * @param tileGrid
   */
  static addTiles(tileGrid:Array<Array<Object>>) {
    for (let z = 0; z < tileGrid.length; ++z) {
      let xtiles = tileGrid[z];
      for (let x = 0; x < xtiles.length; ++x) {
        let tile = xtiles[x];
        if (tile !== null) {
          let isoTile = new Tile(1, 1).position(x, 0, z).color(tileIdToColor[tile]);
          this.isoWorld.add(isoTile);
        }
      }
    }
  }

  static addWalls(wallGrid:Array<Array<Array<number>>>) {
    const wallIndexToSide = [Tile.SIDE.XPOS, Tile.SIDE.XNEG, Tile.SIDE.ZPOS, Tile.SIDE.ZNEG];
    const wallToOffset = [{
      x: 0.5,
      z: 0,
    }, {
      x: -0.5,
      z: 0,
    }, {
      x: 0,
      z: 0.5,
    }, {
      x: 0,
      z: -0.5,
    }];

    for (let z = 0; z < wallGrid.length; ++z) {
      let xwalls = wallGrid[z];
      for (let x = 0; x < xwalls.length; ++x) {
        let walls = xwalls[x];

        // For all walls on this tile
        for (let i = 0; i < walls.length; ++i) {
          let wall = walls[i];
          if (wall !== null) {
            let rotation = wallIndexToSide[i];
            let wallOffset = wallToOffset[i];
            let isoTile = new Tile(1, 1)
              .position(x + wallOffset.x, 0.5, z + wallOffset.z)
              .color(tileIdToColor[wall])
              .rotation(rotation);
            this.isoWorld.add(isoTile);
          }
        }
      }
    }
  }

  /**
   * Renders the world.
   */
  static render() {
    this.isoWorld.render();
  }
}