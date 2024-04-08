import { test, expect } from "@playwright/test";
import {WelcomePage } from "../pageObjects/WelcomePage/WelcomePage";
import {USERS} from "../pageObjects/data/users";
import {GaragePage} from "../pageObjects/GaragePage/GaragePage";

test.describe("Positive auth", () => {
    let welcomePage;
    let garagePage;

    test.beforeEach(async ({page}) => {
        welcomePage = new WelcomePage(page);
        garagePage = new GaragePage(page);
        await page.goto("");
    })

    test('Positive: Successful registration', async ({page}) => {
        await welcomePage.clickSignUp()
        await welcomePage.fillName(USERS.JOE_DOU.name);
        await welcomePage.fillLastName(USERS.JOE_DOU.lastName);
        await welcomePage.fillEmail(USERS.JOE_DOU.email);
        await welcomePage.fillPassword(USERS.JOE_DOU.password);
        await welcomePage.fillRepeatPassword(USERS.JOE_DOU.repeatPassword);
        await welcomePage.clickRegister()
        await expect(page.getByRole('heading')).toContainText('Garage');
        await garagePage.navigateToSettings();
        await garagePage.removeAccount();
    });
})

test.describe("Negative auth", () => {
    let welcomePage;

    test.beforeEach(async ({page}) => {
        welcomePage = new WelcomePage(page);
        await page.goto("");
    });

    test('Negative: Registration with a wrong name', async ({page}) => {
        await welcomePage.clickSignUp()
        await welcomePage.fillName(USERS.SMILE.name);
        await welcomePage.fillLastName(USERS.SMILE.lastName);
        await welcomePage.fillEmail(USERS.SMILE.email);
        await welcomePage.fillPassword(USERS.SMILE.password);
        await welcomePage.fillRepeatPassword(USERS.SMILE.repeatPassword);
        await welcomePage.clickEmail()
        await expect(page.locator("//input[@id='signupName']")).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(page.locator("form")).toContainText('Name is invalid');
    });

    test('Negative: Different passwords', async ({page}) => {
        await welcomePage.clickSignUp()
        await welcomePage.fillName(USERS.JOE_DOU.name);
        await welcomePage.fillLastName(USERS.JOE_DOU.lastName);
        await welcomePage.fillEmail(USERS.JOE_DOU.email);
        await welcomePage.fillPassword(USERS.JOE_DOU.password);
        await welcomePage.fillRepeatPassword(USERS.WRONG_PASSWORD.repeatPassword);
        await welcomePage.clickEmail()
        await expect(page.locator("//input[@id='signupRepeatPassword']")).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(page.locator("form")).toContainText('Passwords do not match');
    });

    test('Negative: Name length more than 20 characters', async ({page}) => {
        await welcomePage.clickSignUp()
        await welcomePage.fillName(USERS.LONG_NAME.name);
        await welcomePage.fillLastName(USERS.LONG_NAME.lastName);
        await welcomePage.fillEmail(USERS.LONG_NAME.email);
        await welcomePage.fillPassword(USERS.LONG_NAME.password);
        await welcomePage.fillRepeatPassword(USERS.LONG_NAME.repeatPassword);
        await welcomePage.clickEmail()
        await expect(page.locator("//input[@id='signupName']")).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(page.locator("form")).toContainText('Name has to be from 2 to 20 characters long');
    });

    test('Negative: Invalid email', async ({page}) => {
        await welcomePage.clickSignUp()
        await welcomePage.fillName(USERS.INVALID_EMAIL.name);
        await welcomePage.fillLastName(USERS.INVALID_EMAIL.lastName);
        await welcomePage.fillEmail(USERS.INVALID_EMAIL.email);
        await welcomePage.fillPassword(USERS.INVALID_EMAIL.password);
        await welcomePage.fillRepeatPassword(USERS.INVALID_EMAIL.repeatPassword);
        await welcomePage.clickEmail()
        await expect(page.locator("//input[@id='signupEmail']")).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(page.locator("form")).toContainText('Email is incorrect');
    });

    test('Negative: Empty last name', async ({page}) => {
        await welcomePage.clickSignUp()
        await welcomePage.fillName(USERS.EMPTY_LASTNAME.name);
        await welcomePage.fillLastName(USERS.EMPTY_LASTNAME.lastName);
        await welcomePage.fillEmail(USERS.EMPTY_LASTNAME.email);
        await welcomePage.fillPassword(USERS.EMPTY_LASTNAME.password);
        await welcomePage.fillRepeatPassword(USERS.EMPTY_LASTNAME.repeatPassword);
        await welcomePage.clickEmail()
        await expect(page.locator("//input[@id='signupLastName']")).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(page.locator("form")).toContainText('Last name required');
    })

    test('Negative: Invalid password', async ({page}) => {
        await welcomePage.clickSignUp()
        await welcomePage.fillName(USERS.INVALID_PASSWORD.name);
        await welcomePage.fillLastName(USERS.INVALID_PASSWORD.lastName);
        await welcomePage.fillEmail(USERS.INVALID_PASSWORD.email);
        await welcomePage.fillPassword(USERS.INVALID_PASSWORD.password);
        await welcomePage.fillRepeatPassword(USERS.INVALID_PASSWORD.repeatPassword);
        await welcomePage.clickEmail()
        await expect(page.locator("//input[@id='signupPassword']")).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(page.locator("form")).toContainText('Password has to be from 8 to 15 characters ' +
            'long and contain at least one integer, one capital, and one small letter');
    });

    test('Negative: Empty password', async ({page}) => {
        await welcomePage.clickSignUp()
        await welcomePage.fillName(USERS.EMPTY_PASSWORD.name);
        await welcomePage.fillLastName(USERS.EMPTY_PASSWORD.lastName);
        await welcomePage.fillEmail(USERS.EMPTY_PASSWORD.email);
        await welcomePage.fillPassword(USERS.EMPTY_PASSWORD.password);
        await welcomePage.fillRepeatPassword(USERS.EMPTY_PASSWORD.repeatPassword);
        await welcomePage.clickEmail()
        await expect(page.locator("//input[@id='signupPassword']")).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(page.locator("form")).toContainText('Password required');
    });

    test('Negative: Empty re-enter password', async ({page}) => {
        await welcomePage.clickSignUp()
        await welcomePage.fillName(USERS.EMPTY_RE_ENTER_PASSWORD.name);
        await welcomePage.fillLastName(USERS.EMPTY_RE_ENTER_PASSWORD.lastName);
        await welcomePage.fillEmail(USERS.EMPTY_RE_ENTER_PASSWORD.email);
        await welcomePage.fillPassword(USERS.EMPTY_RE_ENTER_PASSWORD.password);
        await welcomePage.fillRepeatPassword(USERS.EMPTY_RE_ENTER_PASSWORD.repeatPassword);
        await welcomePage.clickEmail()
        await expect(page.locator("//input[@id='signupRepeatPassword']")).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(page.locator("form")).toContainText('Re-enter password required');
    });
})