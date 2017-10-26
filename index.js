#!/usr/bin/env node

const path = require('path')
const puppeteer = require('puppeteer')

const EMAIL = 'your@mail.here'
const PASSWORD = 'yourPasswordHere'

const date = new Date()
const filename = date.getTime() + '.png'
const resultPath = path.join(__dirname, filename)

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://stackoverflow.com', {waitUntil: 'networkidle'})
  await page.screenshot({path: path.join(__dirname, 'debug-goto.png'), fullPage: true})

  await page.click('a.login-link.btn-clear')
  await page.waitForNavigation({waitUntil: 'networkidle'})
  await page.screenshot({path: path.join(__dirname, 'debug-a.login-link.btn-clear.png'), fullPage: true})

  await page.click('input#email')
  await page.type(EMAIL)
  await page.screenshot({path: path.join(__dirname, 'debug-input#email.png'), fullPage: true})

  await page.click('input#password')
  await page.type(PASSWORD)
  await page.screenshot({path: path.join(__dirname, 'debug-input#password.png'), fullPage: true})

  await page.click('input#submit-button')
  await page.waitForNavigation({waitUntil: 'networkidle'})
  await page.screenshot({path: path.join(__dirname, 'debug-input#submit-button.png'), fullPage: true})

  try {
    await page.click('a.my-profile.js-gps-track')
    await page.waitForNavigation({waitUntil: 'networkidle'})
    await page.screenshot({path: resultPath, fullPage: true})
  } catch (e) {
    console.log('Error:', e.message);
  }

  await browser.close()
})()
