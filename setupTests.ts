/// <reference types="vitest/globals" />
import "@testing-library/jest-dom"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import { chromium, Browser, Page } from "playwright"
import { write } from "clipboardy"

let browser: Browser
let page: Page

let envPath = path.resolve(process.cwd(), ".env.test.local")

if (!fs.existsSync(envPath)) {
  envPath = path.resolve(process.cwd(), ".env.test")
}

dotenv.config({
  path: envPath,
})

const baseUrl = process.env.NEXT_PUBLIC_TEST_URL

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_TEST_URL is not set")
}

const signInWithTestAccount = async () => {
  // Enter email
  const testEmail = "test@kwil.com"
  const inputElement = await page.waitForSelector("input")
  await inputElement.fill(testEmail)
  await page.keyboard.press("Enter")

  // Enter access code
  const accessCode = "111111"
  const accessCodeInputId = '[test-id="access-code-input-1"]'
  await page.waitForSelector(accessCodeInputId)
  await write(accessCode)

  // Paste access code
  await page.click(accessCodeInputId)
  const isMac = process.platform === "darwin"
  await page.keyboard.press(isMac ? "Meta+v" : "Control+v")
  await page.keyboard.press("Enter")

  // Wait for confirmation
  await page.waitForSelector("text=Access code validated!")
}

beforeAll(async () => {
  browser = await chromium.launch({
    headless: false, // Sign in only seems to work when headless is false
    slowMo: 100,
  })
  page = await browser.newPage()

  await page.goto("http://localhost:4444")

  page.on("dialog", async (dialog) => {
    await dialog.accept()
  })

  // Sign in with test account
  await signInWithTestAccount()
})

afterAll(async () => {
  await browser.close()
})

const saveScreenshot = async (fileName: string) => {
  const screenshotPath = path.join(
    __dirname,
    "tests/screenshots",
    `${fileName}_${new Date().toISOString()}.png`,
  )

  await page.screenshot({ path: screenshotPath })
}

export { chromium, browser, page, saveScreenshot, baseUrl }
