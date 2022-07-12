import selectEvent from 'react-select-event'

const { Builder, By, Key } = require("selenium-webdriver");
const url = "http://localhost:3000";


describe("selenium tests",  () => {

  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("firefox").build();
    await driver.get(url);
  })
   
  afterAll(async () => {
      await driver.quit();
  })

  //Test Home Page
  test("renders login page as default", async () => {
    const eventsURL = await driver.getCurrentUrl();
    expect(eventsURL).toEqual('http://localhost:3000/'); 
  })

  //Test Login functionality
  test("renders events page after successful login!", async () => {
      await driver.findElement(By.name("email")).sendKeys("sampleuno8@gmail.com", Key.RETURN);
      await driver.findElement(By.name("password")).sendKeys("test1234", Key.RETURN);
      await driver.findElement(By.name("submit")).click();

      const currentURL = await driver.getCurrentUrl();
      expect(currentURL).toEqual('http://localhost:3000/resource'); 

  })

//   //Add Skill functionality
//   test("Add Available date successfully!", async () => {
//     option=driver.find_element_by_xpath("//*[text()='JAVA']")
//     driver.execute_script("arguments[0].scrollIntoView();", option)
//     option.click()
    
   

//     const currentURL = await driver.getCurrentUrl();
//     expect(currentURL).toEqual('http://localhost:3000/resource'); 

// })



})
