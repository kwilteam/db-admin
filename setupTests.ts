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

beforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
    devtools: true,
  })
  page = await browser.newPage()

  await page.goto("http://localhost:4444")

  // Sign in with test account
  const inputElement = await page.waitForSelector("input")
  await inputElement.fill("test@kwil.com")
  await page.keyboard.press("Enter")

  const accessCode = "111111"
  await page.waitForSelector('[test-id="access-code-input-1"]')
  await write(accessCode)
  await page.click('[test-id="access-code-input-1"]')
  const isMac = process.platform === "darwin"
  await page.keyboard.press(isMac ? "Meta+v" : "Control+v")
  await page.keyboard.press("Enter")

  const successMessage = await page.waitForSelector(
    "text=Access code validated!",
  )
})

afterAll(async () => {
  await browser.close()
})

const saveScreenshot = async (fileName: string) => {
  const screenshotPath = path.join(
    __dirname,
    "screenshots",
    `${fileName}_${new Date().toISOString()}.png`,
  )

  await page.screenshot({ path: screenshotPath })
}

export { chromium, browser, page, saveScreenshot, baseUrl }
