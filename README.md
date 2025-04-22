# Discord Bot Project

This project is a Discord bot that provides various commands for managing team roles and offers. The bot includes the following commands:

## Commands

### /offer
Sends a direct message to the user with an embedded message containing the offer details, including the role name and the coach's name.

### /release
Informs the user that they have been released from their team and removes the specified role from the user.

### /demand
Removes a specified team role from the user and can send a confirmation message if needed.

### /promote
Adds the coach role to the user and sends a confirmation message.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd discord-bot-project
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Configure your bot token in the environment variables or a configuration file.

5. Run the bot:
   ```
   npm start
   ```

## Usage

Once the bot is running, you can use the commands in any text channel where the bot has permission to read and send messages. Use the commands as follows:

- `/offer` - To receive an offer.
- `/release` - To be released from your team.
- `/demand <role>` - To remove a specific team role.
- `/promote` - To get promoted to a coach role.

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see in the bot.