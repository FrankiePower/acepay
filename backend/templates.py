def foodTemplate(address, restaurantName, item):
    task = f"""
    1. Navigate to https://www.chowdeck.com
    2. If prompted, allow location or select city as "Lagos".
    3. Click the address/search bar near the top.
    4. Enter "{address}" as the delivery address and confirm.
    5. In the search bar, type "{restaurantName}" and press Enter.
    6. From search results, click the restaurant that exactly matches "{restaurantName}".
    7. On the restaurant page, use the menu search (if available) to search for "{item}"; otherwise scroll.
    8. Click the menu item that best matches "{item}".
    9. If there are options or extras, select reasonable defaults.
    10. Click the "Add to cart" or "Add" button.
    11. Open the cart and click "Checkout".
    12. At checkout, ensure delivery address is "{address}" and proceed to the final order confirmation screen.
    13. If an order tracking or order details link is shown after placing/confirming the order, copy the tracking URL and open it.
    """
    return task


def flightTemplate(toCity, fromCity, date, firstName, lastName, dateOfBirth, email, phoneNumber):
    task = f"""
    1. Navigate to https://www.wakanow.com
    2. Select the country/site as Nigeria if prompted.
    3. Choose "One-way".
    4. Click the "From" field and enter "{fromCity}", then select the correct option.
    5. Click the "To" field and enter "{toCity}", then select the correct option.
    6. Open the date picker and select the date "{date}".
    7. Click the button to search for flights.
    8. In results, choose the first reasonably priced Economy option and select it.
    9. Proceed to the passenger details page.
    10. Choose title (Mr/Ms) appropriately.
    11. Enter first name "{firstName}" and last name "{lastName}".
    12. Enter date of birth "{dateOfBirth}".
    13. Enter email "{email}" and phone number "{phoneNumber}".
    14. Continue to the review/checkout step.
    15. Stop at the payment step and provide the current booking or review URL if available.
    """
    return task
