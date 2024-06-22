# SMTP Listener

SMTP Listener is a simple SMTP server that listens for incoming SMTP messages and broadcasts them via WebSockets. This project is useful for testing SMTP notification services.

## Features

- Listens for incoming SMTP messages on port 2525.
- Broadcasts parsed email messages to connected WebSocket clients on port 8586.
- Serves a web interface to display incoming messages.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dulajdeshan/smtp-listener.git
   cd smtp-listener
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Bundle the project:

   ```bash
   npm run bundle
   ```

5. Package the project:
   ```bash
   pkg --config pkg-config.json bundle/index.js --out-path dist
   ```

## Usage

1. Start the SMTP server:

   - Navigate to dist folder and run the relevant executable.

2. Open the web interface at [http://localhost:8585](http://localhost:8585) to view incoming messages.

## Screenshots

![SMTP Listener](/screenshots//screenshot-1.png)

## Configuration

- The SMTP server listens on port 2525.
- The WebSocket server listens on port 8586.
- The web interface is served on port 8585.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
