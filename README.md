# Currency Explorer

Currency Explorer is a React-based web application that allows users to explore and interact with a comprehensive list of global currencies. Users can filter currencies by region, search for specific currencies, view detailed information about each currency, and visualize historical exchange rate trends through interactive charts. The app also includes a currency converter and supports cryptocurrencies and precious metals.

## Features

- **Currency List**: Browse a comprehensive list of global currencies, including fiat, cryptocurrencies, and precious metals.
- **Region Filtering**: Filter currencies by region (e.g., Asia, Europe, Americas, Africa, Oceania).
- **Search Functionality**: Search for currencies by name or code.
- **Currency Details**: View detailed information about each currency, including its code, name, and region.
- **Historical Charts**: Visualize historical exchange rate trends for selected currencies.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Pagination**: Navigate through the list of currencies with ease using pagination.
- **Currency Converter**: Convert between currencies using real-time exchange rates (if integrated with an API).
- **Beautiful UI**: Modern and user-friendly interface with smooth animations and transitions.

## Demo

You can check out a live demo of the project here: [Live Demo](#) *(Replace with your actual demo link)*

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript for better code quality and maintainability.
- **Axios**: For making HTTP requests to fetch currency data.
- **CSS Modules**: For styling components in a modular and scoped way.
- **React Icons**: For adding icons to the UI.
- **Chart.js**: For rendering interactive historical exchange rate charts.
- **Responsive Design**: Ensures the app looks great on all devices.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
  ```bash
  git clone https://github.com/your-username/currency-explorer.git
  cd currency-explorer
  ```

2. **Install Dependencies**:
  ```bash
  npm install
  ```

3. **Set Up Environment Variables**:
  Create a `.env` file in the root directory and add the following variables:
  ```env
  VITE_CURRENCY_API_URL=https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1
  VITE_FALLBACK_CURRENCY_API_URL=https://fallback-api-url.com
  ```

4. **Run the Development Server**:
  ```bash
  npm run dev
  ```

5. **Open the App**:
  Visit [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

### Exploring Currencies
- Use the search bar to find currencies by name or code.
- Filter currencies by region using the region buttons.
- Click on a currency card to view more details.

### Historical Charts
- Select a currency to view its historical exchange rate trends.
- Use the interactive chart to analyze exchange rate fluctuations over time.

### Currency Converter
- Enter the amount you want to convert.
- Select the source currency and target currency.
- Click **Convert** to see the result.

### Pagination
- Use the pagination buttons at the bottom of the page to navigate through the list of currencies.


## API Integration

The app fetches currency data from the following API:

- **Primary API**: [https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1](https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1)
- **Fallback API**: *(Optional)* Provide a fallback API URL in case the primary API fails.

To integrate a new API:
1. Update the API URL in the `.env` file.
2. Modify the `fetchCurrencies` function in `CurrencyList.tsx` to handle the new API response format.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork the Repository**:
  Click the "Fork" button at the top right of this repository.

2. **Clone Your Fork**:
  ```bash
  git clone https://github.com/your-username/currency-explorer.git
  cd currency-explorer
  ```

3. **Create a New Branch**:
  ```bash
  git checkout -b feature/your-feature-name
  ```

4. **Make Changes**:
  Add your changes and test them thoroughly.

5. **Commit Your Changes**:
  ```bash
  git add .
  git commit -m "Add your commit message here"
  ```

6. **Push to Your Fork**:
  ```bash
  git push origin feature/your-feature-name
  ```

7. **Create a Pull Request**:
  Go to the original repository and click "New Pull Request". Provide a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **API Provider**: [@fawazahmed0/currency-api](https://github.com/fawazahmed0/currency-api) for providing the currency data.
- **React Icons**: For the beautiful icons used in the project.
- **Chart.js**: For the interactive historical charts.
- **Open Source Community**: For the countless resources and tools that made this project possible.

## Contact

If you have any questions or feedback, feel free to reach out:

- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)
- **Twitter**: [@your-handle](https://twitter.com/your-handle)

Enjoy exploring currencies with Currency Explorer! 🌍💱
