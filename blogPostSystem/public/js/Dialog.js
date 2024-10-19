// Class Dialog
class Dialog {
    /**
     * State of the Input Dialog OK (1)
     */
    static OK_OPTION = 1;
    /**
     * State of the Input Dialog CANCEL (0)
     */
    static CANCEL_OPTION = 0;
    /**
     * State of the Confirm Dialog YES (1)
     */
    static YES_OPTION = 1;
    /**
     * State of the Confirm Dialog NO (0)
     */
    static NO_OPTION = 0;

    /**
     * method of Dialog Class that allows user input
     * @param {string} textTitle Title of the dialog (only plain text)
     * @param {html} textMessage Message of the dialog for user to see (allows element tags)
     * @returns data of dialog upon resolve().
     */
    static async showInputDialog(textTitle, textMessage) {
        // add the style
        this.#addStyles();

        // create elemeents
        const inputDialog = document.createElement('dialog');
        const title = document.createElement('h4');
        const message = document.createElement('div');
        const input = document.createElement('input');
        const divButtons = document.createElement('div');
        const btnOk = document.createElement('button');
        const btnCancel = document.createElement('button');
        // add attributes
        inputDialog.setAttribute('id', 'inputDialog');
        title.setAttribute('id', 'title');
        message.setAttribute('id', 'message');
        input.setAttribute('id', 'txtInput');
        input.type = 'text';
        divButtons.setAttribute('class', 'divButtons');
        btnOk.setAttribute('id', 'btnOk');
        btnOk.innerText = 'OK';
        btnCancel.setAttribute('id', 'btnCancel');
        btnCancel.innerText = 'Cancel';

        // append the elements
        divButtons.append(btnOk, btnCancel);
        inputDialog.append(title, message, input, divButtons);
        document.body.prepend(inputDialog);

        /*
         * dialogData       =   contains the data of the input dialog
         * 
         * output           =   output of the dialog (input). null is default value
         * outputLength     =   length of the output
         * operation        =   operations of the buttons in dialog. 0 is default value
         *                      1 - OK
         *                      0 - CANCEL
         */
        const dialogData = {
            output: null,
            outputLength: 0,
            operation: 0,
        };

        /**
         * Removes all HTML Element contained in this string
         * @param {string} string 
         * @returns sanitized string
         */
        function sanitizeInput(string) {
            // Regular expression to check for HTML tags
            const htmlTagPattern = /<[^>]*>/;
        
            // Check if the string contains any HTML tags
            if (htmlTagPattern.test(string)) {
                return string.replace(/<[^>]*>/g, '');
            }
    
            return string;
        }

        return new Promise((resolve) => {
            if (!inputDialog.open) {
                // Display the modal with the message
                inputDialog.showModal();

                // show the message
                title.innerText = textTitle;
                message.innerHTML = textMessage;

                // focus on the text field
                input.focus();

                function handleOnKeyDownInputDialog(event) {
                    if (event.key === 'Enter' && event.target === input) {
                        event.preventDefault();
                        btnOk.dispatchEvent(new Event('click'));
                    }
                }

                // add keydown listener
                document.addEventListener('keydown', handleOnKeyDownInputDialog);

                btnOk.addEventListener('click', () => {
                    // close the dialog
                    inputDialog.close();

                    // remove the element    
                    inputDialog.remove();

                    // update the data of dialog
                    const userInput = sanitizeInput(input.value);
                    dialogData.output = !userInput ? dialogData.output : userInput;
                    dialogData.outputLength = userInput.length;
                    dialogData.operation = 1;

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownInputDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve(dialogData);

                    this.#removeStyles();
                });

                btnCancel.addEventListener('click', () => {
                    // close the dialog
                    inputDialog.close();

                    // remove the element
                    inputDialog.remove();

                    // update the data of dialog
                    dialogData.operation = 0;

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownInputDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve(dialogData);

                    this.#removeStyles();
                });
            }
        });
    }

    /**
     * method of Dialog Class that shows information message
     * @param {string} textTitle Title of the dialog (only plain text)
     * @param {html} textMessage Message of the dialog for user to see (allows element tags)
     * @returns nothing, it is only for displaying messages
     */
    static async showMessageDialog(textTitle, textMessage) {
        // add the style
        this.#addStyles();

        // create the elements
        const messageDialog = document.createElement('dialog');
        const title = document.createElement('h4');
        const message = document.createElement('div');
        const divButtons = document.createElement('div');
        const btnOk = document.createElement('button');
        // add aatributes
        messageDialog.setAttribute('id', 'messageDialog');
        title.setAttribute('id', 'title');
        message.setAttribute('id', 'message');
        divButtons.setAttribute('class', 'divButtons');
        btnOk.setAttribute('id', 'btnOk');
        btnOk.innerText = 'OK';

        // append the elements
        divButtons.append(btnOk);
        messageDialog.append(title, message, divButtons);
        document.body.prepend(messageDialog);

        return new Promise((resolve) => {
            if (!messageDialog.open) {
                // Display the modal with the message
                messageDialog.showModal();

                // show the message
                title.innerText = textTitle;
                message.innerHTML = textMessage;

                // focus on the button
                btnOk.focus();

                function handleOnKeyDownMessageDialog(event) {
                    if (event.key === 'Enter' && document.activeElement === btnOk) {
                        event.preventDefault();
                        btnOk.dispatchEvent(new Event('click'));
                    }
                }

                // add keydown listener
                document.addEventListener('keydown', handleOnKeyDownMessageDialog);

                // Listen for the close event of the modal
                btnOk.addEventListener('click', () => {
                    // Close the modal
                    messageDialog.close();

                    // remove the element
                    messageDialog.remove();

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownMessageDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve();

                    this.#removeStyles();
                });
            }
        });
    };

