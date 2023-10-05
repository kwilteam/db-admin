import { chromium, Browser, Page } from "playwright"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

let envPath = path.resolve(process.cwd(), ".env.test.local")

if (!fs.existsSync(envPath)) {
  envPath = path.resolve(process.cwd(), ".env.test")
}

dotenv.config({
  path: envPath,
})

let browser: Browser
let page: Page
const baseUrl = process.env.NEXT_PUBLIC_TEST_URL

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_TEST_URL is not set")
}

beforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
  })
  page = await browser.newPage()
})

afterAll(async () => {
  await browser.close()
})

test("create schema test", async () => {
  // create random schema name
  const newSchemaName = `new_test_${Math.floor(Math.random() * 1000)}`
  const schemaFilePath = path.join(__dirname, "test_schema.kf") // replace with your schema file path
  const schemaContent = fs.readFileSync(schemaFilePath, "utf-8")
  // replace the ##DATABASE_NAME## with your database name
  const schemaContentWithDatabaseName = schemaContent.replace(
    /##DATABASE_NAME##/g,
    newSchemaName,
  )

  await page.goto(`${baseUrl}/databases`)
  console.log("Navigated to databases page")

  const ideLink = await page.waitForSelector('[test-id="nav-item-IDE"]')
  await ideLink.click()
  console.log("Clicked on IDE link")

  const newSchemaIcon = await page.waitForSelector(
    '[test-id="create-new-schema"]',
  )
  await newSchemaIcon.click()
  console.log("Clicked on newSchemaIcon")

  const inputElement = await page.waitForSelector("input")

  await inputElement.fill(newSchemaName)
  console.log(`Filled input with '${newSchemaName}'`)
  await page.keyboard.press("Enter")
  console.log("Pressed Enter")

  await page.waitForSelector(".monaco-editor")
  await page.click(".monaco-editor") // Focus the editor
  await page.keyboard.type(schemaContentWithDatabaseName) // Type into the editor
  //await page.fill(".monaco-editor", schemaContentWithDatabaseName) // Paste into the editorconsole.log("Typed schema content

  console.log("Filled Editor with schema content")

  const deployButton = await page.waitForSelector("text=Deploy")
  await deployButton.click()

  const deployAlert = await page.waitForSelector('[test-id="deploy-outcome"]')
  expect(await deployAlert.isVisible()).toBeTruthy()
  expect(await deployAlert.textContent()).toContain("deployed")
}, 30000)
