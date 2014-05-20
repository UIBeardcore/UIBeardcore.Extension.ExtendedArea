Type.registerNamespace("UIBeardcore.Extension.ExtendedArea");

UIBeardcore.Extension.ExtendedArea.Info = function Info$Beardcore()
{
	Tridion.OO.enableInterface(this, "UIBeardcore.Extension.ExtendedArea.Info");
};

/**
 * When page is initialized, it triggers initialzie extenders to get initialized as well.
 * @param {String} deckPageId initial deck page id associated.
 * @param {Tridion.Controls.DeckPage} deckPage initial deck page associated.
 */
UIBeardcore.Extension.ExtendedArea.Info.prototype.initialize = function Info$Beardcore$initialize(deckPageId, deckPage)
{
	var p = this.properties;
	p.beardcore$ItemsCount = $("#itemsCount_Beardcore");

	var item = $display.getItem();
	if (Type.implementsInterface(item, "UIBeardcore.ItemType.ContentManagerExtensions.Folder"))
	{
		$evt.addEventHandler(item, "load", this.getDelegate(this._showInfo));
		$evt.addEventHandler(item, "staticload", this.getDelegate(this._showInfo));
		$evt.addEventHandler(item, "loading", this.getDelegate(this._showInfo));
		$evt.addEventHandler(item, "change", this.getDelegate(this._showInfo));

		if (item.isStaticLoaded() || item.isLoaded())
		{
			this._showInfo();
		}
		else
		{
			item.load();
		}
	}
};

/**
 * Clean up.
 */
Tridion.Cme.InfoTab.prototype.disposeInterface = Tridion.OO.nonInheritable(function Info$Beardcore$disposeInterface()
{
	if (this.isInitialized())
	{
		var item = $display.getItem();
		if (item)
		{
			var main = this.getMainInterface();
			$evt.removeEventHandler(item, "load", this.getDelegate(main._showInfo));
			$evt.removeEventHandler(item, "staticload", this.getDelegate(main._showInfo));
			$evt.removeEventHandler(item, "loading", this.getDelegate(main._showInfo));
			$evt.removeEventHandler(item, "change", this.getDelegate(main._showInfo));
		}
	}
});

UIBeardcore.Extension.ExtendedArea.Info.prototype._showInfo = function Info$Beardcore$_showInfo()
{
	var p = this.properties;
	var item = $display.getItem();
	if (item && p.beardcore$ItemsCount)
	{
		$dom.setInnerText(p.beardcore$ItemsCount, item.geContainedItemsCount$Beardcore());
	}
};

Tridion.Controls.Deck.registerInitializeExtender("InfoTab", UIBeardcore.Extension.ExtendedArea.Info);
