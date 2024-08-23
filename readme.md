# PHP Stack - Advanced LAMP/LEMP Stack Calculator

This project provides an advanced calculator for estimating resource requirements for LAMP (Linux, Apache, MySQL, PHP) and LEMP (Linux, Nginx, MySQL, PHP) stacks. It helps users determine the appropriate CPU, RAM, and storage needs based on their selected services and expected concurrent users.

## Features

- Interactive service selection for common web stack components
- Concurrent user and storage requirement inputs
- Real-time resource calculation
- Recommended configurations for common use cases
- Responsive design for desktop and mobile use
- Links to additional calculators and tutorials

## Getting Started

### Prerequisites

- Node.js and npm (for development)
- A modern web browser

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/MrGKanev/phpstack.git
   ```

2. Navigate to the project directory:

   ```
   cd phpstack
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Development

To start development, run the following command to watch for changes in the CSS:

```
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

### Building for Production

To generate a minified version of the CSS for production:

```
npx tailwindcss -o ./src/output.css --minify 
```

## Usage

Open `index.html` in a web browser to use the calculator. Select the services you need, adjust the concurrent users and storage requirements, and view the estimated resource needs.

## Contributing

Contributions to the PHP Stack are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

Please ensure your code adheres to the existing style and that you've tested your changes thoroughly.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by [Gabriel Kanev](https://gkanev.com)

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Tippy.js](https://atomiks.github.io/tippyjs/) for tooltips
- The open-source community for inspiration and resources
