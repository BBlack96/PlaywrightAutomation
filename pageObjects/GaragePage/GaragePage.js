import BasePage from "../BasePage";


export class GaragePage extends BasePage{
    _pageHeader = "//h1[text()='Garage']"
    constructor(page) {
        super(page, "/panel/garage")
        this.header = this._page.locator(this._pageHeader)
    }

    async getHeaderText(){
        return await this.getElementText(this._pageHeader);
    }

}