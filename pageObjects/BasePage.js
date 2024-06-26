import Header from "./components/Header";


export default class BasePage {
    constructor(page, url) {
        this._page = page
        this._url = url
        this.header = new Header(page)
    }
    async find(locator){
        return await this._page.locator(locator)
    }

    async findByRole(role, options){
        return await this._page.getByRole(role, options)
    }

    async navigateToSettings(){
        await this._page.goto(this._url)
    }

    async getElementText(locator){
        const element = this._page.locator(locator);
        return await element.innerText();
    }

}