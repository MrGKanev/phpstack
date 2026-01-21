# Stack Calculator 2026

Modern web stack resource calculator for LAMP, LEMP, and next-gen architectures. Calculate optimal CPU, RAM, and storage for your infrastructure with real-time cloud provider cost estimates.

## What's New in 2026

- **Modern Runtimes**: Bun, Deno alongside Node.js and PHP 8.4+
- **New Web Servers**: Caddy (auto-HTTPS), LiteSpeed
- **Updated Caching**: Valkey (open-source Redis fork) replaces Redis as the recommended option
- **Vector Database**: Qdrant for AI/ML applications
- **SQLite**: For edge computing and serverless architectures
- **Cloud Pricing**: Real-time estimates for Hetzner, DigitalOcean, Vultr, AWS
- **Dark Mode**: System-aware with manual toggle
- **Export Configs**: JSON and YAML export for IaC workflows

## Features

- **18 Services** across 4 categories (Web Servers, Runtimes, Databases, Caching)
- **6 Quick Presets**: WordPress, E-commerce, High Traffic, JAMstack 2026, Microservices, AI-Ready
- **Real-time Calculations**: Instant resource updates as you configure
- **Cloud Cost Estimates**: Monthly pricing for major providers
- **Export Options**: Download your config as JSON or YAML
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Keyboard navigation, ARIA labels, screen reader support

## Supported Services

### Web Servers
- Apache, Nginx, Caddy, LiteSpeed

### Runtimes
- PHP 8.4+, Node.js, Bun, Deno

### Databases
- MySQL, MariaDB, PostgreSQL, MongoDB, SQLite, Qdrant (vector DB)

### Caching & Messaging
- Valkey, Redis, Memcached, RabbitMQ

## Quick Start

```bash
# Clone
git clone https://github.com/MrGKanev/phpstack.git
cd phpstack

# Install dependencies
npm install

# Development (watch mode)
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch

# Production build
npx tailwindcss -i ./src/input.css -o ./src/output.css --minify
```

Open `index.html` in your browser.

## Tech Stack

- **Tailwind CSS 4** - Utility-first CSS
- **Vanilla JavaScript** - No frameworks, fast loading
- **Tippy.js** - Tooltips

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/new-service`
3. Commit changes: `git commit -m 'Add new service'`
4. Push: `git push origin feature/new-service`
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE)

## Author

[Gabriel Kanev](https://gkanev.com)

---

**Live Demo**: [phpstack.gkanev.com](https://phpstack.gkanev.com)
