import { test, expect } from "@playwright/test";
import {WelcomePage } from "../pageObjects/WelcomePage/WelcomePage";
import {USERS} from "../pageObjects/data/users";
import {GaragePage} from "../pageObjects/GaragePage/GaragePage";
import {SettingsPage} from "../pageObjects/SettingsPage/SettingsPage";
import {SignInPopup} from "../pageObjects/WelcomePage/components/SignInPopup";
import config from "../config/config";

test.describe("Positive auth", () => {
    let welcomePage;
    let garagePage;
    let settingsPage;
    let popup

    test.beforeEach(async ({page}) => {
        welcomePage = new WelcomePage(page);
        garagePage = new GaragePage(page);
        settingsPage = new SettingsPage(page);
        popup = new SignInPopup(page);
        await page.goto(config.baseUrl);
    })

    test.only('Positive: Successful registration', async ({page}) => {
        await welcomePage.clickSignUp()
        await popup.nameInput.fill(USERS.JOE_DOU.name);
        await popup.lastNameInput.fill(USERS.JOE_DOU.lastName);
        await popup.emailInput.fill(USERS.JOE_DOU.email);
        await popup.passwordInput.fill(USERS.JOE_DOU.password);
        await popup.repeatPasswordInput.fill(USERS.JOE_DOU.repeatPassword);
        await popup.signInButton.click();
        await expect(await  garagePage.getHeaderText()).toContain('Garage')
        await settingsPage.removeAccount();
    });
})

test.describe("Negative auth", () => {
    let welcomePage;
    let popup

    test.beforeEach(async ({page}) => {
        welcomePage = new WelcomePage(page);
        popup = new SignInPopup(page);
        await page.goto("");
    });

    test('Negative: Registration with a wrong name', async ({page}) => {
        await welcomePage.clickSignUp()
        await popup.nameInput.fill(USERS.SMILE.name);
        await popup.lastNameInput.fill(USERS.SMILE.lastName);
        await popup.emailInput.fill(USERS.SMILE.email);
        await popup.passwordInput.fill(USERS.SMILE.password);
        await popup.repeatPasswordInput.fill(USERS.SMILE.repeatPassword);
        await popup.emailInput.click()
        await expect(popup.nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(popup.nameError).toContainText('Name is invalid');
    });

    test('Negative: Different passwords', async ({page}) => {
        await welcomePage.clickSignUp()
        await popup.nameInput.fill(USERS.JOE_DOU.name);
        await popup.lastNameInput.fill(USERS.JOE_DOU.lastName);
        await popup.emailInput.fill(USERS.JOE_DOU.email);
        await popup.passwordInput.fill(USERS.JOE_DOU.password);
        await popup.repeatPasswordInput.fill(USERS.WRONG_PASSWORD.repeatPassword);
        await popup.emailInput.click()
        await expect(popup.repeatPasswordInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(popup.repeatPasswordError).toContainText('Passwords do not match');
    });

    test('Negative: Name length more than 20 characters', async ({page}) => {
        await welcomePage.clickSignUp()
        await popup.nameInput.fill(USERS.LONG_NAME.name);
        await popup.lastNameInput.fill(USERS.LONG_NAME.lastName);
        await popup.emailInput.fill(USERS.LONG_NAME.email);
        await popup.passwordInput.fill(USERS.LONG_NAME.password);
        await popup.repeatPasswordInput.fill(USERS.LONG_NAME.repeatPassword);
        await popup.emailInput.click()
        await expect(popup.nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(popup.nameError).toContainText('Name has to be from 2 to 20 characters long');
    });

    test('Negative: Invalid email', async ({page}) => {
        await welcomePage.clickSignUp()
        await popup.nameInput.fill(USERS.INVALID_EMAIL.name);
        await popup.lastNameInput.fill(USERS.INVALID_EMAIL.lastName);
        await popup.emailInput.fill(USERS.INVALID_EMAIL.email);
        await popup.passwordInput.fill(USERS.INVALID_EMAIL.password);
        await popup.repeatPasswordInput.fill(USERS.INVALID_EMAIL.repeatPassword);
        await popup.emailInput.click()
        await expect(popup.emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(popup.emailError).toContainText('Email is incorrect');
    });

    test('Negative: Empty last name', async ({page}) => {
        await welcomePage.clickSignUp()
        await popup.nameInput.fill(USERS.EMPTY_LASTNAME.name);
        await popup.lastNameInput.fill(USERS.EMPTY_LASTNAME.lastName);
        await popup.emailInput.fill(USERS.EMPTY_LASTNAME.email);
        await popup.passwordInput.fill(USERS.EMPTY_LASTNAME.password);
        await popup.repeatPasswordInput.fill(USERS.EMPTY_LASTNAME.repeatPassword);
        await popup.emailInput.click()
        await expect(popup.lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(popup.lastNameError).toContainText('Last name required');
    })

    test('Negative: Invalid password', async ({page}) => {
        await welcomePage.clickSignUp()
        await popup.nameInput.fill(USERS.INVALID_PASSWORD.name);
        await popup.lastNameInput.fill(USERS.INVALID_PASSWORD.lastName);
        await popup.emailInput.fill(USERS.INVALID_PASSWORD.email);
        await popup.passwordInput.fill(USERS.INVALID_PASSWORD.password);
        await popup.repeatPasswordInput.fill(USERS.INVALID_PASSWORD.repeatPassword);
        await popup.emailInput.click()
        await expect(popup.passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(popup.passwordError).toContainText('Password has to be from 8 to 15 characters ' +
            'long and contain at least one integer, one capital, and one small letter');
    });

    test('Negative: Empty password', async ({page}) => {
        await welcomePage.clickSignUp()
        await popup.nameInput.fill(USERS.EMPTY_PASSWORD.name);
        await popup.lastNameInput.fill(USERS.EMPTY_PASSWORD.lastName);
        await popup.emailInput.fill(USERS.EMPTY_PASSWORD.email);
        await popup.passwordInput.fill(USERS.EMPTY_PASSWORD.password);
        await popup.repeatPasswordInput.fill(USERS.EMPTY_PASSWORD.repeatPassword);
        await popup.emailInput.click()
        await expect(popup.passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(popup.passwordError).toContainText('Password required');
    });

    test('Negative: Empty re-enter password', async ({page}) => {
        await welcomePage.clickSignUp()
        await popup.nameInput.fill(USERS.EMPTY_RE_ENTER_PASSWORD.name);
        await popup.lastNameInput.fill(USERS.EMPTY_RE_ENTER_PASSWORD.lastName);
        await popup.emailInput.fill(USERS.EMPTY_RE_ENTER_PASSWORD.email);
        await popup.passwordInput.fill(USERS.EMPTY_RE_ENTER_PASSWORD.password);
        await popup.repeatPasswordInput.fill(USERS.EMPTY_RE_ENTER_PASSWORD.repeatPassword);
        await popup.emailInput.click()
        await expect(popup.repeatPasswordInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
        await expect(popup.repeatPasswordError).toContainText('Re-enter password required');
    });
})