    /**
     * method of Dialog Class that asks for YES or NO answer
     * @param {string} textTitle Title of the dialog (only plain text)
     * @param {html} textMessage Message of the dialog for user to see (allows element tags)
     * @returns operation of the dialog upon resolve()
     */
    static async showConfirmDialog(textTitle, textMessage) {
        // add the style
        this.#addStyles();

        // create the elements
        const confirmDialog = document.createElement('dialog');
        const title = document.createElement('h4');
        const message = document.createElement('div');
        const divButtons = document.createElement('div');
        const btnYes = document.createElement('button');
        const btnNo = document.createElement('button');
        // add aatributes
        confirmDialog.setAttribute('id', 'confirmDialog');
        title.setAttribute('id', 'title');
        message.setAttribute('id', 'message');
        divButtons.setAttribute('class', 'divButtons');
        btnYes.setAttribute('id', 'btnYes');
        btnYes.innerText = 'Yes';
        btnNo.setAttribute('id', 'btnNo');
        btnNo.innerText = 'No';

        // append the elements
        divButtons.append(btnYes, btnNo);
        confirmDialog.append(title, message, divButtons);
        document.body.prepend(confirmDialog);

        // Operation of the dialog. (1) YES, (0) NO
        let dialogOperation = 0;

        return new Promise((resolve) => {
            if (!confirmDialog.open) {
                // Display the modal with the message
                confirmDialog.showModal();

                // show the message
                title.innerText = textTitle;
                message.innerHTML = textMessage;

                // focus on the button
                btnYes.focus();

                function handleOnKeyDownConfirmDialog(event) {
                    if (event.key === 'Enter' && document.activeElement === btnYes) {
                        event.preventDefault();
                        btnYes.dispatchEvent(new Event('click'));
                    }
                }

                // add keydown listener
                document.addEventListener('keydown', handleOnKeyDownConfirmDialog);

                btnYes.addEventListener('click', () => {
                    // Close the modal
                    confirmDialog.close();

                    // remove the element
                    confirmDialog.remove();

                    dialogOperation = 1;

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownConfirmDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve(dialogOperation);

                    this.#removeStyles();
                });

                btnNo.addEventListener('click', () => {
                    // Close the modal
                    confirmDialog.close();

                    // remove the element
                    confirmDialog.remove();

                    dialogOperation = 0;

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownConfirmDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve(dialogOperation);

                    this.#removeStyles();
                });
            }
        });
    }

    /**
     * Adds basic CSS styling for dialogs
     */
    static #addStyles() {
        const style = document.createElement('style');
        style.id = 'dialogStyles';
        style.innerHTML = `
            dialog {
                border: none;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                padding: 20px;
                max-width: 400px;
                min-width: 300px;
                min-height: 150px;
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                animation: fade-in 0.3s ease;
                animation-fill-mode: forwards;
            }
    
            dialog #title {
                margin-top: 0;
                font-size: 1.2em;
                color: #333;
                font-weight: bold;
            }
    
            dialog #message {
                margin: 10px 0;
                color: #555;
                overflow-wrap: break-word;
                word-break: break-word;
            }
    
            dialog input[type="text"] {
                width: 100%;
                padding: 8px;
                margin: 10px 0;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
    
            .divButtons {
                display: flex;
                justify-content: space-between;
                gap: 10px;
            }
    
            .divButtons button {
                flex-grow: 1;
                padding: 7px 8px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                background-color: #007bff;
                color: white;
                font-size: 0.9em;
                min-width: 100px;
            }
    
            .divButtons button#btnCancel, .divButtons button#btnNo {
                background-color: #dc3545;
            }
    
            .divButtons button:focus, .divButtons button:hover {
                outline: none;
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
            }
    
            dialog::-webkit-scrollbar {
                width: 5px;
            }
    
            dialog::-webkit-scrollbar-track {
                display: none;
            }
    
            dialog::-webkit-scrollbar-thumb {
                background-color: #888;
                border-radius: 10px;
            }
    
            dialog::-webkit-scrollbar-thumb:hover {
                background-color: #555;
            }
    
            dialog::-webkit-scrollbar-button {
                display: none;
            }
    
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @media only screen and (max-width: 768px) {
                dialog {
                    max-width: 85vw;
                }
            }
    
            @media only screen and (min-width: 768px) and (max-width: 1000px) {
                dialog {
                    max-width: 75vw;
                }
            }

            @media only screen and (min-width: 1000px) {
                dialog {
                    max-width: 55vw;
                }
            }
        `;
    
        document.head.appendChild(style);
    }

    static #removeStyles() {
        document.getElementById('dialogStyles').remove();
    }
}