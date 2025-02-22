from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://ngodarpan.gov.in/index.php/search/")

dropdown = Select(driver.find_element(By.ID, "state_search_search"))  # Replace with actual ID
dropdown.select_by_index(0)

button = driver.find_element(By.NAME, "commit")
button.click()

table = wait.until(EC.element_to_be_clickable((By.ID, "example")))

# Wait for results and extract data
ngo_name = driver.find_element(By.CLASS_NAME, "ngo-name").text
print("NGO Name:", ngo_name)

# driver.quit()