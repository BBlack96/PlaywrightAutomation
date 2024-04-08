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
}