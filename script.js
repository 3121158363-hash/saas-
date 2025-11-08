document.addEventListener('DOMContentLoaded', () => {
    const aiDescription = document.getElementById('ai-description');
    const principlesContainer = document.getElementById('principles-container');
    const commandPanel = document.getElementById('command-panel');
    const outputLog = document.getElementById('output-log');

    // Function to add a new entry to the log
    function logMessage(message, type) {
        const logEntry = document.createElement('p');
        logEntry.className = `log-entry ${type}`;
        logEntry.textContent = message;
        outputLog.appendChild(logEntry);
        // Scroll to the bottom of the log
        outputLog.scrollTop = outputLog.scrollHeight;
    }

    // Fetch the framework data from the JSON file
    fetch('jules_ai_framework.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Populate header description
            if (data.identity && data.identity.description) {
                aiDescription.textContent = data.identity.description;
            }

            // Populate core operating principles
            if (data.core_operating_principles) {
                data.core_operating_principles.forEach(principle => {
                    const card = document.createElement('div');
                    card.className = 'principle-card';
                    card.innerHTML = `<strong>${principle.principle}:</strong><p>${principle.description}</p>`;
                    principlesContainer.appendChild(card);
                });
            }

            // Populate command buttons
            if (data.human_operator_commands && data.human_operator_commands.commands) {
                data.human_operator_commands.commands.forEach(command => {
                    const button = document.createElement('button');
                    button.className = 'command-btn';
                    button.textContent = command.name;
                    button.addEventListener('click', () => {
                        // Log the command being sent
                        logMessage(`> Sending command: "${command.name}"`, 'command');

                        // Simulate receiving a response after a short delay
                        setTimeout(() => {
                            logMessage(`Jules > Acknowledged. Executing: "${command.prompt}"`, 'response');
                        }, 800);
                    });
                    commandPanel.appendChild(button);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing framework data:', error);
            logMessage(`Error: Could not load AI framework data. Check console for details.`, 'system');
        });
});
