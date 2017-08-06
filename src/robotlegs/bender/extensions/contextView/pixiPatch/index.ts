//
// Patch PIXI to emit "added"/"removed" events on global event dispatcher
//

import "./eventemitter3-patch";

export function applyPixiPatch(interaction: any) {

    let addChild = PIXI.DisplayObjectContainer.prototype.addChild;
    let addChildAt = PIXI.DisplayObjectContainer.prototype.addChildAt;
    let removeChild = PIXI.DisplayObjectContainer.prototype.removeChild;
    let removeChildAt = PIXI.DisplayObjectContainer.prototype.removeChildAt;

    PIXI.DisplayObjectContainer.prototype.addChild = function(...child: any[]): PIXI.DisplayObject {
        for (var i = 0, len = child.length; i < len; i++) {
            addChild.call(this, child[i]);
            interaction.emit("added", { target: child[i] });
        }
        return this;
    };

    PIXI.DisplayObjectContainer.prototype.addChildAt = function(child, index): PIXI.DisplayObject {
        addChildAt.call(this, child, index);
        interaction.emit("added", { target: child });
        return this;
    };

    PIXI.DisplayObjectContainer.prototype.removeChild = function(...child: any[]): PIXI.DisplayObject {
        for (var i = 0, len = child.length; i < len; i++) {
            removeChild.call(this, child[i]);
            interaction.emit("removed", { target: child[i] });
        }
        return this;
    };

    PIXI.DisplayObjectContainer.prototype.removeChildAt = function(index): PIXI.DisplayObject {
        var child = removeChildAt.call(this, index);
        interaction.emit("removed", { target: child });
        return this;
    };

}
