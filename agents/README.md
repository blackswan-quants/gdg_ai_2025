# UCB1 Bandit Content Generator

This system uses a UCB1 (Upper Confidence Bound) bandit algorithm to select the most effective prompts for generating educational content. It combines reinforcement learning with LangChain to create an adaptive learning system.

## Features

- UCB1 bandit algorithm for prompt selection
- Four different prompt strategies for content generation
- LangChain integration for intelligent content generation
- True/False questions for testing understanding
- Real-time performance tracking of different prompts
- Streamlit-based user interface

## Installation

1. Make sure you have Python 3.10 or higher installed
2. Install the required dependencies:
```bash
pip install -e .
```

## Setting up the OpenAI API Key

There are two ways to set up your OpenAI API key:

### Option 1: Local Development (Recommended for testing)
1. Create a `.streamlit` directory in your project root if it doesn't exist
2. Create a `secrets.toml` file inside the `.streamlit` directory
3. Add your OpenAI API key to the file:
```toml
OPENAI_API_KEY = "your-api-key-here"
```
4. Add `.streamlit/secrets.toml` to your `.gitignore` file to keep it out of version control

### Option 2: Production Deployment
1. If deploying to Streamlit Cloud:
   - Go to your app's dashboard
   - Click on "Secrets"
   - Add your OpenAI API key:
   ```toml
   OPENAI_API_KEY = "your-api-key-here"
   ```
2. If deploying to other platforms:
   - Set the environment variable `OPENAI_API_KEY`
   - Or use your platform's secrets management system

## Running the Application

1. Make sure you've set up your OpenAI API key using one of the methods above
2. Run the Streamlit application:
```bash
streamlit run src/app.py
```

## How It Works

1. The system maintains four different prompt strategies:
   - Simple and engaging explanation with practical examples
   - Fundamental components breakdown
   - Compare and contrast approach
   - Real-world scenario presentation

2. When you enter text to elaborate:
   - The UCB1 algorithm selects the most promising prompt
   - LangChain generates content using the selected prompt
   - A true/false question is generated to test understanding

3. The bandit algorithm learns from user performance:
   - Correct answers provide a reward of 1.0
   - Incorrect answers provide a reward of 0.0
   - The algorithm updates its estimates of each prompt's effectiveness

4. The sidebar shows real-time statistics:
   - Current value estimate for each prompt
   - Number of times each prompt has been used

## Project Structure

- `src/app.py`: Main application file containing the UCB1 bandit implementation and Streamlit interface
- `pyproject.toml`: Project configuration and dependencies
- `.streamlit/secrets.toml`: Local configuration file for API keys (not in version control)

## Security Notes

- Never commit your API keys to version control
- Always use environment variables or secrets management in production
- Keep your API keys secure and rotate them periodically

## Customization

To modify the prompt strategies:
1. Edit the `prompts` list in the `ContentGenerator` class
2. Each prompt should be designed to generate both content and a test question

## Contributing

Feel free to submit issues and enhancement requests!
